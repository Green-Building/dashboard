import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';

export default class FloorRoomMap extends Component {

  handleValueClick(d, event) {
    const { nodes, router } = this.props;
    let node = _.find(nodes, {room_number: d.label});
    console.log("found node >>>", node);
    router.push(`/node/${node.id}`);
  }

  render() {
    const { alphabet, data } = this.props;
    const {min, max} = data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row.color),
        max: Math.max(acc.max, row.color)
      }),
      {min: Infinity, max: -Infinity}
    );

    const exampleColorScale = scaleLinear()
        .domain([min, (min + max) / 2, max])
        .range(['orange', 'yellow', 'cyan']);
    return (
      <XYPlot
        xType="ordinal"
        xDomain={alphabet.map(letter => `${letter}1`)}
        yType="ordinal"
        yDomain={alphabet.map(letter => `${letter}2`).reverse()}
        width={400}
        height={400}
        style={{display: 'inline-block'}}
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
          onValueClick={(d, {event}) => this.handleValueClick(d, event)}
        />
        <LabelSeries
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => `${d.label}`}
        />
      </XYPlot>
    )
  }
}