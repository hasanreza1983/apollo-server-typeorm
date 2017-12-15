import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaction } from "./Transaction"

@Entity()
export class Product {
  @PrimaryGeneratedColumn() id: number

  @OneToMany(type => Transaction, transaction => transaction.product)
  transactions: Promise<Transaction[]>
}
