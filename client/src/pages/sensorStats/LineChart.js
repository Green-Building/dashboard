import React, { Component } from 'react';
import _ from 'lodash';
import {curveCatmullRom} from 'd3-shape';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LineSeriesCanvas
} from 'react-vis';

export default function LineChart (props) {
  const Line = LineSeries;
  const { sensorData } = props;
  console.log("data is>>>", sensorData.length);
  let mdata = [];
  _.forEach(sensorData, datum => {
    console.log("datum is>>>", datum);
    mdata.push(
      {
        x: new Date(datum.timeStamp),
        y: datum.data
      }
    );
  });
  console.log("mdata is>>>", mdata);
  return (
    <div>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="X Axis" position="start" />
        <YAxis title="Y Axis" />
        <Line
          className="first-series"
          data={mdata.length>0 ? mdata: [{x:1, y:2}, {x:2, y:1}]}
        />
        <Line className="second-series" data={null} />
      </XYPlot>
    </div>
  )
}