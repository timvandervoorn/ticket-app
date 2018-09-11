import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import LoginPage from "./components/login/LoginPage"
import SignupPage from "./components/signup/SignupPage"
import LogoutPage from "./components/logout/LogoutPage"
import HomePage from "./components/homepage/HomePage"
import "./App.css"
import TopNav from "./components/layout/TopNav"
import EventPageContainer from "./components/events/EventPageContainer"
import EventDetailsContainer from "./components/events/EventDetailsContainer"
import TicketForm from "./components/tickets/TicketForm"
import TicketDetailsContainer from "./components/tickets/TicketDetailsContainer"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopNav />
          </nav>

          <main style={{ marginTop: 75 }}>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventPageContainer} />
            <Route exact path="/events/:id" component={EventDetailsContainer} />
            <Route
              exact
              path="/events/:id/tickets/:ticketId"
              component={TicketDetailsContainer}
            />
            <Route exact path="/add-ticket" component={TicketForm} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
