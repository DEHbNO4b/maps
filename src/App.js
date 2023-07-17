import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Circle, Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

function App() {
  let [strikes, setStrikes] = useState([]);
  let [clusters, setClusters] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState("14:00");
  const url = "http://localhost:9090";
  const refTime=React.createRef();
  const refInput=React.createRef();

  function loadStrikes(data) {
    if (data != null) {
      setStrikes(data);
    }
  }
  function fetchStrikes() {
    fetch(url + `/strikes?day=` + date + " " + time + "_MSC")
      .then((response) => response.json())
      .then((data) => loadStrikes(data));
  }

  function plus10min() {
    refInput.current.value=refTime.current.value.toString();
    const t =Date()
     t=refTime.current.value
    t.setTime(14)
    refTime.current.value=t
  }

  const clusterStyle = [
    "red",
    "red",
    "blue",
    "yellow",
    "brown",
    "black",
    "magenta",
    "green",
    "orange",
    "Indigo",
    "SeaGreen",
    "Olive",
    "LightSeaGreen",
    "Teal",
    "Aqua",
    "Aquamarine",
    "CadetBlue",
    "SkyBlue",
    "DeepSkyBlue",
    "MediumSlateBlue",
    "MidnightBlue",
    "BurlyWood",
    "Goldenrod",
    "Chocolate",
    "Sienna",
    "Maroon",
    "MistyRose",
    "Gray",
    "DarkSlateGray",
  ];
  const lightning = strikes.map((item) => (
    <Circle
      key={item.Id}
      pathOptions={{
        color: clusterStyle[Number(item.Cluster)],

        fillColor: clusterStyle[Number(item.Cluster)],
      }}
      eventHandlers={{
        click: () => {
          console.log(item);
        },
      }}
      center={[item.Latitude, item.Longitude]}
      radius={1000}
    ></Circle>
  ));
  const thunders = clusters.map((item) => (
    <Polygon
      key={item.Claster}
      pathOptions={{ color: "DarkSlateGray" }}
      //eventHandlers ={{click:()=>{console.log(item.Claster)}}}
      positions={item.Polygon}
    >
      <Popup>
        Cluster:{item.Claster} <br />
        Area:{item.area}
        <br />
        Capacity: {item.capacity}
        <br />
        Start time: {item.starttime}
        <br />
        End time: {item.endtime}
      </Popup>
    </Polygon>
  ));

  return (
    <div className="App">
      <button onClick={fetchStrikes}>fetch strikes</button>
      {/* <button onClick={fetchThunders}>fetch thunders</button> */}
      {/* <select
        onChange={e => {
          setSelectedDay(e.target.value)
        }}
      >

        {daysCollection}
      </select> */}
      <input type="text" name="label" defaultValue="sdfgs" ref={refInput}></input>
      <label>
        data:
        <input type="datetime" name="date" defaultValue="2022-05-20"  />
      </label>
      <label>
        time:
        <input type="time" name="time" ref={refTime} defaultValue="12:00" step="10" />
      </label>
      <button onClick={plus10min}>+10min</button>
      <MapContainer center={[50.505, 40.0]} zoom={5} scrollWheelZoom={true}>
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
