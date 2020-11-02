import React, { useState } from 'react'
import InterviewerList from "../InterviewerList" 
import Button from "../Button"

export default function Form (props) {
  const [interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || ""); 
  const [error, setError]=  useState("")

  const nameValidation = () => {
    name === "" ? setError("Student name cannot be blank") : props.onSave(name, interviewer)
  }

  function reset() {
    setName("")
    setInterviewer(null)
  }; 

  function cancel() {
    reset() 
    props.onCancel()
  }

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        type="text"
        onChange={event => setName(event.target.value)}
        placeholder="Enter Student Name"
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section> 
  <section className="appointment__validation">{error}</section>
    <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={nameValidation} confirm>Save</Button>
    </section>
  </section>
</main>
  )
}