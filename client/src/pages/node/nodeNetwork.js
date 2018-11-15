import React, { Component } from 'react';
import _ from 'lodash';
import Tree from 'react-d3-tree';

export default class NodeNetwork extends Component {

  handleClick = (nodeData, evt) => {
    console.log("nodeData>>", nodeData);
    console.log("evt>>>", evt);
    const { router } = this.props;
    if(nodeData.sensor_id) {
      router.push(`/sensor?type=sensor&id=${nodeData.sensor_id}`);
    }
  }
  render() {
    let treeDataWrapper = [];
    const { node } = this.props;
    let treeData = {
      name: `node:${node.id}`,
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
        name: `${child.type}:${child.id}`,
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
    const lineAttr = {
      stroke: 'black',
      strokeWidth: 1,
    };
    const nodeAttr = {
      stroke: 'transparent',
      strokeWidth: 1,
    }
    let styles= {
      links: lineAttr,
      nodes: {
        node: {
          circle: nodeAttr,
          name: nodeAttr,
          attributes: nodeAttr,
        },
        leafNode: {
          circle: nodeAttr,
          name: nodeAttr,
          attributes: nodeAttr,
        },
      }
    }
    return (
      <div id="treeWrapper" style={{ height: '30em'}}>
        <Tree
          data={treeDataWrapper}
          nodeSvgShape={{shape: 'circle', shapeProps: {r: 10}}}
          translate={{x: 350, y: 100}}
          pathFunc="straight"
          onClick={this.handleClick}
          collapsible={false}
          zoom={1}
          styles={styles}
          textLayout={{transform: 'rotate(-20 70 100)'}}
          orientation="vertical"
        />
      </div>
    );
  }
}