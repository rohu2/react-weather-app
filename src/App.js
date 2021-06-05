import {useState, useEffect, useRef} from 'react'
import './App.css';
import Input from './components/Input'
import Temperature from './components/Temperature'
import flipImg1 from './img/flip1.png'
import flipImg2 from './img/flip2.png'
import {unsplashApiKey, weatherApiKey} from './apiKey.js'

import Map from './components/Map.jsx'



const {['log']:c} = console


let COUNTRY_CODES = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AN", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CC", "CD",  "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "FI", "FJ", "FK", "FM",  "FO", "FR", "GA", "GB",  "GD", "GE", "GG", "GH", "GI", "GL", "GM", "GN", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP",  "KR",  "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD",  "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PN", "PR", "PS",  "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US",  "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZM", "DE"]

let COUNTRY_NAMES = ["Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Antilles", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Åland", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthélemy", "Bermuda", "Brunei", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Botswana", "Belarus", "Belize", "Canada", "Cocos [Keeling] Islands", "DR Congo", "Central African Republic", "Congo Republic", "Switzerland", "Ivory Coast", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cabo Verde", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Europe","Finland", "Fiji", "Falkland Islands", "Micronesia", "Faroe Islands", "France", "Gabon", "United Kingdom", "Grenada", "Georgia", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea",  "Equatorial Guinea", "Greece", "South Georgia and South Sandwich Islands", "Guatemala", "Guam", "Guinea Bissau", "Guyana", "Hong Kong", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "Isle of Man", "India", "Iraq", "Iran", "Iceland", "Italy", "Jersey", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "St Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova", "Montenegro", "Saint Martin", "Madagascar", "Marshall Islands", "North Macedonia", "Mali", "Myanmar", "Mongolia", "Macao", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Pitcairn Islands", "Puerto Rico", "Palestine", "Portugal", "Palau", "Paraguay", "Qatar", "Réunion", "Romania", "Serbia", "Russia", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "São Tomé and Príncipe", "El Salvador", "Sint Maarten", "Syria", "Eswatini", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United States of America", "Uruguay", "Uzbekistan", "Vatican City", "St Vincent and Grenadines", "Venezuela", "British Virgin Islands", "U.S. Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe","Alemania"]






function App() {

const [city, setCity] = useState('')
const [weather, setWeather] = useState({ temp:0, isDay:0, region:0 })
const [imgURL, setImgUrl] = useState('')

const [isClickable, setIsClickable] = useState(true)
const [showDisplay, setShowDisplay] = useState(false)

const [flag, setFlag] = useState('')
const [flip, setFlip] = useState(true)

const flagRef = useRef()
let inputRef = useRef() 
let selectedCity = useRef()

const [predictTxt, setPredictTxt] = useState('')

const [center, setCenter] = useState({lat: 13.113592, lng: -62.366592 })
const [mapId, setMapId] = useState(0)
const [showMap, setShowMap] = useState(false)









async function apiCall() {

let searchTerm = city;

let exceptions = {
  
'santa cruz' : '95060',
'santa cruz bolivia' : 'Santa Cruz',



};

for (const key in exceptions) {
if (key === city.match(/(\b)\w+/g).map((char)=> char.toLowerCase()).join(' ')

  ){

    searchTerm = exceptions[key]


searchTerm.match(/(\b)\w+/g)
  }
    
  }




let res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${searchTerm}&aqi=no`)


let data = await res.json()


if(!!data?.error){ c(data, 'errorrrr!'); setFlip(true) }

if(!!data?.location){     
  


setWeather({

  ...weather, 
  name: data.location.name, 
  region: data.location.region, 
  country:data.location.country, 
  localtime: data.location.localtime,  
  temp: data.current.temp_c, 
  isDay: data.current.is_day,
  condition: data.current.condition.text,
  lat: data.location.lat,
  lng: data.location.lon,
  

})





}

}


useEffect(() => {
 
    unsplashAPI()

    setMapId(Math.random())
    if(!!weather.region){
      setCenter({lat: weather.lat, lng: weather.lng})
    }
  

  
  
}, [weather]  );


useEffect(() => {
 
let idx = COUNTRY_NAMES.indexOf(weather.country)
setFlag(COUNTRY_CODES[idx])


}, [weather]);





  useEffect(() => {
 
    if(weather.name === 'Schönebeck'){

      setWeather({ ...weather, country: 'Germany',})
      
      }
    
    
    }, [flag]);






async function unsplashAPI() {


  let query = city || 'landscape'
  let random = Math.round(Math.random() * 10)
  let randomRange = Math.round(Math.random() * 9)

  
  let unsplashCall = await fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${query}&page=${random}`).then( (res)=> {

  if(res.status === '403'){ 

  fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${weather.country}&page=${random}`).then((resp)=> {return resp})

  }

  else { processUnsplashAPI(res)} 

})


}


async function processUnsplashAPI(unsplashCall){


  let random = Math.round(Math.random() * 10)
  let randomRange = Math.round(Math.random() * 9)

  let images = await unsplashCall.json();
 

if(images.results.length !== 0){

let result = await setImgUrl(images?.results[randomRange]?.urls?.regular) 
}

else if(images.results.length === 0 ){


  let unsplashCall = await fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${weather.country}&page=${random}`)

  let images = await unsplashCall.json();

  let result = await setImgUrl(images?.results[randomRange]?.urls?.regular) 

 

}


}










  return (


    

<div className="App" onClick={()=>{ setPredictTxt([]); setIsClickable(true); selectedCity.current = null  }}   >


<img className='backdrop'onLoad={()=>{ 
                setShowDisplay(true)  }} src={ imgURL !== undefined ? imgURL : unsplashAPI()}/>




<div className='flip-box-container' >
     
<div style={ flip ? {transform: 'rotateY(0deg)'} : {transform: 'rotateY(180deg)'} }  className='flip-box' >



<div className='control' >



{ !!weather.region ? <button className='flip-button'  onClick={()=>{ setFlip(!flip) }} ><img className='flip-img' src={flipImg1}/></button> : ''}


<Input unsplashAPI={unsplashAPI}   setCity={setCity} inputRef={inputRef} predictTxt={predictTxt}  setPredictTxt={setPredictTxt}   isClickable={isClickable} setIsClickable={setIsClickable} setFlip={setFlip}  apiCall={apiCall} setShowDisplay={setShowDisplay} selectedCity={selectedCity} />




</div>


<div className='info'   >


<div className='spinner-container'  style={{ opacity : showDisplay ? '0' : '1' }} >

  <div className='spinner'>

  <div></div>

  <div></div>


  </div>

  </div>
 
<div style={{ opacity : showDisplay? '1' : '0' }}>

<button className='flip-button' onClick={()=>{ setFlip(!flip) }} ><img className='flip-img' src={flipImg2}/></button>


<div > {!!flag ? <img ref={flagRef} src={`https://www.countryflagicons.com/FLAT/64/${flag}.png`}/> : ''}</div>


<div style={ {opacity : showMap ? '1' : '1', height: '100px', width: '150px' }} className='modal'>


<Map 
latLng  = {center}
/>  
</div>


<Temperature temp={weather.temp} condition={weather.condition} region={weather.region} name={weather.name} country={weather.country}/>







</div>  




</div>









   
</div>

</div>





    </div>
  );
}

export default App;
