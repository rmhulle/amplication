import { ClientWhereUniqueInput } from "../client/ClientWhereUniqueInput";

export type LeadCreateInput = {
  anonId?: string | null;
  client?: ClientWhereUniqueInput | null;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
};
