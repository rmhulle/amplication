import { ArgsType, Field } from "@nestjs/graphql";
import { FormCreateInput } from "./FormCreateInput";

@ArgsType()
class CreateFormArgs {
  @Field(() => FormCreateInput, { nullable: false })
  data!: FormCreateInput;
}

export { CreateFormArgs };
