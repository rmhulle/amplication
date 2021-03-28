import { PrismaService } from "nestjs-prisma";
import {
  FindOneClientArgs,
  FindManyClientArgs,
  ClientCreateArgs,
  ClientUpdateArgs,
  ClientDeleteArgs,
  Subset,
} from "@prisma/client";

export class ClientServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyClientArgs>(args: Subset<T, FindManyClientArgs>) {
    return this.prisma.client.findMany(args);
  }
  findOne<T extends FindOneClientArgs>(args: Subset<T, FindOneClientArgs>) {
    return this.prisma.client.findOne(args);
  }
  create<T extends ClientCreateArgs>(args: Subset<T, ClientCreateArgs>) {
    return this.prisma.client.create<T>(args);
  }
  update<T extends ClientUpdateArgs>(args: Subset<T, ClientUpdateArgs>) {
    return this.prisma.client.update<T>(args);
  }
  delete<T extends ClientDeleteArgs>(args: Subset<T, ClientDeleteArgs>) {
    return this.prisma.client.delete(args);
  }
}
