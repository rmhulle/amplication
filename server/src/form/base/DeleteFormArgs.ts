import { ArgsType, Field } from "@nestjs/graphql";
import { FormWhereUniqueInput } from "./FormWhereUniqueInput";

@ArgsType()
class DeleteFormArgs {
  @Field(() => FormWhereUniqueInput, { nullable: false })
  where!: FormWhereUniqueInput;
}

export { DeleteFormArgs };
