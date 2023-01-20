import React from 'react';
import {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import { Map, Marker} from 'react-map-gl';
import axios from 'axios';

export default function Discover() {
  const [location, setLocation] = useState({})
  const [stores, setStores] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true)
  const [loadingStores, setLoadingStores] = useState(true)
  const [loading, setLoading] = useState(true)
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null);

  // Get user location
  function getUserLocation() {
    if (navigator.geolocation) {
      setLoadingLocation(true)
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoadingLocation(false)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoadingLocation(false)
    }
  }

  // Get stores locations
  async function getStores() {
    setLoadingStores(true)
    try{
      const endpoint = 'https://z.overpass-api.de/api/interpreter';
      const response = await axios.get(endpoint, {
        params: {
          data: `
            [out:json][timeout:25];
            (
              node["shop"~"convenience|health_food|supermarket"](around:10000,${location.lat},${location.lon});
              way["shop"~"convenience|health_food|supermarket"](around:10000,${location.lat},${location.lon});
              relation["shop"~"convenience|health_food|supermarket"](around:10000,${location.lat},${location.lon});
            );
            out body;
            >;
            out skel qt;
          `
        }
      });
      setStores(response.data.elements);
      setLoadingStores(false)
    } catch (error) {
      console.log(error);
    }
  }


  function plotMap() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.lon, location.lat],
      zoom: 10
    });

    stores.forEach(store => {
      new mapboxgl.Marker()
        .setLngLat([store.lon, store.lat])
        .addTo(map);
    });

    setMap(map);
  }

  return (
    <div className="discover">
      <h1>Discover</h1>
      <p>Find nearby stores</p>

      <div className="discoverSection">
        <button className="discoverBtn" onClick={getUserLocation}>Get your location</button>
        {loadingLocation ? <p>Loading location...</p> : <p>latitude: {location.lat} Longitude: {location.lon}</p>}
      </div>
      
      <div className="discoverSection">
        <button className="discoverBtn" onClick={getStores}>Find nearby stores</button>
        {loadingStores ? <p>Loading stores...</p> : <p>Number of Stores Found: {stores.length}</p>}
      </div>
      
      <div className="discoverSectionMap">
        <button className="discoverBtn" onClick={plotMap}>Render map</button>
        <div id="map"></div>
      </div>

    </div>
  );
}