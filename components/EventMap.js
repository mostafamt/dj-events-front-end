import React from "react";
import Image from "next/image";
import ReactMapGl, { Marker } from "react-map-gl";
// import "mapbox-gl/dist/mapbox.gl.css";
import Geocode from "react-geocode";

function EventMap({ evt }) {
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [viewport, setViewport] = React.useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: "100%",
    height: "500px",
    zoom: 8,
  });

  React.useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  if (loading) return false;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAcessToken={
        "pk.eyJ1IjoibW9zdGFmYW10IiwiYSI6ImNsNnlpaHY1ZzAyamIzY24zY24wc2VodWYifQ.BmOyWezfIDxtSARpe_g5iQ"
      }
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        Hello
      </Marker>
    </ReactMapGl>
  );
}

export default EventMap;
