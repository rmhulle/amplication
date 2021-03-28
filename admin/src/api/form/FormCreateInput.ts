import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type FormCreateInput = {
  body?: string | null;
  client?: ClientWhereUniqueInput | null;
  display?: "form" | "wizard" | null;
};
