/**
 * @providesModule WithCustomFont
 */

// http://www.ccheever.com/ListApp/Overpass_Regular.ttf

let React = require('react-native');
let {
  View,
} = React;

let _FONTS$ = {};
let {EXFontLoader} = require('NativeModules');

function loadFontAsync(url) {

  console.log("Requiring font at", url);
  if (!_FONTS$[url]) {
    console.log("Setting up new font at", url);
    _FONTS$[url] = EXFontLoader.loadFontAsync(url).then((fontName) => {
      console.log("Loaded font", fontName, "from", url);
      return fontName;
    }, (err) => {
      console.error("Failed to load font from " + url + " : ", err);
      throw err;
    });
  }
  return _FONTS$[url];
}

class WithCustomFont extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    loadFontAsync(this.props.source.uri).then((fontName) => {
      this.setState({ready: true, fontName});
    }, (err) => {
      this.setState({err});
    });
  }

  render() {
    if (this.state.err && this.props.renderError) {
      return this.props.renderError(this.state.err);
    } else if (this.state.ready) {
      var child = React.Children.only(this.props.children);
      return React.addons.cloneWithProps(child, {style: this.props.style});
    } else {
      if (this.props.renderNotReady) {
        return this.props.renderNotReady(this.props.children);
      } else {
        return <View style={this.props.style} />
      }
    }
  }

}

function createCustomFontComponent(source) {
  return React.createClass({
    render() {
      return (
        <WithCustomFont source={source}>{React.Children.only(this.props.children)}</WithCustomFont>
      );
    }
  });
}

module.exports = WithCustomFont;
module.exports.createCustomFontComponent = createCustomFontComponent;
