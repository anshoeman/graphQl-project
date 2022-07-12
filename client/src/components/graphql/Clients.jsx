import React from "react";
import { useQuery } from "@apollo/client";
import ClientLayout from "../ClientComponent/ClientLayout";
import SpinnerComponent from "../../assets/Spinner";
import { GET_CLIENTS } from "../../queries/clientquery";
import { Button, Table } from "react-bootstrap";
/*GET the clients*/
/*
@desc : Exactly same as grapiql
*/
// const GET_CLIENTS = gql`
//   query getClients {
//     clients {
//       id
//       name
//       email
//       phone
//     }
//   }
// `;
export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <SpinnerComponent />;
  if (error) return <h1>Error</h1>;
  return (
    <>
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sno</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => {
              return <ClientLayout client={client} key={client.id} />;
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
