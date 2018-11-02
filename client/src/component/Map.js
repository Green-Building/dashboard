import React from 'react';
import _ from 'lodash';
import axios from 'axios';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBR8audAZcde2CziPeIvxy5n75kvGst41k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 37.77, lng: -122.42
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onMarkerClick: (index) => {
          console.log("this.props>>>", this.props);
          console.log("clicked>>", this.state.markers[index]);
          this.props.router.push('/building');
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });

          const place = places[0];
          console.log("place is >>>", place.geometry.location.lng(), place.geometry.location.lat());
          axios.post('http://localhost:4001/buildings', {
            data: {
              longitude: place.geometry.location.lng(),
              latitude:  place.geometry.location.lat(),
            },
          })
          .then(response => {

            const buildings = response.data.buildings;
            /*
            _.forEach(buildings, building => {
              console.log("building.location>>", building.position);
              bounds.extend(new window.google.maps.LatLng(building.position.lat, building.position.lng));
            });
            */
            bounds.extend(new window.google.maps.LatLng(38, -123));
            console.log("refs.map>>>", refs.map);
            refs.map.fitBounds(bounds);

            this.setState({
              center: {lat: place.geometry.location.lat(), lng:  place.geometry.location.lng()},
              markers: buildings,
            });
          })
          .catch(err => {
            console.log("error getting adjacent buildings>>", err);
          });

        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {_.map(props.markers,(marker, index) => {
      console.log("marker is >>>", marker);
      console.log("index is >>>", index);
      return <Marker key={index} position={marker.position} onClick={()=>props.onMarkerClick(index)}/>;
    })}
  </GoogleMap>
);

export default MapWithASearchBox;
