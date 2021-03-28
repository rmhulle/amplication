import { ArgsType, Field } from "@nestjs/graphql";
import { ClientWhereUniqueInput } from "./ClientWhereUniqueInput";

@ArgsType()
class DeleteClientArgs {
  @Field(() => ClientWhereUniqueInput, { nullable: false })
  where!: ClientWhereUniqueInput;
}

export { DeleteClientArgs };
