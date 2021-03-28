import { PrismaService } from "nestjs-prisma";
import {
  FindOneLeadArgs,
  FindManyLeadArgs,
  LeadCreateArgs,
  LeadUpdateArgs,
  LeadDeleteArgs,
  Subset,
} from "@prisma/client";

export class LeadServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyLeadArgs>(args: Subset<T, FindManyLeadArgs>) {
    return this.prisma.lead.findMany(args);
  }
  findOne<T extends FindOneLeadArgs>(args: Subset<T, FindOneLeadArgs>) {
    return this.prisma.lead.findOne(args);
  }
  create<T extends LeadCreateArgs>(args: Subset<T, LeadCreateArgs>) {
    return this.prisma.lead.create<T>(args);
  }
  update<T extends LeadUpdateArgs>(args: Subset<T, LeadUpdateArgs>) {
    return this.prisma.lead.update<T>(args);
  }
  delete<T extends LeadDeleteArgs>(args: Subset<T, LeadDeleteArgs>) {
    return this.prisma.lead.delete(args);
  }
}
