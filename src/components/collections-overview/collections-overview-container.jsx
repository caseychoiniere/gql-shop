import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectLoadingState } from "../../redux/loading/loading-selectors";
import CollectionsOverview from "./collections-overview";
import WithSpinner from "../with-spinner/with-spinner";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingState
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;



