// import { Exclude } from "class-transformer"
import { User } from "./../users/entity"
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm"
import { IsString, IsUrl } from "class-validator"
import { Comment } from "../comments/entity"
import { Event } from "../events/entity"
// import { Exclude } from "class-transformer"

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsUrl()
  @Column("text", { nullable: true })
  picture: string

  @Column()
  price: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date

  @Column({ default: 0 })
  numOfComments: number

  @Column({ nullable: true })
  risk: number

  @IsString()
  @Column("text", { nullable: false })
  description: string

  @ManyToOne(_ => User, user => user.tickets, { eager: true })
  user: User

  @ManyToOne(_ => Event, event => event.tickets, {
    eager: true,
    onDelete: "CASCADE"
  })
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket)
  comments: Comment[]
}
