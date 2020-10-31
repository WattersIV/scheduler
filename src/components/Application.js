import React, { useState, useEffect } from "react";
import DayList from "./DayList" 
import Appointment from "components/Appointment" 
import axios from 'axios'; 
import "components/Application.scss"; 
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "../helpers/selectors"

export default function Application(props) { 
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });  

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewsForDay(state, state.day)

  function bookInterview(id, interview, cb, SHOW, ERROR) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    axios.put(`/api/appointments/${id}`, appointment) 
      .then(() => {
        setState({...state, appointments}); 
        cb(SHOW)
      }) 
      .catch(() => {
        cb(ERROR, true)
      })
  } 

  function removeInterview(id, cb, EMPTY, ERROR) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    axios.delete(`api/appointments/${id}`)  
      .then (() => {
        setState({ ...state, appointments})
        cb(EMPTY)
      }) 
      .catch(() => {
        cb(ERROR, true)
      })
  }


  const mapAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)  
    console.log( 'LINE 36 APPLICATION','appt.id', appointment.id, 'interview', interview )
    return(
    <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time} 
    interview={interview}
    interviewers={interviewers} 
    bookInterview={bookInterview}
    removeInterview={removeInterview}/>
    )
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      console.log(res[2].data)
      setState(prev =>({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }))
    })
  }, []);  
   
   
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {mapAppointments}
      </section>
    </main>
  );
}

