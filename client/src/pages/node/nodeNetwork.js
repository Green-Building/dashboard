import React, { Component } from 'react';
import _ from 'lodash';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Top Level',
    nodeSvgShape: {
      shape: 'rect',
      shapeProps: {
        width: 20,
        height: 20,
        x: -10,
        y: -10,
        fill: 'cyan',
      },
    },
    children: [
      {
        name: 'Level 2: A',
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 10,
            fill: 'orange',
          },
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];

export default class NodeNetwork extends Component {

  handleClick = (nodeData, evt) => {
    console.log("nodeData>>", nodeData);
    console.log("evt>>>", evt);
    const { router } = this.props;
    if(nodeData.sensor_id) {
      router.push(`/sensor/${nodeData.sensor_id}`);
    }
  }
  render() {
    let treeDataWrapper = [];
    const { node } = this.props;
    console.log("node is >>>", node);
    let treeData = {
      name: node.name,
      node_id: node.id,
      nodeSvgShape: {
        shape: 'rect',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
          fill: 'cyan',
        },
      },
    }
    treeData.children = _.map(node.sensors, child => {
      return {
        name: child.name,
        sensor_id: child.id,
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 10,
            fill: 'orange',
          },
        },
      };
    });
    treeDataWrapper.push(treeData);
    return (
      <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
        <Tree
          data={treeDataWrapper}
          nodeSvgShape={{shape: 'circle', shapeProps: {r: 10}}}
          translate={{x: 50, y: 100}}
          pathFunc="straight"
          onClick={this.handleClick}
          collapsible={false}
        />
      </div>
    );
  }
}