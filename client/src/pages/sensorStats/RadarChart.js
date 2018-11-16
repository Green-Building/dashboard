import React, { Component } from 'react';
import _ from 'lodash';

import { Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const formatData = ({ device_type, device }) => {
  let sensorInfos = {};
  if (device_type === 'cluster') {
    _.forEach(device.nodes, node => {
      _.forEach(node.sensors, sensor => {
        sensorInfos[sensor.type] = sensorInfos[sensor.type] ? sensorInfos[sensor.type] + 1 : 1;
      })
    })
  } else if (device_type === 'node') {
    _.forEach(device.sensors, sensor => {
      sensorInfos[sensor.type] = sensorInfos[sensor.type] ? sensorInfos[sensor.type] + 1 : 1;
    })
  } else {
    sensorInfos[device.type] = sensorInfos[device.type] ? sensorInfos[device.type] + 1 : 1;
  }
  let max = _.max(_.values(sensorInfos));
  console.log("max is >>>", max);
  let info = _.reduce(sensorInfos, (memo, value, key) => {
    let newInfo = {
      subject: key,
      A: value,
      fullMark: max,
    };
    memo.push(newInfo);
    return memo;
  }, []);
  return info;
}

export default class RaadarChart extends Component {
	render () {
    const { sensorData } = this.props;
    const data = formatData(sensorData);
  	return (
    	<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
    );
  }
}