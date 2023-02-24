import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import {Circle,Polygon,Popup} from 'react-leaflet'
import { useState } from 'react'

const p1 =[
  [51.15, 40.09],
  [51.52, 40.5],
  [51.52, 41.12],
]
const p2 = [
  [41.15, 40.09],
  [41.52, 40.5],
  [41.52, 41.12],
]

function App() {
  let t = [{Latitude:0,Longitude:0,Cluster:0},]
  let p=[{Id:0,Claster:0,Polygon:[]}]
  let [strikes,setStrikes] = useState(t)
  let [clusters,setClusters]=useState(p)

  function fetchStrikes(){
    fetch("http://localhost:9090/strikes")
    .then((response) => response.json())
    .then((data) => setStrikes(data))
  }
  function fetchThunders(){
    fetch("http://localhost:9090/thunders")
    .then((response) => response.json())
    .then((data) => setClusters(data))
    console.log(clusters)
    console.log(p1)
  }
  const clusterStyle = ['red', 'red', 'blue','yellow','brown','black','magenta','green',
                          'orange','Indigo','SeaGreen','Olive','LightSeaGreen','Teal','Aqua',
                          'Aquamarine','CadetBlue','SkyBlue','DeepSkyBlue','MediumSlateBlue',
                          'MidnightBlue','BurlyWood','Goldenrod','Chocolate','Sienna','Maroon',
                          'MistyRose','Gray','DarkSlateGray',
]
  const lightning=strikes.map((item)=>(<Circle key={item.Longitude+item.Latitude} 
                                        pathOptions={{color:clusterStyle[item.Cluster],
                                        fillColor:clusterStyle[item.Cluster],}}
                                        center={[item.Latitude,item.Longitude]} 
                                        radius ={500}></Circle>  ))

    const thunders = clusters.map((item)=>(<Polygon key={item.Claster}
                          pathOptions={{color:"DarkSlateGray"}}
                          eventHandlers ={{click:()=>{console.log(item.Claster)}}}
                          positions = {item.Polygon}>
                                    <Popup>
                                          Cluster:{item.Claster} <br /> 
                                          Area:{item.area}<br />
                                          Capacity: {item.capacity}<br/>
                                          Start time: {item.starttime}<br/>
                                          End time: {item.endtime}
                                  </Popup>
                                            </Polygon>))

  return (
    <div className="App">
    <button onClick={fetchStrikes}>fetch strikes</button>
    <button onClick={fetchThunders}>fetch thunders</button>
      <MapContainer center={[50.505, 40.00]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lightning}
        {thunders}
      </MapContainer>
    </div>
  );
}

export default App;
