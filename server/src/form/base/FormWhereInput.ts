import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsDate,
  IsEnum,
} from "class-validator";
import { ClientWhereUniqueInput } from "../../client/base/ClientWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import { EnumFormDisplay } from "./EnumFormDisplay";
@InputType()
class FormWhereInput {
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
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => ClientWhereUniqueInput)
  @IsOptional()
  client?: ClientWhereUniqueInput | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
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
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
}
export { FormWhereInput };
