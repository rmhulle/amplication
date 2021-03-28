import { Form } from "./Form";
import { registerEnumType } from "@nestjs/graphql";

export enum EnumFormDisplay {
  Form = "form",
  Wizard = "wizard",
}

registerEnumType(EnumFormDisplay, {
  name: "EnumFormDisplay",
});
