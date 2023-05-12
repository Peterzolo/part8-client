import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allBooks {
      title
      published
      author

      id
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});
