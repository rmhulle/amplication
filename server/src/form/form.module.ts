import { Module } from "@nestjs/common";
import { FormModuleBase } from "./base/form.module.base";
import { FormService } from "./form.service";
import { FormController } from "./form.controller";
import { FormResolver } from "./form.resolver";

@Module({
  imports: [FormModuleBase],
  controllers: [FormController],
  providers: [FormService, FormResolver],
  exports: [FormService],
})
export class FormModule {}
