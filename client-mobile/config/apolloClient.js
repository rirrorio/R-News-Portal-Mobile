import {
  ApolloClient,
  InMemoryCache,
//   ApolloProvider,
//   gql,
} from "@apollo/client";
const client = new ApolloClient({
  uri: "https://ea72-2001-448a-304f-338e-f00b-bf2f-8b2f-9028.ap.ngrok.io",
  cache: new InMemoryCache(),
});


export default client