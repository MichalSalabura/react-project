class Targets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedTargetId: null,
        };
    }

    // check if previous expanded target was the same and either expand it or close it
    toggleTarget = (id) => {
        this.setState((prevState) => ({
            expandedTargetId: prevState.expandedTargetId === id ? null : id,
        }));
    };

    render() {
        // get props
        const {
            targets,
            examples,
            tags,
            isDesktop,
            onEditRecord,
            onDeleteExample,
            onDeleteTarget,
            isFiltered,
        } = this.props;

        // set current expanded target
        const { expandedTargetId } = this.state;

        return (
            <div className="container mt-3">
                {/* map each target to its examples*/}
                {targets.map((target) => {
                    const relatedExamples = examples.filter(
                        (example) => example.target === target.id
                    );

                    // don't render if target has no example matching filtered or search
                    if (isFiltered && relatedExamples.length === 0) {
                        return null;
                    }

                    // check if current target is expanded
                    const isExpanded = expandedTargetId === target.id;

                    // return target with it's examples
                    return (
                        <div
                            key={"t" + target.id}
                            className="card mb-3 shadow-sm "
                        >
                            {/* on target click toggle expansion */}
                            <div
                                role="button"
                                className="card-header d-flex justify-content-between align-items-center"
                                onClick={() => this.toggleTarget(target.id)}
                            >
                                <div className="d-flex flex-column">
                                    <h5 className="mb-1 fw-bold">
                                        {target.number}
                                    </h5>
                                    <small className="text-muted">
                                        {target.description}
                                    </small>
                                </div>
                                {/* edit button, stops expanding and edits record */}
                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditRecord(target);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    {/* delete button, stops expanding and deletes target with examples */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteTarget(target.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    {/* change direction depending if it's expanded */}
                                    <span className="fs-5">
                                        {isExpanded ? "▲" : "▼"}
                                    </span>
                                </div>
                            </div>
                            {/* if target is expanded check if is desktop and render examples*/}
                            {isExpanded && (
                                <div className="card-body">
                                    {isDesktop ? (
                                        <ExampleTable
                                            records={relatedExamples}
                                            tags={tags}
                                            onDeleteRecord={onDeleteExample}
                                        />
                                    ) : (
                                        <ExampleCards
                                            records={relatedExamples}
                                            tags={tags}
                                            onDeleteRecord={onDeleteExample}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
