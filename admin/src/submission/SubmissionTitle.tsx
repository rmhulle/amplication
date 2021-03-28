import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Submission } from "../api/submission/Submission";

type Props = { id: string };

export const SubmissionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Submission,
    AxiosError,
    [string, string]
  >(["get-/api/submissions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/submissions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/submissions"}/${id}`} className="entity-id">
      {data?.anonId && data?.anonId.length ? data.anonId : data?.id}
    </Link>
  );
};
