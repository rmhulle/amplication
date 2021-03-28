import { FormWhereUniqueInput } from "../form/FormWhereUniqueInput";
import { LeadWhereUniqueInput } from "../lead/LeadWhereUniqueInput";

export type SubmissionCreateInput = {
  anonId?: string | null;
  data?: string | null;
  form?: FormWhereUniqueInput | null;
  lead?: LeadWhereUniqueInput | null;
};
