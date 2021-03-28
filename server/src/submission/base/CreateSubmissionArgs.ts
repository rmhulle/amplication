import { ArgsType, Field } from "@nestjs/graphql";
import { SubmissionCreateInput } from "./SubmissionCreateInput";

@ArgsType()
class CreateSubmissionArgs {
  @Field(() => SubmissionCreateInput, { nullable: false })
  data!: SubmissionCreateInput;
}

export { CreateSubmissionArgs };
