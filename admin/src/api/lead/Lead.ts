import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type Lead = {
  anonId: string | null;
  client?: ClientWhereUniqueInput | null;
  createdAt: Date;
  email: string | null;
  id: string;
  name: string | null;
  phone: string | null;
  updatedAt: Date;
};
