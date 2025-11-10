class TagManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newTag: "", editing: null, editText: "" };
    }

    // add new tag and empty buffer
    addTag = () => {
        const tag = this.state.newTag.trim();
        this.props.onAddTag(tag);
        this.setState({ newTag: "" });
    };

    // set what tag is being edited and it's text
    startEdit = (tag) => this.setState({ editing: tag, editText: tag });

    // save edit
    saveEdit = (index) => {
        const { editText } = this.state;
        this.props.onEditTag(index, editText.trim());
        this.setState({ editing: null, editText: "" });
    };

    render() {
        // get all tags and onDeleteTag method
        const { tags, onDeleteTag } = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tags Manager</h5>

                    <div className="form-group mb-3">
                        {/* get input value and set as newTag */}
                        <input
                            className="form-control"
                            placeholder="New tag name"
                            value={this.state.newTag}
                            onChange={(e) =>
                                this.setState({ newTag: e.target.value })
                            }
                        />

                        {/* add new tag */}
                        <div className="mt-2">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.addTag}
                            >
                                Add tag
                            </button>
                        </div>
                    </div>

                    {/* map all tags in a list */}
                    <ul className="list-group">
                        {tags.map((tagId, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {/* if tag is being edited render input field, else render tag */}
                                <div>
                                    {this.state.editing === tagId ? (
                                        <input
                                            className="form-control"
                                            value={this.state.editText}
                                            onChange={(e) =>
                                                this.setState({
                                                    editText: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <span className="me-2">{tagId}</span>
                                    )}
                                </div>

                                {/* if tag is being edited render save and cancel button else render edit and delete button*/}
                                <div>
                                    {this.state.editing === tagId ? (
                                        <div>
                                            <button
                                                className="btn btn-sm btn-success me-1"
                                                // save with current tag id
                                                onClick={() => this.saveEdit(i)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-sm btn-secondary me-1"
                                                // cancel edit
                                                onClick={() =>
                                                    this.setState({
                                                        editing: null,
                                                        editText: "",
                                                    })
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-1"
                                                // start edit on tag
                                                onClick={() =>
                                                    this.startEdit(tagId)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                // delete tag with id
                                                onClick={() => onDeleteTag(i)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
