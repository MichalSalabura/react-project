class ControlsBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // get data and functions from props
        const {
            onSort,
            favouriteFilter,
            ratingFilter,
            filterTag,
            tags,
            onFavouriteFilter,
            onRatingFilter,
            onTagFilter,
        } = this.props;

        return (
            <div className="card mt-3 mb-3">
                <div className="card-body d-flex flex-column flex-md-row gap-2 align-items-center">
                    {/* sort */}
                    <div className="form-group d-flex align-items-center gap-2 w-100">
                        <label className="mb-0 me-2">Sort</label>
                        <select
                            className="form-control"
                            // on option chosen sort
                            onChange={(e) => onSort(e.target.value)}
                        >
                            <option value="none">No sorting</option>
                            <option value="title">Title Asc</option>
                            <option value="description">Description Asc</option>
                            <option value="favourite">Favourite Asc</option>
                            <option value="rating">Rating Asc</option>
                            <option value="titleD">Title Desc</option>
                            <option value="descriptionD">
                                Description Desc
                            </option>
                            <option value="favouriteD">Favourite Desc</option>
                            <option value="ratingD">Rating Desc</option>
                        </select>
                    </div>

                    {/* filter by favourites */}
                    <div className="form-group d-flex align-items-center gap-2 w-100">
                        <label className="mb-0 me-2">Favourite</label>
                        <select
                            className="form-control"
                            // set what filter is currently chosen
                            value={favouriteFilter}
                            onChange={(e) => onFavouriteFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="yes">Yes only</option>
                            <option value="no">No only</option>
                        </select>
                    </div>

                    {/* filter by rating */}
                    <div className="form-group d-flex align-items-center gap-2 w-100">
                        <label className="mb-0 me-2">Min Rating</label>
                        <select
                            className="form-control"
                            // set what rating is currently chosen
                            value={ratingFilter}
                            // filter all with rating equal or higher
                            onChange={(e) => onRatingFilter(e.target.value)}
                        >
                            <option value="0">0+</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    {/* filter by tag */}
                    <div className="form-group d-flex align-items-center gap-2 w-100">
                        <label className="mb-0 me-2">Tag</label>
                        <select
                            className="form-control"
                            // set what tag is currently chosen
                            value={filterTag}
                            // filter all with chosen tag
                            onChange={(e) => onTagFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            {/* map all tags as options */}
                            {tags.map((tag, i) => (
                                <option key={tag} value={i}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
