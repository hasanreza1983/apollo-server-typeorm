import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaction } from "./Transaction"


@Entity()
export class Customer {
  @PrimaryGeneratedColumn() id: number

  @OneToMany(type => Transaction, transaction => transaction.customer)
  transactions: Transaction[]
}
