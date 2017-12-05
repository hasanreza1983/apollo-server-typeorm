import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { Product } from "./Product"
import { Customer } from "./Customer"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn() id: number

  @Column() price: number

  @Column() quantity: number

  @Column() timestamp: string

  @ManyToOne(type => Product, product => product.transactions)
  product: Product

  @ManyToOne(type => Customer, customer => customer.transactions)
  customer: Customer
}
