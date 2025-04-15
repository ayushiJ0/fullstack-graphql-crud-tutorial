import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: 30, isMarried: true },
  { id: "2", name: "Jane Smith", age: 25, isMarried: false },
  { id: "3", name: "Alice Johnson", age: 28, isMarried: false },
];

const customers = [
  { id: "1", name: "Harry Potter", age: 14, isMarried: true },
  { id: "2", name: "albus", age: 25, isMarried: false },
  { id: "3", name: "Ron Weasley", age: 28, isMarried: false },
];

const typeDefs = `
    type Query {
      getUsers: [User]
      getUserById(id: ID!): User
      getCustomers:[Customer]
      getCustomerById(id: ID!): Customer
    }

    type Mutation {
      createUser(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type Mutation {
      createCustomer(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
      id: ID
      name: String
      age: Int
      isMarried: Boolean
    }

    type Customer {
      id: ID
      name: String
      age: Int
      isMarried: Boolean
    }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
    getCustomers: () => {
      return customers;
    },
    getCustomerById: (parent, args) => {
      const id = args.id;
      return customers.find((customer) => customer.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      console.log(newUser);
      users.push(newUser);
    },
    createCustomer: (parent, args) => {
      const { name, age, isMarried } = args;
      const newCustomer = {
        id: (customers.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      console.log(newCustomer);
      customers.push(newCustomer);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server Running at: ${url}`);

///// Query, Mutation
//// typeDefs, resolvers
