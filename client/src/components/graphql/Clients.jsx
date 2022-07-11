import React from "react";
import { gql, useQuery } from "@apollo/client";

/*GET the clients*/
/*
@desc : Exactly same as grapiql
*/
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>Error</h1>;
  return <>{!loading && !error && <h1>Clients</h1>}</>;
}
