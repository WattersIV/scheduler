import React from 'react'
import "./styles.scss";  
import Header from "./Header"
import Show from "./Show" 
import Empty from "./Empty" 
import useVisualMode from "hooks/useVisualMode" 
import Form from "./Form" 
import Status from "./Status" 
import Confirm from "./Confirm"

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING" 
const CONFIRM = "CONFIRM" 
const EDIT = "EDIT"

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY) 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }; 
    transition(SAVING) 
    props.bookInterview(props.id, interview, transition, SHOW)
  } 

  function deleteItem () { 
    transition(DELETING) 
    props.removeInterview(props.id, transition, EMPTY)
  }

  return (
    <article className="appointment">
      <Header time={props.time} /> 
      
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview &&(
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer} 
    onDelete={() => transition(CONFIRM)} 
    onEdit={() => transition(EDIT)}
    />)}    
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
      onCancel={back}  
      onSave={save} 
      />
    )}
    {mode === SAVING && (
      <Status message="Saving" />
    )}
    {mode === DELETING && (
      <Status message="Deleting" />
    )}
     {mode === CONFIRM && (
      <Confirm 
      onCancel={() => back()}
      onConfirm={deleteItem} />
    )} 
     {mode === EDIT && (
         <Form 
         name={props.interview.student}
         interviewer={props.interview.interviewer.id}
         interviewers={props.interviewers}
         onCancel={back}  
         onSave={save}  
         />
    )}
    </article>

  )
}
