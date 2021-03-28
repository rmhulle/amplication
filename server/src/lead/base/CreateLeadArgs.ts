import { ArgsType, Field } from "@nestjs/graphql";
import { LeadCreateInput } from "./LeadCreateInput";

@ArgsType()
class CreateLeadArgs {
  @Field(() => LeadCreateInput, { nullable: false })
  data!: LeadCreateInput;
}

export { CreateLeadArgs };
