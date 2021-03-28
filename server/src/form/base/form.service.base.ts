import { PrismaService } from "nestjs-prisma";
import {
  FindOneFormArgs,
  FindManyFormArgs,
  FormCreateArgs,
  FormUpdateArgs,
  FormDeleteArgs,
  Subset,
} from "@prisma/client";

export class FormServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyFormArgs>(args: Subset<T, FindManyFormArgs>) {
    return this.prisma.form.findMany(args);
  }
  findOne<T extends FindOneFormArgs>(args: Subset<T, FindOneFormArgs>) {
    return this.prisma.form.findOne(args);
  }
  create<T extends FormCreateArgs>(args: Subset<T, FormCreateArgs>) {
    return this.prisma.form.create<T>(args);
  }
  update<T extends FormUpdateArgs>(args: Subset<T, FormUpdateArgs>) {
    return this.prisma.form.update<T>(args);
  }
  delete<T extends FormDeleteArgs>(args: Subset<T, FormDeleteArgs>) {
    return this.prisma.form.delete(args);
  }
}
