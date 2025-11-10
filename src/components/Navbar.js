class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // navbar made from bootstrap component
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        UN Goal
                    </span>
                    {/* toggle navbar on mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navigation"
                        aria-controls="navigation"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navigation">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            {/* display all data */}
                            <li className="nav-item active">
                                <button
                                    className="btn btn-link nav-link m-auto"
                                    onClick={() => this.props.onHome()}
                                >
                                    Records
                                </button>
                            </li>
                            {/* open record modifier */}
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link m-auto"
                                    onClick={() => this.props.onAdd(null)}
                                >
                                    Add
                                </button>
                            </li>
                            {/* open tags manager */}
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link m-auto"
                                    onClick={() => this.props.onTags()}
                                >
                                    Tags
                                </button>
                            </li>
                        </ul>

                        {/* search records */}
                        <form
                            className="d-flex"
                            role="search"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                value={this.props.search}
                                onChange={this.props.onSearch}
                            />
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
