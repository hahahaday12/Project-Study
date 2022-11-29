import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import "./index.css";


// export default function App() {

const Full = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  //console.log(apiKey)
    return (
      <div className="CalendarBox">
        <div className='container'>

        <div className='App'>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          googleCalendarApiKey={apiKey}
          initialView="dayGridMonth"
          events=
            {{googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'}}
          />
        </div>
        </div>
      </div>
            );
    };
  
  export default Full;