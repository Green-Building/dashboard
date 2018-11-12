import _ from 'lodash';
import moment from 'moment';
import client from '../client';

import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  cluster: {},
  isLoading: true,
  errorMessage: null,
};

//
// CONSTANTS
//

const ADD_CLUSTER_CONFIG = 'ADD_CLUSTER_CONFIG';
const SUCCESS_ADD_CLUSTER_CONFIG = 'SUCCESS_ADD_CLUSTER_CONFIG';
const ERROR_ADD_CLUSTER_CONFIG = 'ERROR_ADD_CLUSTER_CONFIG';

const UPDATE_CLUSTER_CONFIG = 'UPDATE_CLUSTER_CONFIG';
const SUCCESS_UPDATE_CLUSTER_CONFIG = 'SUCCESS_UPDATE_CLUSTER_CONFIG';
const ERROR_UPDATE_CLUSTER_CONFIG = 'ERROR_UPDATE_CLUSTER_CONFIG';

const DELETE_CLUSTER_CONFIG = 'DELETE_CLUSTER_CONFIG';
const SUCCESS_DELETE_CLUSTER_CONFIG = 'SUCCESS_DELETE_CLUSTER_CONFIG';
const ERROR_DELETE_CLUSTER_CONFIG = 'ERROR_DELETE_CLUSTER_CONFIG';

//
// ACTIONS
//


const clusterConfig = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default clusterConfig;