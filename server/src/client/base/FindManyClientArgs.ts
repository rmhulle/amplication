import { ArgsType, Field } from "@nestjs/graphql";
import { ClientWhereInput } from "./ClientWhereInput";

@ArgsType()
class FindManyClientArgs {
  @Field(() => ClientWhereInput, { nullable: true })
  where?: ClientWhereInput;
}

export { FindManyClientArgs };
