import React, { Component } from 'react';
import {scaleLinear} from 'd3-scale';
import { Button } from 'semantic-ui-react';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const data = alphabet.reduce((acc, letter1, idx) => {
  return acc.concat(
    alphabet.map((letter2, jdx) => ({
      x: `${letter1}1`,
      y: `${letter2}2`,
      color: (idx + jdx) % Math.floor(jdx / idx) || idx
    }))
  );
}, []);
const {min, max} = data.reduce(
  (acc, row) => ({
    min: Math.min(acc.min, row.color),
    max: Math.max(acc.max, row.color)
  }),
  {min: Infinity, max: -Infinity}
);

const exampleColorScale = scaleLinear()
    .domain([min, (min + max) / 2, max])
    .range(['orange', 'white', 'cyan']);

class Floor extends Component {

  goToSensorStats = () => {
    this.props.router.push('/sensor-data');
  }
  render() {
    return (
      <XYPlot
        xType="ordinal"
        xDomain={alphabet.map(letter => `${letter}1`)}
        yType="ordinal"
        yDomain={alphabet.map(letter => `${letter}2`).reverse()}
        margin={50}
        width={500}
        height={500}
      >
        <XAxis orientation="top" />
        <YAxis />
        <HeatmapSeries
          colorType="literal"
          getColor={d => exampleColorScale(d.color)}
          style={{
            stroke: 'white',
            strokeWidth: '2px',
            rectStyle: {
              rx: 10,
              ry: 10
            }
          }}
          className="heatmap-series-example"
          data={data}
        />
        <LabelSeries
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => `${d.color}`}
        />
        <Button onClick={this.goToSensorStats}>Goto Sensor Stats</Button>
      </XYPlot>
    );
  }
}
export default Floor;