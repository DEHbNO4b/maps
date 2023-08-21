import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Circle, Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    fetchThunderList();
  }, []);
  // let [strikes, setStrikes] = useState([]);
  // let [clusters, setClusters] = useState([]);
  // const [date, setDate] = useState();
  let [selectedThunderId, setSelectedThunderId] = useState();
  const [thunder, setThunder] = useState({ cells: [] });

  // const [time, setTime] = useState("14:00");
  let [thunderList, setThunderList] = useState([{}]);
  const url = "http://localhost:9090";
  // const refTime = React.createRef();
  // const refInput = React.createRef();

  function loadThunderList(data) {
    if (data != null) {
      setThunderList(data);
    }
  }
  function loadThunder(data) {
    if (data != null) {
      setThunder(null);
      setThunder(data);
    }
  }

  function fetchThunderList() {
    fetch(url + `/`)
      .then((response) => response.json())
      .then((data) => loadThunderList(data));
  }
  function fetchThunder() {
    fetch(url + `/thunder/` + selectedThunderId)
      .then((response) => response.json())
      .then((data) => loadThunder(data));
  }

  const thunderCollection = thunderList.map((t) => (
    <option key={t.id}>{t.id}</option>
  ));
  let thunderCells = thunder.cells.map((c) => (
    <option key={c.id}>{c.id}</option>
  ));

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
  // const lightning = strikes.map((item) => (
  //   <Circle
  //     key={item.Id}
  //     pathOptions={{
  //       color: clusterStyle[Number(item.Cluster)],

  //       fillColor: clusterStyle[Number(item.Cluster)],
  //     }}
  //     eventHandlers={{
  //       click: () => {
  //         console.log(item);
  //       },
  //     }}
  //     center={[item.Latitude, item.Longitude]}
  //     radius={1000}
  //   ></Circle>
  // ));
  // const thunders = clusters.map((item) => (
  //   <Polygon
  //     key={item.Claster}
  //     pathOptions={{ color: "DarkSlateGray" }}
  //     positions={item.Polygon}
  //   >
  //     <Popup>
  //       Cluster:{item.Claster} <br />
  //       Area:{item.area}
  //       <br />
  //       Capacity: {item.capacity}
  //       <br />
  //       Start time: {item.starttime}
  //       <br />
  //       End time: {item.endtime}
  //     </Popup>
  //   </Polygon>
  // ));

  return (
    <div className="App">
      {/* <button onClick={fetchStrikes}>fetch strikes</button>
       <button onClick={fetchThunders}>fetch thunders</button>  */}
      <button onClick={fetchThunder}>fetch thunder</button>
      <select
        onChange={(e) => {
          setSelectedThunderId(e.target.value);
        }}
      >
        {thunderCollection}
      </select>
      <select
        onChange={(e) => {
          //setSelectedThunderId(e.target.value);
        }}
      >
        {thunderCells}
      </select>

      {/*  <input
        type="text"
        name="label"
        defaultValue="sdfgs"
        ref={refInput}
      ></input>
      <label>
        data:
        <input type="datetime" name="date" defaultValue="2022-05-20" />
      </label>
      <label>
        time:
         <input
          type="time"
          name="time"
          ref={refTime}
          defaultValue="12:00"
          step="10"
        /> 
      </label> 
       <button onClick={plus10min}>+10min</button> */}
      <MapContainer center={[45.505, 40.0]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {lightning}
        {thunders} */}
      </MapContainer>
    </div>
  );
}

export default App;
