import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Input, Button } from 'semantic-ui-react';
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
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        refs: refs,
        bounds: null,
        center: {
          lat: 37.77, lng: -122.42
        },
        markers: [],
        city: '',
        state: '',
        zipcode: '',
        onFormUpdate:  (event, data) => {
          console.log("data is >>", data);
          this.setState({[data.name]: data.value})
        },
        onSubmitForm: event => {
          event.preventDefault();
          console.log("form submitted!!!");
          console.log("this.state is>>", this.state);
          return axios.get('http://localhost:4001/buildings/search/location', {
            params: {
              city: this.state.city
            }
          })
          .then(response =>{
            console.log("response is >>>", response);
            let buildings = response.data.buildings;
            if(buildings.length >= 1) {
              _.forEach(buildings, building => {
                building.position = {
                  lat: building.building.latitude,
                  lng: building.building.longitude,
                }
              });
              let newCenter = {lat: buildings[0].position.lat, lng:  buildings[0].position.lng};
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(new window.google.maps.LatLng(newCenter.lat, newCenter.lng));
              _.forEach(buildings, building => {
                bounds.extend(new window.google.maps.LatLng(building.position.lat, building.position.lng));
              })
              this.state.refs.map.fitBounds(bounds);
              this.setState({center:newCenter,  markers: buildings});
            }
          })
          .catch(err => {
            console.log("err searching buildings by city>>", err);
          })
        },
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
          const id =  this.state.markers[index].building.id;
          this.props.router.push(`/building/${id}`);
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
          axios.get('http://localhost:4001/buildings/search/geocode', {
            params: {
              longitude: place.geometry.location.lng(),
              latitude:  place.geometry.location.lat(),
            },
          })
          .then(response => {

            const buildings = response.data.buildings;
            bounds.extend(new window.google.maps.LatLng(38, -123));
            refs.map.fitBounds(bounds);
            _.forEach(buildings, building => {
              building.position = {
                lat: building.building.latitude,
                lng: building.building.longitude,
              }
            });

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
  <Form onSubmit={(e)=>props.onSubmitForm(e)}>
    <Form.Group >
      <Form.Field>
        <label>City</label>
        <Input name='city'  placeholder='City' onChange={props.onFormUpdate}/>
      </Form.Field>
      <Form.Field>
        <label>State</label>
        <Input name='state' placeholder='State'/>
      </Form.Field>
      <Form.Field>
        <label>Zipcode</label>
        <Input name='zipcode' placeholder='Zipcode' />
      </Form.Field>
    </Form.Group>
    <Form.Field control={Button}>Submit</Form.Field>
    <Form.Group >
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
          <Input
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
    </Form.Group>
  </Form>

);

export default MapWithASearchBox;
