import { PrismaService } from "nestjs-prisma";
import {
  FindOneSubmissionArgs,
  FindManySubmissionArgs,
  SubmissionCreateArgs,
  SubmissionUpdateArgs,
  SubmissionDeleteArgs,
  Subset,
} from "@prisma/client";

export class SubmissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManySubmissionArgs>(
    args: Subset<T, FindManySubmissionArgs>
  ) {
    return this.prisma.submission.findMany(args);
  }
  findOne<T extends FindOneSubmissionArgs>(
    args: Subset<T, FindOneSubmissionArgs>
  ) {
    return this.prisma.submission.findOne(args);
  }
  create<T extends SubmissionCreateArgs>(
    args: Subset<T, SubmissionCreateArgs>
  ) {
    return this.prisma.submission.create<T>(args);
  }
  update<T extends SubmissionUpdateArgs>(
    args: Subset<T, SubmissionUpdateArgs>
  ) {
    return this.prisma.submission.update<T>(args);
  }
  delete<T extends SubmissionDeleteArgs>(
    args: Subset<T, SubmissionDeleteArgs>
  ) {
    return this.prisma.submission.delete(args);
  }
}
