import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';

const alphabet = ['A', 'B', 'C', 'D', 'E'];
export default class FloorRoomMap extends Component {

  handleValueClick(d, event) {
    const { rooms, router, roomMap } = this.props;
    let room = _.find(rooms, {room_number: d.label});
    console.log("found node >>>", room);
    router.push(`/node/${room.node.id}`);
  }

  render() {
    const { roomMap, rooms } = this.props;
    const {min, max} = roomMap.reduce(
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
      <div id="floorColorMap">
        <XYPlot
          xType="ordinal"
          xDomain={alphabet.map(letter => `${letter}1`)}
          yType="ordinal"
          yDomain={alphabet.map(letter => `${letter}2`).reverse()}
          width={250}
          height={250}
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
            data={roomMap}
            onValueClick={(d, {event}) => this.handleValueClick(d, event)}
          />
          <LabelSeries
            data={roomMap}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={d => `${d.label}`}
          />
        </XYPlot>
      </div>
    )
  }
}