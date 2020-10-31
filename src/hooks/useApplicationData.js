import { useState, useEffect } from "react";
import axios from 'axios';

 export default function useApplicationData () {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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
      console.log(res[2].data)
      setState(prev =>({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }))
    })
  }, []);
  return {
    state, 
    setDay, 
    bookInterview, 
    removeInterview
  }  
}  