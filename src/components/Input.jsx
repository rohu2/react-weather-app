import {useRef, useState, useEffect} from 'react'
import City from './City.jsx'
import cities from './cities.js'
const {['log']:c} = console






const Input = ({ weather, setCity, inputRef, predictTxt, setPredictTxt, isClickable, setIsClickable, setFlip, setShowDisplay, apiCall, selectedCity  }) => {



let autoSuggests = useRef()








function setAutoCompleteTimer(){

let snapshot = inputRef.current.value

setTimeout(() => {
    
if(snapshot === inputRef.current.value){

autoComplete()

}


}, 900);



}



function autoComplete(){


const rawInput = inputRef.current.value.split('').map((char, i)=>{

return char.toLowerCase();

}).join('');

const input = rawInput



let candidates = []


if(input.length > 0){
for (let i = 0; i < cities.length; i++) {
    

    let city = cities[i];
    const slice = city.slice(0,input.length).split('').map((char)=>{ return char.toLowerCase()  }).join('')
   

    if(slice === input){

      candidates.push(city)

    }

if( city === input){

    setPredictTxt([])

}


  
}
setPredictTxt(candidates)

}
}


const handleKeyPress = (event) => {
   

    if(event.key === 'ArrowUp'){

    

        if(!!selectedCity.current && !!selectedCity.current?.previousSibling){     

            setIsClickable(false)

            selectedCity.current.classList.remove('select');
            selectedCity.current = selectedCity.current.previousSibling
            selectedCity.current.classList.add('select');


          }

    }

    if(event.key === 'ArrowDown'){
    
      

        if(!!selectedCity.current && !!selectedCity.current?.nextSibling){     

            setIsClickable(false)

            selectedCity.current.classList.remove('select');
            selectedCity.current = selectedCity.current.nextSibling
            selectedCity.current.classList.add('select');
          
          }


          if(!selectedCity.current && autoSuggests.current?.children.length > 0 ){
 
            setIsClickable(false)

            selectedCity.current = autoSuggests.current.children[0];
            selectedCity.current.classList.add('select');
           
    
        }


    }



    if(event.key === 'Enter' && !selectedCity.current){

                setCity(inputRef.current.value)
                apiCall(); 
               
               
               
                setFlip(false);
                setShowDisplay(false)
            
        
            }




    if(event.key === 'Enter' && !!selectedCity.current){

        
        inputRef.current.value = selectedCity.current.innerText;
        setPredictTxt([]);
        setCity(inputRef.current.value)
        setIsClickable(true)
        
      
   
        setTimeout(() => {
       
            selectedCity.current = null;
           
        }, 0);
       

     
    }

  




    if(autoSuggests.current?.children.length > 0){    
        if(!selectedCity.current?.previousSibling && !selectedCity.current?.nextSibling){
    
            selectedCity.current = autoSuggests.current.children[0];
            selectedCity.current.classList.add('select');
    
        }
    }




    }


function mapCities(){

    return (

    
        predictTxt.map((city, i)=> {
            
        if(city !== inputRef.current.value){

            return <City key={i} city={city} setCity={setCity} inputRef={inputRef} keypress={handleKeyPress} clickable={isClickable}   /> 
        
        }
        })

    )

}






    return (

<div className="inputBox" >

<input type="text" ref={inputRef} onChange={()=>{ setCity(inputRef.current.value); setAutoCompleteTimer() }}  onKeyDown={handleKeyPress} />

<div className='autosuggestion' ref={autoSuggests}>
{predictTxt.length > 0 ? mapCities()  : '' }
</div>

</div>


    )
}





export default Input