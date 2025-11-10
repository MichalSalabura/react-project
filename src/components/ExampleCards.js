class ExampleCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // get examples, tags and onDelete function from props
        const { records, tags, onDeleteRecord } = this.props;
        return (
            <div className="row">
                {/* map examples */}
                {records.map((record) => (
                    <div key={record.id} className="col-12 col-sm-6 mb-3">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{record.title}</h5>
                                <p className="card-text small">
                                    {record.description}
                                </p>
                                <div className="mb-2">
                                    {/* map tags to current example */}
                                    {record.tags.map((tag, i) => (
                                        <span
                                            key={tags[i]}
                                            className="badge bg-secondary me-1"
                                        >
                                            {tags[tag]}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto d-flex gap-2">
                                    {/* delete button */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        // delete example with current id
                                        onClick={() =>
                                            onDeleteRecord(record.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
