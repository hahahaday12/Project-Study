import { useState, React, useEffect }from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import {API_URL} from '../../Common/Common'
import axios from 'axios';
import "./index.css";


const FCalendar = () => {

  const [ViewData, setViewData] = useState({
     id:""
    ,title:""
    ,content:""
    ,date: new Date()
    ,color:""
  });

  const search = (params) => { 
    let date = null;
    if(params){
      date = params;
    }else{
      date = new Date();
    };
    axios.get(API_URL+ '/diary?year='+String(date.getFullYear())+'&month='+String(date.getMonth()+1))
    .then((response) => {
      setViewData(response.data.data);
    });
  };

  useEffect(() => {
    search();
    console.log(ViewData)
  },[]);

  const EventDetail = (event, el) => {
    console.log(event);
    console.log(el);
  };

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
          eventLimit="false"
          eventSources = {{googleCalendarId:'ko.south_korea#holiday@group.v.calendar.google.com', className:'ko_event'}}
          events={ViewData}
          eventDidMount={EventDetail}
          />
        </div>
        </div>
      </div>
    );
};
export default FCalendar;