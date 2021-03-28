import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Lead } from "../api/lead/Lead";

type Props = { id: string };

export const LeadTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Lead,
    AxiosError,
    [string, string]
  >(["get-/api/leads", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/leads"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/leads"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
