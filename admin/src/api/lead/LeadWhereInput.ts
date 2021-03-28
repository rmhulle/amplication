import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type LeadWhereInput = {
  anonId?: string | null;
  client?: ClientWhereUniqueInput | null;
  createdAt?: Date;
  email?: string | null;
  id?: string;
  name?: string | null;
  phone?: string | null;
  updatedAt?: Date;
};
