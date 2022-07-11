import React from "react";
import ResponsiveAppBar from "./components/Header";
import Clients from "./components/graphql/Clients";
/*setting up apollo client*/
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <ResponsiveAppBar />
      <Clients/>
    </ApolloProvider>
  );
}

export default App;
