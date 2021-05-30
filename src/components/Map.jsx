import React, {useRef, useEffect} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import {gMapsApiKey} from '../apiKey.js'

const center ={

lat: 39.99,
lng: 45.22

}



const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    // zoomControl: true,
  };


const Map = ({ latLng }) => {


    const containerStyle = {
    
        width: '100%',
        height: '100%',
        border: '1px solid black',
        
        
        }


let mapRef = useRef()

const loadRef = (e) => {

mapRef.current = e

}


const pan = () => {

    const latLng ={

        lat: 20.99,
        lng: 11.22
        
        }


mapRef.current.panTo(latLng)

}

useEffect(() => {
  
    if(!!mapRef.current){

        mapRef.current.panTo(latLng)

    }


}, [latLng])




    return (
        <>

<LoadScript googleMapsApiKey={gMapsApiKey} >

<GoogleMap
mapContainerStyle={containerStyle}
center={center}
zoom={6}
onLoad={loadRef}
options={options}
>



</GoogleMap>

</LoadScript>

        </>
    )
}


export default Map
