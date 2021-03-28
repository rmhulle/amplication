import { ArgsType, Field } from "@nestjs/graphql";
import { SubmissionWhereUniqueInput } from "./SubmissionWhereUniqueInput";

@ArgsType()
class DeleteSubmissionArgs {
  @Field(() => SubmissionWhereUniqueInput, { nullable: false })
  where!: SubmissionWhereUniqueInput;
}

export { DeleteSubmissionArgs };
