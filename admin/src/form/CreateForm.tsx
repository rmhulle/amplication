import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
  SelectField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClientSelect } from "../client/ClientSelect";
import { Form } from "../api/form/Form";
import { FormCreateInput } from "../api/form/FormCreateInput";

const INITIAL_VALUES = {} as FormCreateInput;

export const CreateForm = (): React.ReactElement => {
  useBreadcrumbs("/forms/new", "Create form");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Form,
    AxiosError,
    FormCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/forms", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/forms"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: FormCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create form"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
