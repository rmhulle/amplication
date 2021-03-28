import { ArgsType, Field } from "@nestjs/graphql";
import { FormWhereUniqueInput } from "./FormWhereUniqueInput";

@ArgsType()
class FindOneFormArgs {
  @Field(() => FormWhereUniqueInput, { nullable: false })
  where!: FormWhereUniqueInput;
}

export { FindOneFormArgs };
