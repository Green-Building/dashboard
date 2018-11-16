import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';
import { Segment, Label } from 'semantic-ui-react';
import Modal from 'react-modal';

import RoomNodeNetwork from './roomNodeNetwork';

const alphabet = ['A', 'B', 'C', 'D', 'E'];
export default class FloorRoomMap extends Component {
  state = {
    modalIsOpen: false,
    selectedRoom: {},
  }
  handleValueClick(d, event) {
    const { rooms, router, roomMap } = this.props;
    let room = _.find(rooms, {room_number: d.label});
    console.log("found node >>>", room);
    //router.push(`/node/${room.node.id}`);
    this.setState({
      modalIsOpen: true,
      selectedRoom: room
    });
  }

  closeModal= () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { roomMap, rooms, router } = this.props;
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
      <div id="floorColorMap" style={{borderRadius: '2px', boxShadow: '2px 3px 4px #666'}}>
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
        <Modal
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.6)'
            },
            content: {
              color: 'lightsteelblue',
              width: '60%',
              height: '90%',
              align: 'center',
              margin: 'auto',
            }
          }}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Node Network"
          role="document"
          ariaHideApp={false}
        >
          <Segment>
            <Label>Room # {this.state.selectedRoom.room_number}</Label>
            <RoomNodeNetwork room={this.state.selectedRoom} router={router} />
          </Segment>
        </Modal>
      </div>
    )
  }
}