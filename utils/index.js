const _ = require('lodash');

function generateNest(start, query, db) {
  const map = _.reduce(query.split(','), (memo, value, key) => {
    memo[value] = true;
    return memo;
  }, {});
  switch(start) {
    case 'building':
    case 'floor':
    case 'cluster':
    case 'node':
      return buildingCase(map, db);
    default:
      throw new Error("invalid option");
  }
}

function buildingCase(map, db) {
  let floorMapping = {}, clusterMapping={}, result=[];
  if (map['floor']) {
    floorMapping = {
      model: db.floor,
    }
    if(map['room']) {
      floorMapping.include = [
        {model: db.room}
      ]
    }
  }
  if (map['cluster']) {
    clusterMapping = {
      model: db.cluster,
    }
    if(map['node']) {
      clusterMapping.include = [
        {model: db.node}
      ]
    }
    if(map['sensor']) {
      clusterMapping.include[0].include = [
        {model: db.sensor}
      ]
    }
  }
  if(!_.isEmpty(floorMapping)) {
    result.push(floorMapping);
  }
  if(!_.isEmpty(clusterMapping)) {
    result.push(clusterMapping);
  }
  return result;
}

module.exports =  {
  generateNest,
};