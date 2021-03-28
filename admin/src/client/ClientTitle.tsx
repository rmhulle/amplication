import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Client } from "../api/client/Client";

type Props = { id: string };

export const ClientTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Client,
    AxiosError,
    [string, string]
  >(["get-/api/clients", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/clients"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/clients"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
