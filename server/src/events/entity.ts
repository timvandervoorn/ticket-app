import { Ticket } from "./../tickets/entity"
import { Exclude } from "class-transformer"
import { User } from "./../users/entity"
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm"
import { IsString, IsUrl } from "class-validator"

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column("text", { nullable: false })
  name: string

  @IsString()
  @Column("text", { nullable: false })
  description: string

  @IsUrl()
  @Column("text", { nullable: false })
  picture: string

  @Column("date", { nullable: false })
  startTime: Date

  @Column("date", { nullable: false })
  endTime: Date

  @Exclude({ toPlainOnly: true })
  @ManyToOne(_ => User, user => user.events)
  user: User

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}
