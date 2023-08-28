import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Circle, Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
const clusterStyle = [
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
function App() {
  useEffect(() => {
    fetchThunderList();
  }, []);
  // let [strikes, setStrikes] = useState([]);
  let [cells, setCells] = useState([]);
  const [date, setDate] = useState(new Date("2022-05-20 00:00"));
  let [selectedThunderId, setSelectedThunderId] = useState();
  const [thunder, setThunder] = useState({ cells: [] });

  // const [time, setTime] = useState("14:00");
  let [thunderList, setThunderList] = useState([{}]);
  const url = "http://localhost:9090";

  const thunderVew = thunder.cells.map((item,i) => (
  <Polygon key={item.id}
    pathOptions={{ color: clusterStyle[i] }}
    //eventHandlers ={{click:()=>{console.log(item.Claster)}}}
    positions={item.polygon}>
    <Popup>
       Cluster:{item.name} <br />
      Start time: {item.start_time}<br />
      End time: {item.end_time}
    </Popup>
    {strokes(item.strokes,i)}
  </Polygon>)

  )
  function strokes(data,i){
    
    return(

    data.map((s)=>(
      <Circle key={s.long + s.lat}
      pathOptions={{
        color:clusterStyle[i],
        fillColor: clusterStyle[i],
      }}
      eventHandlers={{ click: () => { console.log(s) } }}
      center={[s.lat, s.long]}
      radius={1000}></Circle>

    )))

  }

  function loadThunderList(data) {
    if (data != null) {
      setThunderList(data);
    }
  }
  function loadThunder(data) {
    if (data != null) {
      // setThunder(null);
      setThunder(data);
    }
  }
  function showData(date) {
    console.log("in showDate:");
    console.log(date);
  }

  function fetchThunderList() {
    fetch(url + `/`)
      .then((response) => response.json())
      .then((data) => loadThunderList(data));
  }
  function fetchThunder() {
    if (selectedThunderId === undefined) {
     alert("select thunder");
      return;
    }
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



  const showCells = cells.map((item) => (
    <Polygon
      key={item.id}
      pathOptions={{ color: "DarkSlateGray" }}
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
      <Form>
        <Row>
          <Col>
            <FormControl
              type="date"
              defaultValue={"2022-05-19"}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></FormControl>
          </Col>
          <Col>
            <FormControl type="time" defaultValue={"12:00"}></FormControl>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              className="me-4 btn btn-success btn-lg btn-block"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
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
      <MapContainer center={[45.505, 40.0]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {lightning}*/}
        {thunderVew} 
      </MapContainer>
    </div>
  );
}

export default App;

// import React from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
// import { Circle, Polygon, Popup } from 'react-leaflet'
// import { useState, useEffect } from 'react'

// function App() {
//   let [strikes, setStrikes] = useState([])
//   let [clusters, setClusters] = useState([])
//   const [selectedDay, setSelectedDay] = useState("2022.05.20_12:00_MSC")
//   const [days, setDays] = useState(["2022.05.20_12:00_MSC"])

//   const daysCollection = days.map((item) => (<option key={item}>{item}</option>))
//   const url = "http://localhost:9090"

//   useEffect(() => {
//     fetch(url + `/daycollection`)
//       .then((response) => response.json())
//       .then((data) => setDays(data))
//   }, []);

//   function loadStrikes(data) {
//     if (data != null) {
//       setStrikes(data)
//     }
//   }
//   function fetchStrikes() {
//     fetch(url + `/strikes?day=` + selectedDay)
//       .then((response) => response.json())
//       .then((data) => loadStrikes(data))
//   }
//   function fetchThunders() {
//     fetch(url + `/thunders?day=` + selectedDay)
//       .then((response) => response.json())
//       .then((data) => setClusters(data))
//   }

//   const clusterStyle = ['red', 'red', 'blue', 'yellow', 'brown', 'black', 'magenta', 'green',
//     'orange', 'Indigo', 'SeaGreen', 'Olive', 'LightSeaGreen', 'Teal', 'Aqua',
//     'Aquamarine', 'CadetBlue', 'SkyBlue', 'DeepSkyBlue', 'MediumSlateBlue',
//     'MidnightBlue', 'BurlyWood', 'Goldenrod', 'Chocolate', 'Sienna', 'Maroon',
//     'MistyRose', 'Gray', 'DarkSlateGray',
//   ]
//   const lightning = strikes.map((item) => (
//     <Circle key={item.Longitude + item.Latitude}
//       pathOptions={{
//         color: clusterStyle[Number(item.Cluster)],

//         fillColor: clusterStyle[Number(item.Cluster)],
//       }}
//       eventHandlers={{ click: () => { console.log(item) } }}
//       center={[item.Latitude, item.Longitude]}
//       radius={1000}></Circle>
//   ))
//   const thunders = clusters.map((item) => (<Polygon key={item.Claster}
//     pathOptions={{ color: "DarkSlateGray" }}
//     //eventHandlers ={{click:()=>{console.log(item.Claster)}}}
//     positions={item.Polygon}>
//     <Popup>
//       Cluster:{item.Claster} <br />
//       Area:{item.area}<br />
//       Capacity: {item.capacity}<br />
//       Start time: {item.starttime}<br />
//       End time: {item.endtime}
//     </Popup>
//   </Polygon>))

//   return (
//     <div className="App">
//       <button onClick={fetchStrikes}>fetch strikes</button>
//       <button onClick={fetchThunders}>fetch thunders</button>
//       <select
//         onChange={e => {
//           setSelectedDay(e.target.value)
//         }}
//       >

//         {daysCollection}
//       </select>
//       <label>
//         data:
//         <input onChange={e => {
//           setSelectedDay(e.target.value)
//         }}
//           type="text" name="name" />
//       </label>
//       <MapContainer center={[50.505, 40.00]} zoom={5} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {lightning}
//         {thunders}
//       </MapContainer>
//     </div>
//   );
// }

// export default App;
