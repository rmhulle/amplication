import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { FormWhereUniqueInput } from "../../form/base/FormWhereUniqueInput";
import { Type } from "class-transformer";
import { LeadWhereUniqueInput } from "../../lead/base/LeadWhereUniqueInput";
@InputType()
class SubmissionUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  anonId?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  data?: string | null;
  @ApiProperty({
    required: false,
    type: FormWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FormWhereUniqueInput)
  @IsOptional()
  @Field(() => FormWhereUniqueInput, {
    nullable: true,
  })
  form?: FormWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: LeadWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => LeadWhereUniqueInput)
  @IsOptional()
  @Field(() => LeadWhereUniqueInput, {
    nullable: true,
  })
  lead?: LeadWhereUniqueInput | null;
}
export { SubmissionUpdateInput };
