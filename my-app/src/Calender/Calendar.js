import React, { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});

    //What day of week on 1st of current month..Sunday -0, Monday - 1
    const firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() ,1).getDay();//index of week

    //0 bring previous month last day, that brings total days
    const days = new Date(currentDate.getFullYear(),currentDate.getMonth()+1 ,0).getDate();//28th

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentMonthName = months[currentDate.getMonth()];

    function handlePrevMonth () {
        setCurrentDate(prev=> new Date(prev.getFullYear(),currentDate.getMonth() - 1 ))
    }
      

    function handleNextMonth () {
        setCurrentDate(prev=> new Date(prev.getFullYear(),currentDate.getMonth() + 1 ))
    }

   
    const deleteEvent = (day, eventIndex) => {
        const dateKey = formatDateKey(day);

        setEvents((prevEvents) => {
          const newEvents = { ...prevEvents };
          newEvents[dateKey] = newEvents[dateKey].filter((_, idx) => idx !== eventIndex);

          if (newEvents[dateKey].length === 0) delete newEvents[dateKey];
          return newEvents;
        });
    }

    const getDeleteButtonStyle = () => ({
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "50%",
        padding: "0 5px",
        cursor: "pointer",
      });

    const getEventStyle = () => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      });

    const handleDeleteEvent = (e, day, idx) => {
        e.stopPropagation();
        deleteEvent(day, idx);
    }

    function renderEventList(day, dateKey) {
        return (
            <div style={{ fontSize: "0.8em", marginTop: "5px" }}>
              {events[dateKey].map((event, idx) => (
                <div key={idx} style={getEventStyle()}>
                  <span>{event}</span>
                  <button onClick={(e) => handleDeleteEvent(e, day, idx)} style={getDeleteButtonStyle()}>✖</button>
                </div>
              ))}
            </div>
          );
    }

    const getDayCellStyle = (day, dateKey) => ({
        padding: "10px",
        border: "1px solid black",
        cursor: day ? "pointer" : "default",
        background: events[dateKey] ? "lightblue" : "white",
    });


    function formatDateKey(day){
        return `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    }

    function addEvent(day) {
        
        const event = prompt("Enter event for " + day);
        if (!event) return;
        console.log(event);
    
        setEvents((prevEvents) => {
            const dateKey = formatDateKey(day);
            return {
            ...prevEvents,
            [dateKey]: prevEvents[dateKey] ? [...prevEvents[dateKey], event] : [event],
            };
        });
          
    }



    const renderDayCell = (day, index) => {
    
        const dateKey = formatDateKey(day);
   
        return (
            <div key={index} onClick={() => day && addEvent(day)} style={getDayCellStyle(day, dateKey)}>
                {day}
                {events[dateKey] && renderEventList(day, dateKey)}
            </div>
        ) ;
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const renderDays = () => {
        return [
          ...daysOfWeek,
          ...Array(firstDayOfMonth).fill(null),
          ...Array(days).fill().map((_, i) => i + 1),
        ].map((day, index) => renderDayCell(day, index));
      };
      
    return (
        <div>

            <h2>{currentMonthName} - {currentDate.getFullYear()}</h2>

            <button onClick={handlePrevMonth}>Previous</button>
            <button onClick={handleNextMonth}>Next</button>

             <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)"}}>
                 {renderDays()}
             </div>
            
        </div>
    )
};

export default Calendar;
