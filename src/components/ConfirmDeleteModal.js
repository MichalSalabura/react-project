class ConfirmDeleteModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // get data and functions from props
        const { onConfirm, onCancel } = this.props;
        return (
            // modal made from bootstrap component
            <div id="deleteModal" className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="card-title">Confirm Delete</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete? This cannot be
                                undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            {/* button to cancel */}
                            <button
                                data-bs-dismiss="modal"
                                className="btn btn-secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                            {/* button to confirm */}
                            <button
                                className="btn btn-danger"
                                onClick={onConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
