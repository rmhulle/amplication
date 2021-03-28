import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClientSelect } from "../client/ClientSelect";
import { Form as TForm } from "../api/form/Form";
import { FormUpdateInput } from "../api/form/FormUpdateInput";

export const Form = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/forms/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TForm,
    AxiosError,
    [string, string]
  >(["get-/api/forms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/forms"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TForm, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/forms"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//forms");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TForm, AxiosError, FormUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/forms"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: FormUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.body);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["body", "client", "display"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"form"} ${
                  data?.body && data?.body.length ? data.body : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="body" name="body" />
            </div>
            <div>
              <ClientSelect label="client" name="client.id" />
            </div>
            <div>
              <SelectField
                label="display"
                name="display"
                options={[
                  { label: "Form", value: "form" },
                  { label: "Wizard", value: "wizard" },
                ]}
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
