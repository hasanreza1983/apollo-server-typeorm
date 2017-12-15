import { getRepository, getCustomRepository } from "typeorm"
import { find, filter } from "lodash"
import { User } from "../entity/User"
import { Transaction } from "../entity/Transaction"
import { Product } from "../entity/Product"
import { Customer } from "../entity/Customer"

export default {
  Query: {
    users: (obj, args, { manager }) => manager.find(User),
    transactions: (obj, args, { manager }, info) => {
      const opts: any = {
      }
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Transaction, opts)
    },
    products: (obj, args, { manager }) => {
      const opts: any = {
      }
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Product, opts)
    },
    customers: (obj, args, { manager }) => {
      const opts: any = {
      }
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Customer, opts)
    }
  },
  Transaction: {
    product: (transaction, args, { manager }) => transaction.product,
    customer: (transaction, args, manager) => transaction.customer
  },
  Product: {
    transactions: (product, args, { manager }) => product.transactions
  },
  Customer: {
    transactions: (customer, args, { manager }) => customer.transactions
  }
}
