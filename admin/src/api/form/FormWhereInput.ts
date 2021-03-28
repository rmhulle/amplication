import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type FormWhereInput = {
  body?: string | null;
  client?: ClientWhereUniqueInput | null;
  createdAt?: Date;
  display?: "form" | "wizard" | null;
  id?: string;
  updatedAt?: Date;
};
