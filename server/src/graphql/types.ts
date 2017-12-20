export default `
type User {
  id: Int!
  username: String
}

type Transaction {
  id: Int!
  price: Int!
  quantity: Int!
  timestamp: String!
  product: Product
  customer: Customer
}

type TransactionAggregate {
  amount: Int!
  customer: Customer
  product: Product
}

type Customer {
  id: Int!
  transactions: [Transaction]
}

type Product {
  id: Int!
  transactions: [Transaction]
}

# the schema allows the following query:
type Query {
  users: [User]
  customers(limit: Int): [Customer]
  products(limit: Int): [Product]
  transactions(limit: Int, customerId: Int, productId: Int): [Transaction]
  transactionAggregate(customerId: Int, productId: Int): [TransactionAggregate]
}
`;