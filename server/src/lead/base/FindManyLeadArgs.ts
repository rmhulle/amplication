import { ArgsType, Field } from "@nestjs/graphql";
import { LeadWhereInput } from "./LeadWhereInput";

@ArgsType()
class FindManyLeadArgs {
  @Field(() => LeadWhereInput, { nullable: true })
  where?: LeadWhereInput;
}

export { FindManyLeadArgs };
