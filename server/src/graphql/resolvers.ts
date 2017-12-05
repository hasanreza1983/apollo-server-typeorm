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
        relations: ["product", "customer"]
      }
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Transaction, opts)
    },
    products: (obj, args, { manager }) => manager.find(Product),
    customers: (obj, args, { manager }) => manager.find(Customer)
  },
  Transaction: {
    product: (transaction, args, { manager }) => transaction.product,
    customer: (transaction, args, manager) => transaction.customer
  },
  Product: {
    transactions: (product, args, { manager }) => manager.find(Transaction)
  },
  Customer: {
    transactions: (customer, args, { manager }) => manager.find(Transaction)
  }
}
