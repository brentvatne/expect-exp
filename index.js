var React = require('react-native');

var {
  AppRegistry,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  Dimensions,
} = React;

var NavigationBar = require('./NavigationBar');
var ArrowHeader = require('./ArrowHeader');

let deviceWidth = Dimensions.get('window').width;

class DrugDescription extends React.Component {
  description() {
    let { description, name, } = this.props;

    if (description.indexOf(name) === 0) {
      return description.split(' ').slice(1, description.length).join(' ');
    } else {
      return description;
    }
  }

  render() {
    let { name, nameGeneric, } = this.props;

    if (!name) {
      return <View />
    }

    return (
      <View style={{backgroundColor: '#4E4E4E', paddingBottom: 30, paddingTop: 300, marginTop: -270, paddingHorizontal: 25,}}>
        <Text style={{color: '#fff', fontSize: 18, textAlign: 'center',}}>
          <Text style={{fontWeight: 'bold'}}>
            {name} { nameGeneric ? `(${nameGeneric}) ` : ' '}
          </Text>

          {this.description()}
        </Text>
      </View>
    )
  }

}

let oneBar = deviceWidth / 4.0;

class Timeline extends React.Component {

  renderEffectivenessBars() {
    let { effectsTimeline, } = this.props;

    if (!effectsTimeline) {
      return;
    }

    let startBar = effectsTimeline[0].range[0];
    let endBar = effectsTimeline[1].range[0];
    let leftBarOffset = (startBar - 1) * oneBar + 7;
    let leftFullEffectsOffset = (endBar - 1) * oneBar + 7;
    let fontStyles = {paddingLeft: 10, fontSize: 11, color: '#757575', fontWeight: 300, lineHeight: 22, backgroundColor: 'transparent',};

    return (
      <View style={{marginTop: 0,}}>
        <View style={{height: 30, backgroundColor: 'rgba(133, 224, 220, 1)', marginLeft: leftBarOffset, borderTopLeftRadius: 12, borderBottomLeftRadius: 12,}}>
          <Text style={fontStyles}>Starts working</Text>
        </View>
        <View style={{position: 'absolute', height: 30, top: 0, marginLeft: leftFullEffectsOffset}}>
          <Text style={fontStyles}>Full effects</Text>
        </View>
      </View>
    )
  }

  renderSideEffectBar(sideEffect) {
    let startAt = sideEffect.range[0];
    let endAt = sideEffect.range[1];
    let name = sideEffect.name;
    let leftMargin = (startAt - 1) * oneBar + 7;
    let rightMargin = (4 - endAt) * oneBar + 7;
    let fontStyles = {paddingLeft: 8, fontSize: 11, color: '#494949', fontWeight: 300, lineHeight: 22, backgroundColor: 'transparent',};

    var borderTopLeftRadius = 12;
    var borderBottomLeftRadius = 12;
    var borderTopRightRadius = 12;
    var borderBottomRightRadius = 12;


    if (rightMargin < 20) {
      rightMargin = 0;
      borderTopRightRadius = 0;
      borderBottomRightRadius = 0;
    }

    return (
      <View style={{marginTop: 0, marginBottom: 15,}}>
        <View style={{height: 30, backgroundColor: '#CDCDCD', marginLeft: leftMargin, marginRight: rightMargin, borderTopRightRadius, borderTopLeftRadius, borderBottomRightRadius, borderBottomLeftRadius,}}>
          <Text style={fontStyles}>{name}</Text>
        </View>
      </View>
    )
  }

  renderSideEffectBars() {
    let { sideEffectsTimeline, } = this.props;

    return (
      <View>
        {sideEffectsTimeline.map(sideEffect => this.renderSideEffectBar(sideEffect))}
      </View>
    )
  }

  render() {
    let { effectsTimeline, sideEffectsTimeline, } = this.props;

    if (!effectsTimeline || !sideEffectsTimeline) {
      return null;
    }

    let lineStyle ={height: 500, flex: 1, borderRightWidth: 1 / PixelRatio.get(), borderRightColor: 'black', opacity: 0.1}

    return (
      <View style={{flex: 1}}>
        <ArrowHeader />

        <View style={{flex: 1, backgroundColor: 'white',}}>
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: 'transparent'}}>
            <View style={lineStyle} />
            <View style={lineStyle} />
            <View style={lineStyle} />
            <View style={lineStyle} />
          </View>

          <View style={{backgroundColor: 'transparent',}}>
            <Text style={{paddingTop: 15, paddingBottom: 12, paddingLeft: 10, color: '#5D9EAE', fontSize: 15, fontWeight: '700',}}>
              Effectiveness
            </Text>
            {this.renderEffectivenessBars()}
          </View>

          <View style={{backgroundColor: 'transparent',}}>
            <Text style={{paddingTop: 15, paddingBottom: 12, paddingLeft: 10, color: '#757575', fontSize: 15, fontWeight: '700',}}>
              Common side effects
            </Text>
            {this.renderSideEffectBars()}
          </View>
        </View>
      </View>
    )
  }

}

class DrugInformationApp extends React.Component {

  componentDidMount() {
    let data = require('./zoloft.json');
    let name = "Zoloft";
    let nameGeneric = data.name_generic;
    let description = data.basics.benefits_moa;

    // 'depression' is the first "what to expect"
    let effectsTimeline = data.what_to_expect.timeline[0].effects;
    let sideEffectsTimeline = data.what_to_expect.timeline[0].side_effects;

    this.setState({
      name, nameGeneric, description, effectsTimeline, sideEffectsTimeline,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <ScrollView style={{flex: 1}} automaticallyAdjustContentInsets={false}>
          <DrugDescription {...this.state} />
          <Timeline {...this.state} />
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 65,
  },
});

AppRegistry.registerComponent('main', () => DrugInformationApp);
