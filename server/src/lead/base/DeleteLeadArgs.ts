import { ArgsType, Field } from "@nestjs/graphql";
import { LeadWhereUniqueInput } from "./LeadWhereUniqueInput";

@ArgsType()
class DeleteLeadArgs {
  @Field(() => LeadWhereUniqueInput, { nullable: false })
  where!: LeadWhereUniqueInput;
}

export { DeleteLeadArgs };
