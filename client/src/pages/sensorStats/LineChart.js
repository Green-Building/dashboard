import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
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
  const data = sensorData.data;
  console.log("data is>>>", data);
  let mData = {};
  _.forEach(data, (value, key) => {
    mData[key] = [];
  });
  _.forEach(data, (values, key) => {
    console.log("datum is>>>", values);
    _.forEach(values, value => {
      mData[key].push(
        {
          x: new Date(value.timeStamp),
          y: value.data
        }
      );
    })
  });
  console.log("mdata is>>>", mData);
  return (
    <div>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="X Axis" position="start" />
        <YAxis title="Y Axis" />
        {_.map(mData, (data, key) => {
          console.log("linegraph data is >>>", data);
          return (
            <Line
              key={key}
              className="first-series"
              data={data.length>0 ? data: [{x:1, y:2}, {x:2, y:1}]}
            />
          )
        })}

        <Line className="second-series" data={null} />
      </XYPlot>
    </div>
  )
}