import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized
} from "routing-controllers"
import { User, Customer } from "./entity"
// import Event from "../events/entity"

@JsonController()
export default class UserController {
  @Post("/users")
  async signup(@Body() data: User) {
    const { password, ...rest } = data
    const entity = User.create(rest)
    await entity.setPassword(password)
    const user = await entity.save()
    await Customer.create({ user }).save()
    return user
  }

  @Authorized()
  @Get("/users/:id([0-9]+)")
  getUser(@Param("id") id: number) {
    return User.findOne(id)
  }

  @Authorized()
  @Get("/users/customer/:userId([0-9]+)")
  async getSingleCustomer(@Param("userId") userId: number) {
    const customer = await Customer.findOne(userId)
    return customer
  }

  @Authorized()
  @Get("/customers")
  async getCustomers() {
    return await Customer.find()
  }

  @Get("/users")
  allUsers() {
    return User.find()
  }
}
