import { IsString } from "class-validator"
import { User } from "./../users/entity"
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column
} from "typeorm"
import { Ticket } from "../tickets/entity"

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column("text", { nullable: false })
  @Column("text")
  comment: string

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date

  @ManyToOne(_ => User, user => user.comments, { eager: true })
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comments, { eager: true, onDelete: 'CASCADE' })
  ticket: Ticket
}
