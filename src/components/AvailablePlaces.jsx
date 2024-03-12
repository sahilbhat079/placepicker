import Places from './Places.jsx';
import { useState,useEffect } from 'react';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchdataplaces} from '../http.js';


export default function AvailablePlaces({ onSelectPlace }) {
  const [isloading,setloading]=useState(false);
  const [availableplaces,setavailableplaces]=useState([]);
  const [error,setError]=useState();

useEffect(()=>{
  async function fetchplaces(){
  setloading(true);
    try {
    const places=await fetchdataplaces();
   navigator.geolocation.getCurrentPosition((position)=>{
  const sortedplaces=sortPlacesByDistance(places,
    position.coords.latitude,
    position.coords.longitude);
    setavailableplaces(sortedplaces);
    setloading(false);
   })

    } catch (error) {
      setError({message:error.message||'Could not fetch please try again later'});
    }
}
fetchplaces();
},[])


if(error){
  return <Error  title="error occured" message={error.message}></Error>
}

  return (
    <Places
      title="Available Places"
      places={availableplaces}
      isloading={isloading}
      loadingtext="Fetching available places;"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
