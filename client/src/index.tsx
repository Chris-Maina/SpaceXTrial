import {
  gql,
  HttpLink,
  useQuery,
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages';
import injectStyles from './styles';
import { typeDefs, resolvers } from './resolvers';
import Login from './pages/login';
import { cache } from './cache'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token') || '',
    }
  }),
  typeDefs,
  resolvers,
});

export const IS_LOGGED_IN = gql`
  query IsUerLoggedIn {
    isLoggedIn @client
  }
`;


const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />
};

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
