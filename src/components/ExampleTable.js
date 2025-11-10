class ExampleTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // get examples, tags and onDelete function from props
        const { records, tags, onDeleteRecord } = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    {/* render table headers */}
                    <thead className="table-primary">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>favourite</th>
                            <th>rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* map all examples and render */}
                    <tbody>
                        {records.map((example) => (
                            <tr key={example.id}>
                                <td>{example.title}</td>
                                <td className="small">{example.description}</td>
                                <td>
                                    {/* map all tags that belong to current example and render */}
                                    {example.tags.map((tag, i) => (
                                        <span
                                            key={tags[i]}
                                            className="badge bg-secondary me-1"
                                        >
                                            {tags[tag]}
                                        </span>
                                    ))}
                                </td>
                                <td>{example.favourite}</td>
                                <td>{example.rating}</td>
                                <td>
                                    {/* delete button */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        // delete example with current id
                                        onClick={() =>
                                            onDeleteRecord(example.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
