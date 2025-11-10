class Index extends React.Component {
    constructor(props) {
        super(props);
        // in state store targets, examples, tags, curent view, value searched, sort direction, sort key
        // favourite filter value, minimum rating, filter tag, id of record to be deleted(tag or example),
        // if delete modal is shown, is delete target an example and currently edited target
        this.state = {
            isDesktop: null,
            targets: [],
            examples: [],
            tags: [],
            view: "list",
            search: "",
            sortDirection: 1,
            sortKey: "",
            filterFavourite: "",
            filterRating: "",
            filterTag: "",
            recordToDelete: null,
            deleteModal: null,
            isDeleteExample: null,
            isDeleteTag: null,
            editingTarget: null,
        };
    }

    // when app is mounted handle resize, modal and get data
    async componentDidMount() {
        // check if window changes size
        window.addEventListener("resize", this.handleResize);
        this.handleResize();

        // get modal
        const deleteModal = new bootstrap.Modal(
            document.getElementById("deleteModal")
        );
        this.setState({
            deleteModal: deleteModal,
        });

        // get targets and examples
        const dataset = await fetchData();

        // get all tags
        const tags = this.extractTags(dataset[1]);

        // set targets, examples and tags.
        this.setState({
            targets: dataset[0],
            // set examples with tag ids as data
            examples: this.fixTagIds(dataset[1], tags),
            tags,
        });
    }

    // handle window resize
    handleResize = () => {
        this.setState({ isDesktop: window.innerWidth > 768 });
    };

    // extract all tags from examples
    extractTags(dataset) {
        const tagSet = new Set();
        dataset.forEach((record) => {
            record.tags.forEach((t) => tagSet.add(t));
        });
        return Array.from(tagSet);
    }

    // map tag ids to their examples
    fixTagIds(dataset, tags) {
        // copy examples
        let fixedData = JSON.parse(JSON.stringify(dataset));
        // for each example map tags by id
        fixedData.forEach((record) => {
            let tagIds = [];
            record.tags.forEach((t) => {
                if (tags.includes(t)) {
                    tagIds.push(tags.indexOf(t));
                }
            });
            record.tags = tagIds;
        });
        return fixedData;
    }

    // get all tags, add new and set new tags in state
    handleAddTag = (newTag) => {
        let newTags = JSON.parse(JSON.stringify(this.state.tags));
        newTags.push(newTag);
        this.setState({ tags: newTags });
    };

    // get all examples and tags, splice deleted tag from new tags, and remove tag from each example
    handleDeleteTag = (tagId) => {
        this.state.deleteModal.show();
        this.setState({
            recordToDelete: tagId,
            isDeleteExample: false,
            isDeleteTag: true,
        });
    };

    // on tag edit copy all tags, and change tag text for provided id
    handleEditTag = (tagId, newTagText) => {
        let newTags = JSON.parse(JSON.stringify(this.state.tags));
        newTags[tagId] = newTagText;
        this.setState({ tags: newTags });
    };

    // check if sort is asc or desc and change sort direction
    handleSort = (key) => {
        let direction = 1;
        // check if sort desc
        if (key.charAt(key.length - 1) === "D") {
            direction = -1;
            // get sortKey
            key = key.slice(0, key.length - 1);
        }
        // set sortKey and sortDirection
        this.setState({ sortKey: key, sortDirection: direction });
    };

    // set proper filterTag
    handleTagFilter = (key) => {
        if (key === "all") {
            this.setState({ filterTag: "" });
        } else {
            this.setState({ filterTag: key });
        }
    };

    // set proper filterFavourite
    handleFavouriteFilter = (key) => {
        if (key === "all") {
            this.setState({ filterFavourite: "" });
        } else {
            this.setState({ filterFavourite: key });
        }
    };

    // set minimum rating
    handleRatingFilter = (key) => {
        this.setState({ filterRating: key });
    };

    // filter, search or sort data
    applyFilters = () => {
        // a copy of examples
        let filtered = [...this.state.examples];

        // sort direction
        let direction = this.state.sortDirection;

        // get search value and keys from sate
        const { search, sortKey, filterFavourite, filterRating, filterTag } =
            this.state;

        // if search value exists filter copied examples on title and descripion
        if (search) {
            filtered = filtered.filter(
                (r) =>
                    r.title.toLowerCase().includes(search.toLowerCase()) ||
                    r.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // if filterFavourite exists filter examples by favourite or not
        if (filterFavourite) {
            filtered = filtered.filter((r) => r.favourite === filterFavourite);
        }

        // if filterRating exists filter examples by minimum rating
        if (filterRating) {
            filtered = filtered.filter(
                (r) => r.rating >= parseInt(filterRating)
            );
        }

        // if filterTag exists filter examples by tag
        if (filterTag) {
            filtered = filtered.filter((r) =>
                r.tags.includes(Number(filterTag))
            );
        }

        // if sortKey exists sort examples by sortKey and Direction
        if (sortKey) {
            filtered.sort((a, b) =>
                a[sortKey] > b[sortKey] ? 1 * direction : -1 * direction
            );
        }
        // return examples copy after filtering and sorting
        return filtered;
    };

    // save new or edited target
    handleSaveTarget = (target, examples) => {
        // get examples and targets from current data without edited ones and add edited records
        let tempEx = JSON.parse(
            JSON.stringify(
                this.state.examples.filter((ex) => ex.target !== target.id)
            )
        );
        let tempTarg = JSON.parse(
            JSON.stringify(
                this.state.targets.filter((targ) => targ.id !== target.id)
            )
        );

        tempEx.push(...examples);
        tempTarg.push(target);

        // sort examples by ids and update state
        this.setState(() => ({
            targets: tempTarg.sort((a, b) => a.id - b.id),
            examples: tempEx.sort((a, b) => a.id.localeCompare(b.id)),
        }));
        this.showRecords();
    };

    // show delete modal, set id to be deleted, set if example
    handleDeleteExample = (id) => {
        this.state.deleteModal.show();
        this.setState({
            recordToDelete: id,
            isDeleteExample: true,
        });
    };

    // show delete modal, set id to be deleted, set not example
    handleDeleteTarget = (id) => {
        this.state.deleteModal.show();
        this.setState({
            recordToDelete: id,
            isDeleteExample: false,
        });
    };

    // remove example or target after confirm
    handleConfirm = () => {
        // filter examples and remove one with id
        if (this.state.isDeleteExample) {
            let updatedExamples = this.state.examples.filter(
                (example) => example.id !== this.state.recordToDelete
            );
            // update examples
            this.setState({
                examples: updatedExamples,
            });
        } else if (this.state.isDeleteTag) {
            const tagId = this.state.recordToDelete;
            // copy tags and examples
            let updatedTags = JSON.parse(JSON.stringify(this.state.tags));
            let updatedExamples = JSON.parse(
                JSON.stringify(this.state.examples)
            );

            // remove tag from example copy
            updatedTags.splice(this.state, 1);

            // for each example create a new array, copy tags into that array without the one being deleted
            updatedExamples.forEach((example) => {
                let tagsCopy = [];
                example.tags.forEach((tag) => {
                    if (tag < tagId) {
                        tagsCopy.push(tag);
                    } else if (tag > tagId) {
                        tagsCopy.push(tag - 1);
                    }
                });
                // set new tags as example tags
                example.tags = tagsCopy;
            });
            // update state with new tags and examples
            this.setState({ tags: updatedTags, examples: updatedExamples });
        } else {
            // filter out target and all of it's examples
            let updatedExamples = this.state.examples.filter(
                (ex) => ex.target !== this.state.recordToDelete
            );
            let updatedTargets = this.state.targets.filter(
                (t) => t.id !== this.state.recordToDelete
            );
            // set new examples and targets
            this.setState({
                examples: updatedExamples,
                targets: updatedTargets,
            });
        }
        // hide modal
        this.state.deleteModal.hide();
        this.setState({
            recordToDelete: null,
            isDeleteExample: null,
        });
    };

    // hide delete modal
    handleCancel = () => {
        this.state.deleteModal.hide();
        this.setState({
            recordToDelete: null,
        });
    };

    // change what's rendered based on view
    showRecords = () => this.setState({ view: "list" });
    showTags = () => this.setState({ view: "tags" });
    showEdit = (target) => {
        if (target === null) {
            this.setState({ view: "edit", editingTarget: null });
        } else {
            this.setState({ view: "edit", editingTarget: target });
        }
    };

    render() {
        const examples = this.applyFilters();
        const { isDesktop } = this.state;
        return (
            <div className="">
                {/* render navbar with props to change view and search records */}
                <Navbar
                    search={this.state.search}
                    onSearch={(e) => this.setState({ search: e.target.value })}
                    onHome={this.showRecords}
                    onTags={this.showTags}
                    onAdd={this.showEdit}
                />

                {/* delete modal with props to handle confirm, cancel and record to delete*/}
                <ConfirmDeleteModal
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                />

                {/* if view = list render control bar and data */}
                {this.state.view === "list" && (
                    <div className="container">
                        <ControlsBar
                            favouriteFilter={this.state.filterFavourite}
                            ratingFilter={this.state.filterRating}
                            filterTag={this.state.filterTag}
                            tags={this.state.tags}
                            onSort={this.handleSort}
                            onRatingFilter={this.handleRatingFilter}
                            onTagFilter={this.handleTagFilter}
                            onFavouriteFilter={this.handleFavouriteFilter}
                        />
                        <Targets
                            isDesktop={isDesktop}
                            targets={this.state.targets}
                            examples={examples}
                            tags={this.state.tags}
                            onDeleteExample={this.handleDeleteExample}
                            onDeleteTarget={this.handleDeleteTarget}
                            onEditRecord={this.showEdit}
                            isFiltered={
                                this.state.search ||
                                this.state.filterFavourite ||
                                this.state.filterRating ||
                                this.state.filterTag
                            }
                        />
                    </div>
                )}

                {/* if view == edit render record adding, if target is null add new record*/}
                {this.state.view === "edit" && (
                    <ModifyData
                        target={this.state.editingTarget}
                        // if editing target is not null get target examples
                        examples={
                            this.state.editingTarget
                                ? this.state.examples.filter(
                                      (ex) =>
                                          ex.target ===
                                          this.state.editingTarget.id
                                  )
                                : []
                        }
                        tags={this.state.tags}
                        onSave={this.handleSaveTarget}
                        onCancel={this.showRecords}
                        targetId={
                            this.state.editingTarget
                                ? this.state.editingTarget.id
                                : this.state.targets[
                                      this.state.targets.length - 1
                                  ].id + 1
                        }
                    />
                )}

                {/* if view == tags render tags control panel */}
                {this.state.view === "tags" && (
                    <TagManager
                        tags={this.state.tags}
                        onAddTag={this.handleAddTag}
                        onDeleteTag={this.handleDeleteTag}
                        onEditTag={this.handleEditTag}
                        onCancel={this.showRecords}
                    />
                )}
            </div>
        );
    }
}

// mount
ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById("root")
);
