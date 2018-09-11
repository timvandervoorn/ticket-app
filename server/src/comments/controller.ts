import {
  JsonController,
  // Post,
  // Param,
  Get,
  Post,
  Authorized,
  Body,
  CurrentUser,
  Param,
  NotFoundError,
  HttpCode,
  Delete
  // Body,
  // Authorized
} from "routing-controllers"
import { User } from "../users/entity"
import { Ticket } from "../tickets/entity"
import { Comment } from "./entity"
import { Customer } from "../users/entity"

@JsonController()
export default class CommentController {
  // @Authorized()
  @Get("/events/:id([0-9]+)/tickets/:ticketId([0-9]+)/comments")
  async allCommentsForTicket(@Param("ticketId") ticketId: number) {
    const comments = await Comment.query(
      `SELECT * FROM comments WHERE ticket_id=${ticketId}`
    )
    return comments
  }

  @Authorized()
  @HttpCode(201)
  @Post("/events/:id([0-9]+)/tickets/:ticketId([0-9]+)/comments")
  async createComment(
    @Body() comment: Comment,
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Param("ticketId") ticketId: number
  ) {
    const entity = await Comment.create(comment)
    if (entity) {
      entity.user = user
    }

    const ticket = await Ticket.findOne(ticketId)
    if (!ticket) throw new NotFoundError(`Event with id ${id} was not found`)

    ticket.numOfComments++

    await ticket.save()

    entity.ticket = ticket

    const addedComment = await entity.save()

    const customer = await Customer.findOne({ user })

    if (!customer)
      throw new NotFoundError(`Customer with id ${id} was not found`)

    customer.numberOfPostedComments++

    console.log(addedComment)

    await customer.save()

    const comments = await Comment.query(
      `SELECT * FROM comments WHERE ticket_id=${ticketId}`
    )
    return comments
  }

  @Authorized()
  @Delete("/tickets/:id([0-9]+)/comments/:commentId([0-9]+)")
  async deleteComment(
    @Param("commentId") commentId: number,
    @Param("id") id: number,
    @CurrentUser() user: User
  ) {
    const comment = await Comment.findOne(commentId)
    if (!comment)
      throw new NotFoundError(`Comment with id ${commentId} was not found`)

    const customer = await Customer.findOne({ user })
    if (!customer) throw new NotFoundError(`Customer was not found`)

    const ticket = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError(`Customer was not found`)

    ticket.numOfComments--

    if (ticket.numOfComments <= 0) {
      ticket.numOfComments = 0
    }

    await ticket.save()

    customer.numberOfPostedComments--

    if (customer.numberOfPostedComments <= 0) {
      customer.numberOfPostedComments = 0
    }

    await customer.save()

    return Comment.delete(commentId)
  }

  // FIX REDUCER
}
