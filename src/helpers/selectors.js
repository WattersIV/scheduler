export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((currentDay) => { 
    return currentDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentsMapped = filteredDays[0].appointments.map((app) => {
    return state.appointments[app]
  })
  return appointmentsMapped;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewCopy = {
    ...interview, 
    interviewer: {...state.interviewers[interview.interviewer]}} 
    return interviewCopy
  }
  return null;  
}

export function getInterviewsForDay (state, day) {
  const filteredDays = state.days.filter((currentDay) => { 
    return currentDay.name === day
  }) 
  
  if (filteredDays.length === 0) {
    return [] 
  } 
  const interviewersMapped = filteredDays[0].interviewers.map((interviewer) => {
    return state.interviewers[interviewer]
  })
  return interviewersMapped
}