import { Event } from "./../events/entity"
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm"
import { Exclude } from "class-transformer"
import { MinLength, IsString, IsEmail } from "class-validator"
import * as bcrypt from "bcrypt"
import { Comment } from "../comments/entity"
import { Ticket } from "../tickets/entity"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  lastName: string

  @Column("text")
  phoneNum: string

  @IsEmail()
  @Column("text")
  email: string

  @Column("boolean", { default: false, nullable: true })
  admin: boolean

  @IsString()
  @MinLength(8)
  @Column("text")
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Event, event => event.user)
  events: Event[]

  @OneToMany(_ => Comment, comment => comment.user)
  comments: Comment[]

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ default: 0 })
  ticketsOnSale: number

  @Column({ default: 0 })
  numberOfPostedComments: number

  @OneToOne(_ => User)
  @JoinColumn()
  user: User
}
