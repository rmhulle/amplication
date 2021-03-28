import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FormServiceBase } from "./base/form.service.base";

@Injectable()
export class FormService extends FormServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
