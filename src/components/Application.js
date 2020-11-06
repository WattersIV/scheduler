import React from "react";
import DayList from "./DayList" 
import Appointment from "components/Appointment" 
import "components/Application.scss"; 
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "../helpers/selectors"
import useApplicationData from "hooks/useApplicationData"; 

export default function Application(props) {
  const {state, setDay, bookInterview, removeInterview} = useApplicationData()
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewsForDay(state, state.day) 
  
  const mapAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)  
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
        <section className="schedule"> 
          {mapAppointments} 
          <Appointment key="last" time="5pm" /> 
          </section>
      </section>
    </main>
  );
}

