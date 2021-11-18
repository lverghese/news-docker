import React, { Component } from "react";
import { FlatList } from "react-native";

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      content: [{}, {}, {}] // list of objects
    };
  }

  onRefresh() {
    this.setState({ showProgress: true });
    // call methods here to load new data, once loaded make sure to reset the loading state to false
    this.setState({ showProgress: false });
  }

  showArticle() {
    return <React.Fragment>{/* Your article */}</React.Fragment>;
  }

  showVideo() {
    return <React.Fragment>{/* Your Videos */}</React.Fragment>;
  }

  renderItem(item) {
    return (
      <React.Fragment>
        {item.isVideo ? showVideo() : showParagraph()}
      </React.Fragment>
    );
  }

  NoDataMessage() {
    return <React.Fragment>{/* Empty screen message goes here */}</React.Fragment>;
  }

  render() {
    return (
      <FlatList
        data={this.state.content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => this.renderItem(item)}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.showProgress}
        ListEmptyComponent={this.NoDataMessage()}
      />
    );
  }
}

export default NewsFeed;