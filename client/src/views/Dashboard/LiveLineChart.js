import React, { Component } from 'react';
import moment from 'moment';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import { fetchLiveSensorData } from '../../reducers/sensorData';

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');
var elements = 27;
var data1 = [];

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
}

const mainChart = {
  datasets: [
    {
      label: 'Live Sensor Data',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class LiveLineChart extends Component {
  state = {
    currentCount: 10,
  }

  componentDidMount() {
    this.countdown = setInterval(this.timer, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  timer = () => {
    const { fetchLiveSensorData, device, device_type } = this.props;
    let tenSecEarly = moment().subtract(10, 'seconds').format("YYYY-MM-DDThh:mm:ss");
    let nowTime =  moment().format("YYYY-MM-DDThh:mm:ss");
    return fetchLiveSensorData(device_type, device.id, tenSecEarly, nowTime);
  }

  render() {
    return (
      <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
        <Line data={mainChart} options={mainChartOpts} height={300} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    device: state.sensorData.device,
    device_type: state.sensorData.device_type,
    data: state.sensorData.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLiveSensorData: (type, id, startTime, endTime) => {
      dispatch(fetchLiveSensorData(type, id, startTime, endTime))
    },
  }
}

LiveLineChart = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveLineChart));

export default LiveLineChart;

