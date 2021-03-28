import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Form } from "../api/form/Form";

type Props = { id: string };

export const FormTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Form,
    AxiosError,
    [string, string]
  >(["get-/api/forms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/forms"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/forms"}/${id}`} className="entity-id">
      {data?.body && data?.body.length ? data.body : data?.id}
    </Link>
  );
};
