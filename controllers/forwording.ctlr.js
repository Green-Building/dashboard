
const INFRA_MANAGER_HOST = 'http://localhost:8080';
const DATA_MANAGER_HOST = 'http://localhost:8080';
const SIMULATOR_HOST = 'http://localhost:8080';

const getBuilding = (req, res) => {
  const { building_id } = req.params;
  return axios.get(`${INFRA_MANAGER_HOST}/buildings/${building_id}`)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error getting building>>>", err);
  })
}

module.exports = {
  getBuilding,
}