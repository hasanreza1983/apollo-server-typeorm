export default `
type User {
  id: Int!
  username: String
}

# the schema allows the following query:
type Query {
  users: [User]
}
`;