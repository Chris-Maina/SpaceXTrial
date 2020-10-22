import { gql } from "@apollo/client";
import { cartItemsVar } from "./cache";

// Client Schema
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!,
    cartItems: [ID!]!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;


export const resolvers = {
  Mutation: {
    addOrRemoveFromCart: (_: any, { id }: { id: string }): string[] => {
      const cartItems = cartItemsVar();
      const data = cartItems.includes(id) ? cartItems.filter((i: string) => i !== id) : [...cartItems, id];
      cartItemsVar(data);
      return data;
    }
  }
};
