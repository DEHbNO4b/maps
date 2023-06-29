import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import {Circle,Polygon,Popup} from 'react-leaflet'
import { useState, useEffect } from 'react'

function App() {
  let [strikes,setStrikes] = useState([])
  let [clusters,setClusters]=useState([])
  const[selectedDay,setSelectedDay] = useState()
  const [days,setDays] = useState(["qwe","ert"])

  const daysCollection=days.map((item)=>(<option key = {item}>{item}</option>))
  const url = "http://localhost:9090"

  useEffect(()=>{
    fetch(url+`/daycollection`)
    .then((response)=>response.json())
    .then((data)=>setDays(data))
  },[]);

function loadStrikes(data){
    if (data!=null){
      setStrikes(data)
    }
}
  function fetchStrikes(){
    fetch(url+`/strikes?day=`+selectedDay)
    .then((response) => response.json())
    .then( (data) => loadStrikes(data))
  }
  function fetchThunders(){
    fetch(url+`/thunders?day=`+selectedDay)
    .then((response) => response.json())
    .then((data) => setClusters(data))
  }

  const clusterStyle = ['red', 'red', 'blue','yellow','brown','black','magenta','green',
                            'orange','Indigo','SeaGreen','Olive','LightSeaGreen','Teal','Aqua',
                            'Aquamarine','CadetBlue','SkyBlue','DeepSkyBlue','MediumSlateBlue',
                            'MidnightBlue','BurlyWood','Goldenrod','Chocolate','Sienna','Maroon',
                            'MistyRose','Gray','DarkSlateGray',
                        ]
  const lightning=strikes.map((item)=>(
                                <Circle key={item.Longitude+item.Latitude} 
                                pathOptions={{color:clusterStyle[Number(item.Cluster.slice(11))],
                                fillColor:clusterStyle[Number(item.Cluster.slice(11))],}}
                                center={[item.Latitude,item.Longitude]} 
                                radius ={500}></Circle>  
                                      ))
  const thunders = clusters.map((item)=>(<Polygon key={item.Claster}
                                          pathOptions={{color:"DarkSlateGray"}}
                                          //eventHandlers ={{click:()=>{console.log(item.Claster)}}}
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
          <select 
            onChange={e => {
              setSelectedDay(e.target.value)
            }}
          >
            {daysCollection}
          </select>
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
