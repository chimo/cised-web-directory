'use strict';

import React from 'react';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

class HomepageComponent extends React.Component {
  /**
   * Before the Component is rendered, check if we have a query
   * in the URL (direct link to a search results) and set the
   * state appropriately.
   */
  componentWillMount() {
    var query = this.props.location.query;

    if (query.q) {
      this.setState({
        'directSearch': true,
        'searchText': query.q
      });
    } else {
      this.setState({
        'directSearch': false,
        'searchText': null
      });
    }
  }

  /**
   * Triggered when the search form is submitted
   *
   * @param {String} searchText The text in the search field input box
   */
  handleSearch(searchText) {
    this.setState({
      searchText: searchText
    });

    this.props.router.push({
      'pathname': '/',
      'query': {'q': searchText}
    });
  }

  /**
   * When this component is about to receive new props, like when the URL changes,
   * check if we still have a search query in the URL. If not, show the intro.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search === '') {
      this.setState({
        'directSearch': false,
        'searchText': null
      });
    }
  }

  render() {
    var intro = null,
      searchResults = null;

    if (this.state.searchText === null) {
      intro = (
        <div className='intro js-intro'>
          <h1 className='title'>Ottawa Social Enterprise Directory</h1>

          <p className='tagline'>
            Find goods and services from Ottawa's vibrant social enterprise sector.
          </p>
        </div>
      );
    } else {
      searchResults = (
        <SearchResults searchText={this.state.searchText} directSearch={this.state.directSearch}
          directory={this.props.directory} lunr_index={this.props.index} api_root={this.props.config.api_root} />
      );
    }

    return (
      <div className='homepage-component'>
        <ReactCSSTransitionGroup transitionName={{leave: 'slide-up'}}
          transitionEnter={false} transitionLeaveTimeout={2000}>
          {intro}
        </ReactCSSTransitionGroup>

        <SearchForm onSearch={this.handleSearch.bind(this)} searchText={this.state.searchText} />

        {searchResults}
      </div>
    );
  }
}

HomepageComponent.displayName = 'HomepageComponent';

// Uncomment properties you need
// HomepageComponent.propTypes = {};
// HomepageComponent.defaultProps = {};

// This is used by the Homepage and Template tests at the moment.
// They don't like wrapped components.
export let HomepageComponentWithoutRouter = HomepageComponent;

export default withRouter(HomepageComponent);
