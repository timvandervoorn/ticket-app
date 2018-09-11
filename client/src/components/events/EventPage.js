import React from "react"
import EventForm from "./EventForm"

export default function EventPage(props) {
  if (!props.user) return ""

  return (
    <div>{props.user.admin && <EventForm onSubmit={props.handleSubmit} />}</div>
  )
}
