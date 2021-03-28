import { ArgsType, Field } from "@nestjs/graphql";
import { SubmissionWhereUniqueInput } from "./SubmissionWhereUniqueInput";

@ArgsType()
class FindOneSubmissionArgs {
  @Field(() => SubmissionWhereUniqueInput, { nullable: false })
  where!: SubmissionWhereUniqueInput;
}

export { FindOneSubmissionArgs };
