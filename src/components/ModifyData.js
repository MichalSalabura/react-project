class ModifyData extends React.Component {
    constructor(props) {
        super(props);

        const { target, examples, targetId } = props;
        if (target) {
            this.state = {
                id: target.id,
                number: target.number,
                description: target.description,
                examples: examples,
            };
        } else {
            this.state = {
                id: targetId,
                number: "",
                description: "",
                examples: [],
            };
        }
        this.state.imageUrl = "";
        this.state.imgExample = null;
    }

    // change value in edited target field
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // change value in edited example
    handleExampleChange = (index, field, value) => {
        console.log(index);
        const examples = JSON.parse(JSON.stringify(this.state.examples));
        examples[index][field] = value;
        this.setState({ examples });
    };

    // add empty example to examples array
    handleAddExample = () => {
        const newExample = {
            // make example id from target id and current example id in examples array
            id: `${this.state.id}-e${this.state.examples.length}`,
            title: "",
            description: "",
            favourite: "no",
            target: this.state.id,
            tags: [],
            rating: 0,
            images: [],
        };
        // add new example to the state
        this.setState({ examples: [...this.state.examples, newExample] });
    };

    // splice example from examples array
    handleRemoveExample = (index) => {
        const examples = JSON.parse(JSON.stringify(this.state.examples));
        examples.splice(index, 1);
        this.setState({ examples });
    };

    // toggle tag
    handleTagToggle = (exampleIndex, tagIndex) => {
        // get examples
        const examples = JSON.parse(JSON.stringify(this.state.examples));
        const ex = examples[exampleIndex];

        // if example has a tag filter tag out else add tag
        if (ex.tags.includes(tagIndex)) {
            ex.tags = ex.tags.filter((tag) => tag !== tagIndex);
        } else {
            ex.tags.push(tagIndex);
        }
        this.setState({ examples });
    };

    // add new image and clear url
    handleAddImage = () => {
        const id = this.state.imgExample;
        const examples = JSON.parse(JSON.stringify(this.state.examples));
        examples[id].images.push(this.state.imageUrl);
        this.setState({ examples, imageUrl: "" });
    };

    // splice images array in an example to remove image
    handleRemoveImage = (exampleIndex, imgIndex) => {
        const examples = JSON.parse(JSON.stringify(this.state.examples));
        examples[exampleIndex].images.splice(imgIndex, 1);
        this.setState({ examples });
    };

    // submit new/edited target and its examples
    handleSubmit = () => {
        const targetData = {
            id: this.state.id,
            number: this.state.number,
            description: this.state.description,
        };
        this.props.onSave(targetData, this.state.examples);
    };

    render() {
        const { tags, onCancel } = this.props;
        const { number, description, examples, imageUrl } = this.state;

        return (
            <div className="container my-4">
                <h3>Target Management</h3>

                {/* render target fields */}
                <div className="card mb-3 p-3">
                    {/* target Number */}
                    <div className="form-group mb-3">
                        <label className="col-form-label">Target Number</label>
                        <input
                            className="form-control"
                            name="number"
                            value={number}
                            onChange={this.handleChange}
                            placeholder="e.g. 12.1"
                        />
                    </div>

                    {/* target description */}
                    <div className="form-group mb-3">
                        <label className="col-form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                            placeholder="Target description"
                        />
                    </div>
                </div>

                {/* render all examples */}
                <h4>Examples</h4>
                {examples.map((example, i) => (
                    <div key={example.id} className="card mb-3 p-3 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center">
                            <strong>{example.id}</strong>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                // remove example with id from examples array
                                onClick={() => this.handleRemoveExample(i)}
                            >
                                Delete Example
                            </button>
                        </div>

                        {/* example title field */}
                        <div className="form-group mt-2">
                            <label className="col-form-label">Title</label>
                            <input
                                className="form-control"
                                value={example.title}
                                onChange={(e) =>
                                    // handle change of example with index i
                                    this.handleExampleChange(
                                        i,
                                        "title",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* example description field */}
                        <div className="form-group mt-2">
                            <label className="col-form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                value={example.description}
                                onChange={(e) =>
                                    this.handleExampleChange(
                                        i,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* example favourite field */}
                        <div className="form-group mt-2 d-flex gap-2">
                            <label className="col-form-label">Favourite</label>
                            <select
                                className="form-control"
                                value={example.favourite}
                                onChange={(e) =>
                                    this.handleExampleChange(
                                        i,
                                        "favourite",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        {/* example rating field */}
                        <div className="form-group mt-2">
                            <label className="col-form-label">
                                Rating: {example.rating}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                className="form-control-range"
                                value={example.rating}
                                onChange={(e) =>
                                    this.handleExampleChange(
                                        i,
                                        "rating",
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </div>

                        {/* example tags */}
                        <div className="form-group mt-2">
                            <label className="form-label">Tags</label>
                            <div className="d-flex flex-wrap gap-2">
                                {tags.map((tag, tagIndex) => (
                                    <button
                                        key={tagIndex}
                                        type="button"
                                        className={`btn btn-sm ${
                                            // if example has a tag change style
                                            example.tags.includes(tagIndex)
                                                ? "btn-success"
                                                : "btn-outline-secondary"
                                        }`}
                                        onClick={() =>
                                            this.handleTagToggle(i, tagIndex)
                                        }
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* example images */}
                        <div className="form-group mt-3">
                            <label className="col-form-label">Images</label>
                            <div className="d-flex flex-wrap gap-2">
                                {example.images.map((img, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        className="position-relative"
                                    >
                                        <img
                                            src={img}
                                            alt="no image found"
                                            className="img-thumbnail object-fit-cover img-fluid tw-max-w-md"
                                        />
                                        <button
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                            onClick={() =>
                                                this.handleRemoveImage(
                                                    i,
                                                    imgIndex
                                                )
                                            }
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}

                                {/* dialog for adding a new image made from tailwind template */}
                                <button
                                    command="show-modal"
                                    commandfor="dialog"
                                    className="tw-rounded-md tw-bg-black/10 tw-px-2.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black tw-inset-ring tw-inset-ring-white/5 hover:tw-bg-white/20"
                                    onClick={() =>
                                        this.setState({ imgExample: i })
                                    }
                                >
                                    Add Image
                                </button>
                                <el-dialog>
                                    <dialog
                                        id="dialog"
                                        aria-labelledby="dialog-title"
                                        className="tw-rounded-xl tw-fixed tw-inset-0 tw-size-auto tw-max-h-none tw-max-w-none tw-overflow-y-auto tw-bg-transparent tw-backdrop:tw-bg-transparent"
                                    >
                                        <el-dialog-backdrop></el-dialog-backdrop>

                                        <div
                                            tabIndex="0"
                                            className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center focus:tw-outline-none sm:tw-items-center sm:tw-p-0"
                                        >
                                            <el-dialog-panel>
                                                <div className="tw-bg-gray-800 tw-px-4 tw-pt-5 tw-pb-4 sm:tw-p-6 sm:tw-pb-4">
                                                    <label
                                                        htmlFor="url"
                                                        className="tw-block tw-text-sm tw-font-medium tw-text-gray-200 tw-mb-2"
                                                    >
                                                        Enter image URL
                                                    </label>
                                                    <input
                                                        type="url"
                                                        name="imageUrl"
                                                        value={imageUrl}
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder="https://image.com"
                                                        className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-600 tw-bg-gray-900 tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-blue-500 focus:tw-ring focus:tw-ring-blue-500/30"
                                                    />
                                                </div>
                                                <div className="tw-bg-gray-600 tw-px-4 tw-py-3 sm:tw-flex sm:tw-flex-row-reverse sm:tw-px-6">
                                                    <button
                                                        type="button"
                                                        command="close"
                                                        commandfor="dialog"
                                                        className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-red-500 tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-red-400 sm:tw-ml-3 sm:tw-w-auto"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            this.handleAddImage()
                                                        }
                                                        type="button"
                                                        command="close"
                                                        commandfor="dialog"
                                                        className="tw-mt-3 tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-white/10 tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-white tw-inset-ring tw-inset-ring-white/5 hover:tw-bg-white/20 sm:tw-mt-0 sm:tw-w-auto"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </el-dialog-panel>
                                        </div>
                                    </dialog>
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                ))}

                {/* add new example */}
                <button
                    className="btn btn-outline-success mb-4"
                    onClick={this.handleAddExample}
                >
                    Add Example
                </button>

                <div className="d-flex justify-content-end gap-2">
                    {/* cancel adding or editing target */}
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>

                    {/* save target and examples */}
                    <button
                        className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >
                        Save Target
                    </button>
                </div>
            </div>
        );
    }
}
