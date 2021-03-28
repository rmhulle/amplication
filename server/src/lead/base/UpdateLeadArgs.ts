import { ArgsType, Field } from "@nestjs/graphql";
import { LeadWhereUniqueInput } from "./LeadWhereUniqueInput";
import { LeadUpdateInput } from "./LeadUpdateInput";

@ArgsType()
class UpdateLeadArgs {
  @Field(() => LeadWhereUniqueInput, { nullable: false })
  where!: LeadWhereUniqueInput;
  @Field(() => LeadUpdateInput, { nullable: false })
  data!: LeadUpdateInput;
}

export { UpdateLeadArgs };
