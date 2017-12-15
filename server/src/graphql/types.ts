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
  transactions(limit: Int): [Transaction]
}
`;