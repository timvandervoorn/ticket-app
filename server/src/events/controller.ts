import {
  JsonController,
  // Post,
  // Param,
  Get,
  Post,
  Authorized,
  Body,
  CurrentUser,
  HttpCode,
  Delete,
  Param,
  NotFoundError,
  Patch
  // Body,
  // Authorized
} from "routing-controllers"
import { User } from "../users/entity"
import { Event } from "./entity"

@JsonController()
export default class EventController {
  @Get("/events")
  allEvents() {
    return Event.find()
  }

  @Authorized()
  @HttpCode(201)
  @Post("/events")
  async createEvent(@Body() event: Event, @CurrentUser() user: User) {
    console.log(event.startTime)
    const entity = await Event.create(event)
    if (entity) {
      entity.user = user
    }
    const addedEvent = await entity.save()
    return addedEvent
  }

  @Authorized()
  @Delete("/events/:id([0-9]+)")
  async deleteEvent(@Param("id") id: number) {
    const event = await Event.findOne(id)
    if (!event) throw new NotFoundError(`Event with id ${id} was not found`)
    return Event.delete(event)
  }

  @Authorized()
  @Patch("/events/:id([0-9]+)")
  async updateTicket(@Param("id") id: number, @Body() update: Partial<Event>) {
    console.log("LOGGING UPDATE")
    console.log(update)

    console.log("LOGGING EVENT ID", id)
    const event = await Event.findOne(id)
    console.log("LOGGING FOUND TICKET")
    console.log(event)
    if (!event) throw new NotFoundError(`Event with id ${id} was not found`)

    const updatedEvent = await Event.merge(event, update).save()
    console.log("LOGGING UPDATED TICKET")
    console.log(updatedEvent)

    return updatedEvent
  }
}
