var React = require('react-native');
var { Component, View, Dimensions, } = React;

var {
  Group,
  Shape,
  Surface,
  Transform,
  Text,
} = require('ReactNativeART');

const PATH = "M0,0 L100.361026,0 L122.482885,20.5 L100.361026,41 L0,41 L0,0 Z";
const deviceWidth = Dimensions.get('window').width;
const scaleFactor = deviceWidth / 320.0;

class ArrowHeader extends Component {

  render() {
    let transform = new Transform().scale(scaleFactor);

    return (
      <Surface width={deviceWidth} height={42 * scaleFactor}>
        <Group transform={transform}>
          <Group x={79 * 3 - 10}>
            <Shape d={PATH} stroke='#DFDEDE' fill='#F5F3F3' />
            <Group x={32} y={14}>
              <Text font="11px Helvetica" fill="#757575" opacity={0.6}>Long term</Text>
            </Group>
          </Group>

          <Group x={79 * 2 - 27}>
            <Shape d={PATH} stroke='#DFDEDE' fill='#F5F3F3' />
            <Group x={45} y={14}>
              <Text font="11px Helvetica" fill="#757575" opacity={0.6}>First months</Text>
            </Group>
          </Group>

          <Group x={79 - 30}>
            <Shape d={PATH} stroke='#DFDEDE' fill='#F5F3F3' />
            <Group x={48} y={14}>
              <Text font="11px Helvetica" fill="#757575" opacity={0.6}>First weeks</Text>
            </Group>
          </Group>

          <Group x={-30}>
            <Shape d={PATH} stroke='#DFDEDE' fill='#F5F3F3' />
            <Group x={48} y={14}>
              <Text font="11px Helvetica" fill="#757575" opacity={0.6}>First days</Text>
            </Group>
          </Group>
        </Group>
      </Surface>
    )
  }
}

module.exports = ArrowHeader;
