import { FormWhereUniqueInput } from "../form/FormWhereUniqueInput";
import { LeadWhereUniqueInput } from "../lead/LeadWhereUniqueInput";

export type Submission = {
  anonId: string | null;
  createdAt: Date;
  data: string | null;
  form?: FormWhereUniqueInput | null;
  id: string;
  lead?: LeadWhereUniqueInput | null;
  updatedAt: Date;
};
