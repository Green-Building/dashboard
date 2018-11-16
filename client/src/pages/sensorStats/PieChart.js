import React, { Component } from 'react';
import _ from 'lodash';

import { PieChart, Pie, Sector, Cell } from 'recharts';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (pieData) => {
  const { name, cx, cy, midAngle, innerRadius, outerRadius, percent, index } = pieData;
 	const radius = innerRadius + (outerRadius - innerRadius) * 1;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
  let info = _.reduce(sensorInfos, (memo, value, key) => {
    let newInfo = {
      name: key,
      value: value,
    };
    memo.push(newInfo);
    return memo;
  }, []);
  return info;
}

export default class PieeChart extends Component {
	render () {
    const { sensorData } = this.props;
    const data = formatData(sensorData);
    console.log("data is >>>", data);
  	return (
    	<PieChart width={500} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}