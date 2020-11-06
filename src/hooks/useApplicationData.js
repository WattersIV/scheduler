import { useState, useEffect } from "react";
import axios from 'axios';

 export default function useApplicationData () {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}, 
  });  
  
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
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev =>({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }))
    })
  }, []);
  
  useEffect(() => {
    if (state.days) updateSpots() 
  }, [state.appointments])

  function updateSpots() {
    const index = state.days.findIndex(day => day.name === state.day) //get index of current day in the days array
    if (state.days[index]) {
      const dayAppointments = state.days[index].appointments 
      const spots = dayAppointments.filter(appt => !state.appointments[appt].interview).length; //get number of spots that arent null 
     //copy days obj of the current day and update spots
      const day = {
        ...state.days[index],
        spots
      } 
      //cpy the whole days array then replace current day with the updated one above
      const days = [...state.days] 
      days.splice(index, 1, day) 

      setState(prev => ({...prev, days}))
    } 
  }

  return {
    state, 
    setDay, 
    bookInterview, 
    removeInterview, 
  }  
}  