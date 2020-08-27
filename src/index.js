import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({ uri: 'https://slack-clone-server.vercel.app/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'token': localStorage.getItem('auth'),
  },
}));

const httpLinkWithMiddleware = middlewareLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: 'wss://slack-clone-server.vercel.app/',
  options: {
    reconnect: true,
  },
  
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

var Main = () => (
    <ApolloProvider client={client}>
        <App></App>
    </ApolloProvider>
)


ReactDOM.render(<Main />, document.getElementById('root'));
