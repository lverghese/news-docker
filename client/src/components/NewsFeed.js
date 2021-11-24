import React, { Component } from "react";
import { FlatList } from "react-native";

export default class NewsFeed extends Component {
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
        {item.isVideo ? showVideo() : this.showArticle()}
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



/* import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'Yeet',
    title: 'First Item',
  },
  {
    id: 'Yeet2',
    title: 'Second Item',
  },
  {
    id: 'Yeet3',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App; */