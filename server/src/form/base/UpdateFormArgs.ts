import { ArgsType, Field } from "@nestjs/graphql";
import { FormWhereUniqueInput } from "./FormWhereUniqueInput";
import { FormUpdateInput } from "./FormUpdateInput";

@ArgsType()
class UpdateFormArgs {
  @Field(() => FormWhereUniqueInput, { nullable: false })
  where!: FormWhereUniqueInput;
  @Field(() => FormUpdateInput, { nullable: false })
  data!: FormUpdateInput;
}

export { UpdateFormArgs };
