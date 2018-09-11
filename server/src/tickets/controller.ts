import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post
} from "routing-controllers"
import { Event } from "../events/entity"
import { calculateRisk } from "../lib/riskCalculator"
import { averageTicketPrice } from "../lib/tickets"
import { Customer, User } from "../users/entity"
import { Ticket } from "./entity"

@JsonController()
export default class TicketController {
  @Get("/events/:id([0-9]+)/tickets")
  async getTicketsForEvent(@Param("id") id: number) {
    const tickets = await Ticket.query(
      `SELECT * FROM tickets WHERE event_id=${id}`
    )
    const customers = await Customer.find()

    const avgTicketPrice = averageTicketPrice(tickets)

    let authorTickets

    await tickets.map(ticket => {
      customers.map(customer => {
        if (customer.id === ticket.user_id) {
          authorTickets = customer.ticketsOnSale
        }
      })

      ticket.risk = calculateRisk(
        ticket.price,
        authorTickets,
        avgTicketPrice,
        ticket.created_at,
        ticket.num_of_comments
      )
    })

    return tickets
  }

  @Get("/events/:id([0-9]+)/tickets/:ticketId([0-9]+)")
  async getSingleTicket(
    @Param("ticketId") ticketId: number,
    @Param("id") id: number
  ) {
    const ticket = await Ticket.findOne(ticketId)

    if (!ticket)
      throw new NotFoundError(`Ticket with id ${ticketId} was not found`)

    const tickets = await Ticket.query(
      `SELECT * FROM tickets WHERE event_id=${id}`
    )
    const customers = await Customer.find()

    const avgTicketPrice = averageTicketPrice(tickets)

    let authorTickets
    await tickets.map(ticket => {
      customers.map(customer => {
        if (customer.id === ticket.user_id) {
          authorTickets = customer.ticketsOnSale
        }
      })
    })

    ticket["risk"] = calculateRisk(
      ticket.price,
      authorTickets,
      avgTicketPrice,
      ticket.createdAt,
      ticket.numOfComments
    )
    return ticket
  }

  @Authorized()
  @Patch("/events/:id([0-9]+)/tickets/:ticketId([0-9]+)")
  async updateTicket(
    @Param("ticketId") ticketId: number,
    @Body() update: Partial<Ticket>
  ) {
    console.log("LOGGING UPDATE")
    console.log(update)

    console.log("LOGGING TICKET ID", ticketId)
    const ticket = await Ticket.findOne(ticketId)
    console.log("LOGGING FOUND TICKET")
    console.log(ticket)
    if (!ticket)
      throw new NotFoundError(`Ticket with id ${ticketId} was not found`)

    const updatedTicket = await Ticket.merge(ticket, update).save()
    console.log("LOGGING UPDATED TICKET")
    console.log(updatedTicket)

    return updatedTicket
  }

  @Authorized()
  @HttpCode(201)
  @Post("/events/:id([0-9]+)/tickets")
  async createTicket(
    @Body() ticket: Ticket,
    @Param("id") id: number,
    @CurrentUser() user: User
  ) {
    const event = await Event.findOne(id)
    if (!event) throw new NotFoundError(`Event with id ${id} was not found`)

    const entity = await Ticket.create(ticket)
    if (entity) {
      entity.user = user
      entity.event = event
    }

    await entity.save()

    const customer = await Customer.findOne({ user })

    if (!customer)
      throw new NotFoundError(`Customer with id ${id} was not found`)

    customer.ticketsOnSale++

    await customer.save()

    const tickets = await Ticket.query(
      `SELECT * FROM tickets WHERE event_id=${id}`
    )

    console.log(tickets)

    return tickets
  }

  @Authorized()
  @Delete("/events/:id([0-9]+)/tickets/:ticketId([0-9]+)")
  async deleteTicket(
    @Param("ticketId") ticketId: number,
    @CurrentUser() user: User
  ) {
    console.log(ticketId)
    const ticket = await Ticket.findOne(ticketId)
    console.log(ticket)
    if (!ticket)
      throw new NotFoundError(`Ticket with id ${ticketId} was not found`)

    const customer = await Customer.findOne({ user })
    if (!customer) throw new NotFoundError(`Customer was not found`)

    customer.ticketsOnSale--

    if (customer.ticketsOnSale <= 0) {
      customer.ticketsOnSale === 0
    }

    await customer.save()

    return Ticket.delete(ticketId)
  }
}
