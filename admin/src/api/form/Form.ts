import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type Form = {
  body: string | null;
  client?: ClientWhereUniqueInput | null;
  createdAt: Date;
  display?: "form" | "wizard" | null;
  id: string;
  updatedAt: Date;
};
