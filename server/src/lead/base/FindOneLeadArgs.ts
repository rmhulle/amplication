import { ArgsType, Field } from "@nestjs/graphql";
import { LeadWhereUniqueInput } from "./LeadWhereUniqueInput";

@ArgsType()
class FindOneLeadArgs {
  @Field(() => LeadWhereUniqueInput, { nullable: false })
  where!: LeadWhereUniqueInput;
}

export { FindOneLeadArgs };
