import { getRepository, getCustomRepository, EntityManager } from "typeorm"
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
        where: {}
      }
      if (args.limit) {
        opts.take = args.limit
      }
      if (args.customerId) {
        opts.where.customer = args.customerId
      }
      if (args.productId) {
        opts.where.product = args.productId
      }
      return manager.find(Transaction, opts)
    },
    transactionAggregate: async (obj, args, { manager }: {manager: EntityManager}, info) => {
      const { productId, customerId } = args
      let query = manager
        .createQueryBuilder(Transaction, "transaction")
        .select("SUM(transaction.price*transaction.quantity)", "amount")
        .addSelect("transaction.customer")
        .addSelect("transaction.product")
        .groupBy("transaction.customer")
        .addGroupBy("transaction.product")
      if (customerId) { query = query.andWhere("transaction.customer = :cid", { cid: customerId })}
      if (productId) { query = query.andWhere("transaction.product = :pid", { pid: productId })}
      query = query
      const [data, product, customer] = await Promise.all([
        query.getRawMany(),
        manager.findOneById(Product, productId),
        manager.findOneById(Customer, customerId)
      ])
      console.log(data)
      return data.map(trans => ({
        ...trans,
        product,
        customer
      }))
    },
    products: (obj, args, { manager }) => {
      const opts: any = {}
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Product, opts)
    },
    customers: (obj, args, { manager }) => {
      const opts: any = {}
      if (args.limit) {
        opts.take = args.limit
      }
      return manager.find(Customer, opts)
    }
  },
  TransactionAggregate: {},
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
