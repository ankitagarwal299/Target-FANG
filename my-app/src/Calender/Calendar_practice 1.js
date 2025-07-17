import React, { useState } from "react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const Calendar = () => {
  const [currentDate, setCurrentDate]= useState(new Date());

  const [events, setEvents]= useState({});

  //Day of the week , first day of month started
  let firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(), 1).getDay();//index

  let totalDaysInMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() + 1, 0).getDate();//last date in a month



  function getEventStyle(day, dateKey) {
    return {
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"2px",
      // height: "70px", // set a fixed height for the event container
      overflowY: "auto", // enable vertical scrolling
    }
  }

  function handleDeleteEvent(e,day, idx) {
    e.stopPropagation();

    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;

    //process new event
    let newEventsObject = {
      ...events,
      [dateKey]:events[dateKey].filter((evt, evtIndex)=> evtIndex !=idx)
    }
   

    console.log(newEventsObject)

    setEvents(newEventsObject)
  }

  function renderEventList(day, dateKey){
    return (
      <div>
        {events[dateKey].map((evt, idx)=>(
          <div key={idx} style={getEventStyle(day, dateKey)} >
            {evt}
            <button onClick={(e)=> handleDeleteEvent(e,day, idx)}>x</button>
          </div>
        ))}
      </div>
    )

  }

  function getCellStyle(day, dateKey) {
    return {
      padding: "10px",
      height:"100px",
      border: "1px solid black",
      cursor: day ? "pointer" : "default",
      background: events[dateKey] ? "lightblue" : "white"
    }
  }

  function addEvent(day) {
    
    const event = prompt("Enter event for " + day);
    
    if(!event)return;

    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    
    //process new event
    let newEventsObject = {
      ...events, 
      [dateKey]:events[dateKey]? [...events[dateKey], event]: [event]
    }
    console.log(newEventsObject)

    setEvents(newEventsObject)
  }

  function renderCell(day, index) {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;

    return (
      <div key={index} style={getCellStyle(day, dateKey)} onClick={()=> day && addEvent(day)}>
          {day}
          {events[dateKey] && renderEventList(day, dateKey)}
      </div>
    )
  }

  

  function renderGrid() {
    return [
      ...daysOfWeek,//header
      ...Array(firstDayOfMonth).fill(null),//empty cells
      ...Array(totalDaysInMonth).fill().map((_,i)=> i+1),//total cells
    ].map((day,index)=> renderCell(day, index))
  }


  function handlePrevMonth() {
    let curDate = new Date(currentDate.getFullYear(),currentDate.getMonth() - 1);//last date in a month
    setCurrentDate(curDate)
  }

   function handleNextMonth() {
    let curDate = new Date(currentDate.getFullYear(),currentDate.getMonth() + 1);//last date in a month
    setCurrentDate(curDate)
  }   

    return (
     <div>
      <h3>  {currentDate.getFullYear()}-{months[currentDate.getMonth()]}-{currentDate.getDate()},{daysOfWeek[currentDate.getDay()]}</h3>
        <button onClick={handlePrevMonth}>Previous</button>
        <button onClick={handleNextMonth}>Next</button>

        <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", margin:"auto 100px"}}>
          {renderGrid()}
        </div>
     </div>
    )
}

export default Calendar;