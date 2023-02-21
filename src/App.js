import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import {Circle} from 'react-leaflet'
import { useState } from 'react'


function App() {
  let t = [{Latitude:50,Longitude:45,Cluster:50},]
  const [data,setData] = useState(t)

  function fetchFunc(){
    fetch("http://localhost:9090/")
    .then((response) => response.json())
    .then((data) => setData(data))
      
  }
  const clusterStyle = ['red', 'red', 'blue','yellow','brown','black','magenta','green',
                          'orange','Indigo','SeaGreen','Olive','LightSeaGreen','Teal','Aqua',
                          'Aquamarine','CadetBlue','SkyBlue','DeepSkyBlue','MediumSlateBlue',
                          'MidnightBlue','BurlyWood','Goldenrod','Chocolate','Sienna','Maroon',
                          'MistyRose','Gray','DarkSlateGray',
]
  const lightning=data.map((item)=>(<Circle key={item.Longitude+item.Latitude} 
                                        pathOptions={{color:clusterStyle[item.Cluster],
                                        fillColor:clusterStyle[item.Cluster],}}
                                        center={[item.Latitude,item.Longitude]} 
                                        radius ={500}></Circle>  ))
  
  return (
    <div className="App">
    <button onClick={fetchFunc}>fetch lightning data</button>
      <MapContainer center={[44.505, 44.09]} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lightning}
      </MapContainer>
    </div>
  );
}

export default App;
