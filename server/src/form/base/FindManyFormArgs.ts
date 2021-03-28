import { ArgsType, Field } from "@nestjs/graphql";
import { FormWhereInput } from "./FormWhereInput";

@ArgsType()
class FindManyFormArgs {
  @Field(() => FormWhereInput, { nullable: true })
  where?: FormWhereInput;
}

export { FindManyFormArgs };
