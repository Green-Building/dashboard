import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import { Container, Button } from 'semantic-ui-react';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';


class Floor extends Component {
  state = {
    cluster: {},
    nodes: [],
    data: [],
    alphabet: ['A', 'B', 'C', 'D', 'E']
  }

  componentDidMount() {
    console.log("this.props>>>", this.props);
    const  { building_id, floor_num } = this.props.params;
    return axios.get('http://localhost:4001/clusters/cluster_from_floor', {
      params: {
        building_id,
        floor: floor_num
      }
    })
    .then(response => {
      console.log("response is >>>", response);
      let cluster = response.data;

      const data = this.state.alphabet.reduce((acc, letter1, idx) => {
        return acc.concat(
          this.state.alphabet.map((letter2, jdx) => ({
            x: `${letter1}1`,
            y: `${letter2}2`,
            color: 0,
            label: ''
          }))
        );
      }, []);

      _.forEach(cluster.nodes, (node, i) => {
        data[i].color = 1;
        data[i].label = node.room;
      })

      this.setState({cluster, nodes: cluster.nodes, data: data});
    })
    .catch(err => {
      console.log("err retrieving clusters from floor>>", err);
    })
  }

  goToSensorStats = () => {
    this.props.router.push('/sensor-data');
  }

  handleValueClick(d, event) {
    console.log("d is>>>", d);
    console.log("event is>>>", event);
  }
  render() {
    const {min, max} = this.state.data.reduce(
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
      <Container>
        <XYPlot
          xType="ordinal"
          xDomain={this.state.alphabet.map(letter => `${letter}1`)}
          yType="ordinal"
          yDomain={this.state.alphabet.map(letter => `${letter}2`).reverse()}
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
            data={this.state.data}
            onValueClick={(d, {event})=>this.handleValueClick(d, event)}
          />
          <LabelSeries
            data={this.state.data}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={d => `${d.label}`}
          />
        </XYPlot>
        <Button onClick={this.goToSensorStats}>Goto Sensor Stats</Button>
      </Container>
    );
  }
}
export default Floor;