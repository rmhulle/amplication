import { ArgsType, Field } from "@nestjs/graphql";
import { SubmissionWhereUniqueInput } from "./SubmissionWhereUniqueInput";
import { SubmissionUpdateInput } from "./SubmissionUpdateInput";

@ArgsType()
class UpdateSubmissionArgs {
  @Field(() => SubmissionWhereUniqueInput, { nullable: false })
  where!: SubmissionWhereUniqueInput;
  @Field(() => SubmissionUpdateInput, { nullable: false })
  data!: SubmissionUpdateInput;
}

export { UpdateSubmissionArgs };
