import React from 'react';
import _ from 'lodash';
import client from '../client';
import { Link } from 'react-router';
import { Form, Input, Button, Grid } from 'semantic-ui-react';
import {
  INFRA_MANAGER_HOST
} from '../api-config';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import MarkerWithInfoWindow from './MarkerWithInfoWindow';

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBR8audAZcde2CziPeIvxy5n75kvGst41k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `540px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        refs: refs,
        bounds: null,
        center: {
          lat: 37.77, lng: -122.42
        },
        markers:[],
        city: '',
        state: '',
        zipcode: '',
        radius: 5,
        onFormUpdate:  (event, data) => {
          this.setState({[data.name]: data.value});
        },
        onSubmitForm: event => {
          event.preventDefault();
          console.log("form submitted!!!");
          console.log("this.state is>>", this.state);
          let locationParams = {};
          if(this.state.zipcode) {
            locationParams.zipcode = this.state.zipcode;
          } else {
            locationParams.city = this.state.city;
            locationParams.state = this.state.state;
          }
          return client.get(`${INFRA_MANAGER_HOST}/buildings/search/location`, {
            params: locationParams,
          })
          .then(response => {
            console.log("response is >>>", response);
            let buildings = response.data;
            if(buildings.length >= 1) {
              _.forEach(buildings, building => {
                building.position = {
                  lat: building.latitude,
                  lng: building.longitude,
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
          const id =  this.state.markers[index].id;
          this.props.router.push(`/building/${id}`);
        },
        handleBuildingClick: marker => {
          this.props.router.push(`/building/${marker.id}`);
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
          client.get(`${INFRA_MANAGER_HOST}/buildings/search/geocode`, {
            params: {
              longitude: place.geometry.location.lng(),
              latitude:  place.geometry.location.lat(),
              radius: +this.state.radius,
            },
          })
          .then(response => {

            const buildings = response.data;

            bounds.extend(new window.google.maps.LatLng(38, -123));
            refs.map.fitBounds(bounds);
            _.forEach(buildings, building => {
              building.position = {
                lat: building.latitude,
                lng: building.longitude,
              }
              building.clicked = false;
            });
            console.log("buildings is >>>", buildings);
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
  <Grid>
    <Grid.Row>
      <Form onSubmit={(e)=>props.onSubmitForm(e)}>
        <Form.Group >
          <Form.Field>
            <label>City</label>
            <Input name='city' value={props.city} placeholder='City' onChange={props.onFormUpdate} />
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <Input name='state' value={props.state} placeholder='State'onChange={props.onFormUpdate} />
          </Form.Field>
          <Form.Field>
            <label>Zipcode</label>
            <Input name='zipcode' value={props.zipcode} placeholder='Zipcode' onChange={props.onFormUpdate} />
          </Form.Field>
          <Form.Field>
            <label>Default Radius</label>
            <Input name='radius' value={props.radius} placeholder='Radius' onChange={props.onFormUpdate} />
          </Form.Field>
          <Form.Field>
            <label>Submit</label>
            <Button type="submit">Submit</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Grid.Row>
    <Grid.Row>
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
        return <MarkerWithInfoWindow position={marker.position} building={marker} router={props.router} />
        })}
      </GoogleMap>
    </Grid.Row>
  </Grid>
);

export default MapWithASearchBox;
