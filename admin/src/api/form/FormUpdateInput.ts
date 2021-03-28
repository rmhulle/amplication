import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type FormUpdateInput = {
  body?: string | null;
  client?: ClientWhereUniqueInput | null;
  display?: "form" | "wizard" | null;
};
