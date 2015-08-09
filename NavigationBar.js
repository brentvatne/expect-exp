var React = require('react-native');

var {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
} = React;


class NavigationBar extends React.Component {
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {
    return (
      <View style={{height: 65, backgroundColor: '#4F6A71', paddingTop: 20, position: 'absolute', top: 0, left: 0, right: 0,}}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, height: 20, backgroundColor: '#465F65',}} />

        <View style={{paddingTop: 12}}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 18,}}>
            What to expect
          </Text>
        </View>
      </View>
    )
  }

}

module.exports = NavigationBar;
