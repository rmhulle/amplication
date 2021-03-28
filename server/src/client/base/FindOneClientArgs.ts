import { ArgsType, Field } from "@nestjs/graphql";
import { ClientWhereUniqueInput } from "./ClientWhereUniqueInput";

@ArgsType()
class FindOneClientArgs {
  @Field(() => ClientWhereUniqueInput, { nullable: false })
  where!: ClientWhereUniqueInput;
}

export { FindOneClientArgs };
