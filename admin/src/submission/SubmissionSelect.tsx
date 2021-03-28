import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Submission } from "../api/submission/Submission";

type Data = Submission[];

type Props = Omit<SelectFieldProps, "options">;

export const SubmissionSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/submissions",
    async () => {
      const response = await api.get("/api/submissions");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.anonId && item.anonId.length ? item.anonId : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
