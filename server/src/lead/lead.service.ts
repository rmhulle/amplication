import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LeadServiceBase } from "./base/lead.service.base";

@Injectable()
export class LeadService extends LeadServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
