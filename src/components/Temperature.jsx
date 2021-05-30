

const Temperature = ({  temp, condition, region, name, country  }) => {
    return (
        <div >

            <div style={{fontSize:'13px' , color: 'white'}}> { name !== undefined ? `${name}, ${country}` : ''} </div>

            <div className="degrees" > {name !== undefined ? temp +'°C' : '' }</div>
           
            <div style={{fontSize:'17px', color: 'white'}}>{condition}</div>
            
        </div>
        
    )
}


export default Temperature


//${region},