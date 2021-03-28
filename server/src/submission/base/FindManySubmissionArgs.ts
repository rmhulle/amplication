import { ArgsType, Field } from "@nestjs/graphql";
import { SubmissionWhereInput } from "./SubmissionWhereInput";

@ArgsType()
class FindManySubmissionArgs {
  @Field(() => SubmissionWhereInput, { nullable: true })
  where?: SubmissionWhereInput;
}

export { FindManySubmissionArgs };
