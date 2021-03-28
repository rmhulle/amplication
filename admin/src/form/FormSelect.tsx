import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Form } from "../api/form/Form";

type Data = Form[];

type Props = Omit<SelectFieldProps, "options">;

export const FormSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/forms", async () => {
    const response = await api.get("/api/forms");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.body && item.body.length ? item.body : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
