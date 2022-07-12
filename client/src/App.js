import React from "react";
import Clients from "./components/graphql/Clients";
import Header from "./assets/Header";
/*setting up apollo client*/
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Clients />
    </ApolloProvider>
  );
}

export default App;
