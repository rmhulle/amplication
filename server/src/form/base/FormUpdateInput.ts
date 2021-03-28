import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested, IsEnum } from "class-validator";
import { ClientWhereUniqueInput } from "../../client/base/ClientWhereUniqueInput";
import { Type } from "class-transformer";
import { EnumFormDisplay } from "./EnumFormDisplay";
@InputType()
class FormUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  body?: string | null;
  @ApiProperty({
    required: false,
    type: ClientWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ClientWhereUniqueInput)
  @IsOptional()
  @Field(() => ClientWhereUniqueInput, {
    nullable: true,
  })
  client?: ClientWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    enum: EnumFormDisplay,
  })
  @IsEnum(EnumFormDisplay)
  @IsOptional()
  @Field(() => EnumFormDisplay, {
    nullable: true,
  })
  display?: "form" | "wizard" | null;
}
export { FormUpdateInput };
