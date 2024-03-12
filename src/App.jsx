import { useRef, useState, useCallback ,useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {updateuserplaces,fetchuserplaces} from './http.js';
import Error from './components/Error.jsx';

function App() {
  const [isloading,setloading]=useState(false);
  const [error,setError]=useState()
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);


  const [errorupdateplaces,seterorupdatingplaces]=useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);


useEffect(()=>{
  async function fetchplaces(){
setloading(true);
    try {
      const places = await fetchuserplaces();
      setUserPlaces(places);
    } catch (error) {
      
      setError({message:error.message||'failed to fetch user places '});
    }
    setloading(false);

  } 
  fetchplaces();
},[])


  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function  handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      await updateuserplaces([selectedPlace,...userPlaces]);
    }catch(err){
      setUserPlaces(userPlaces);
      seterorupdatingplaces({message:err.message || 'Error in updating places' });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id))

      try{
        await updateuserplaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
         )
      } catch (error) {
        setUserPlaces(userPlaces);
        seterorupdatingplaces({message:err.message || 'Error in delete places' });
        
      }
  

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleerror(){
    seterorupdatingplaces(null);
  }

  return (
    <>
    <Modal open={errorupdateplaces}  onClose={handleerror}>
      {
        errorupdateplaces&&( 
          <Error title="An error occured" message={errorupdateplaces.message} onConfirm={handleerror} ></Error>
        )
      }
    </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {
          error && <Error title="error occured " message={error.message}></Error>
        }
        {!error &&(<Places
          isloading={isloading}
          loadingtext="select the places you would like to visit"
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />)}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
