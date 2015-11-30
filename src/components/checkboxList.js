
'use strict';

const React = require('react-native');

const {
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
  TouchableOpacity,
} = React;

var CheckboxList = React.createClass({
  propTypes: {
    checkItem: PropTypes.func.isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
    }).isRequired).isRequired,
  },

  dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),

  render: function() {
    const { rows } = this.props;

    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(rows)}
        renderRow={this.renderRow}
        style={styles.listView}
      />
    );
  },

  renderRow: function(rowData, sectionID, rowID: number) {
    const { checkItem } = this.props;

    return (
      <TouchableOpacity style={styles.container} 
                        onPress={() => checkItem(rowID)}
      >
        <View style={styles.rightContainer}>
          <Text style={styles.title}>
            {rowData.title}
          </Text>
        </View>
        <View style={styles.checkbox}>
         <View style={rowData.checked && styles.checked}>
         </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
    textAlign: 'left',
  },
  checked: {
    width: 25,
    height: 45,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'red',
    margin: 8,
    marginLeft: 16,
    transform: [{rotate: '45deg'}],
  },
  checkbox: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: 'red',
    marginRight: 8,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = CheckboxList;
