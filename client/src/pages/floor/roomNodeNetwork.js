import React, { Component } from 'react';
import _ from 'lodash';
import Tree from 'react-d3-tree';

import NodeNetwork from '../node/nodeNetwork';

export default class RoomNodeNetwork extends Component {

  render() {
    const { router, room } = this.props;
    let node = room.node;
    return <NodeNetwork node={node} router={router}/>
  }
}