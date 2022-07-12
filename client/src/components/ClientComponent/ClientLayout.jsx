import * as React from "react";
import { Button, Table } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../mutation/clientMutation";
import { GET_CLIENTS } from "../../queries/clientquery";
const ClientLayout = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
  });
  // console.log(data);
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <Button className="btn btn-danger" onClick={deleteClient}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ClientLayout;
