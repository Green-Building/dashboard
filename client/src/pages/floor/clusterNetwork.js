import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Label } from 'semantic-ui-react';
import Tree from 'react-d3-tree';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class ClusterNetwork extends Component {
  handleClick = (nodeData, evt) => {
    console.log("nodeData>>", nodeData);
    console.log("evt>>>", evt);
    const { router } = this.props;
    console.log("router is >>>", router);
    if(nodeData.node_id) {
      router.push(`/node/${nodeData.node_id}`);
    }
  }
  render() {
    let treeDataWrapper = [];
    const { cluster } = this.props;
    console.log("cluster is >>>", cluster);
    let treeData = {
      name: cluster.name,
      cluster_id: cluster.id,
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
    treeData.children = _.map(cluster.nodes, child => {
      return {
        name: child.name,
        node_id: child.id,
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