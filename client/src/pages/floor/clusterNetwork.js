import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Label } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class ClusterNetwork extends Component {
  render() {
    return (
      <div>
        <Label>Cluster network</Label>
        <svg>
          <circle r="50" fill="green" cx="100" cy="100"></circle>
        </svg>
      </div>
    );
  }
}