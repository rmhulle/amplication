import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateSubmissionArgs } from "./CreateSubmissionArgs";
import { UpdateSubmissionArgs } from "./UpdateSubmissionArgs";
import { DeleteSubmissionArgs } from "./DeleteSubmissionArgs";
import { FindManySubmissionArgs } from "./FindManySubmissionArgs";
import { FindOneSubmissionArgs } from "./FindOneSubmissionArgs";
import { Submission } from "./Submission";
import { Form } from "../../form/base/Form";
import { Lead } from "../../lead/base/Lead";
import { SubmissionService } from "../submission.service";

@graphql.Resolver(() => Submission)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SubmissionResolverBase {
  constructor(
    protected readonly service: SubmissionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Submission])
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "any",
  })
  async submissions(
    @graphql.Args() args: FindManySubmissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Submission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Submission",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Submission, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "own",
  })
  async submission(
    @graphql.Args() args: FindOneSubmissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Submission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Submission",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Submission)
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "create",
    possession: "any",
  })
  async createSubmission(
    @graphql.Args() args: CreateSubmissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Submission> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Submission",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Submission"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        form: args.data.form
          ? {
              connect: args.data.form,
            }
          : undefined,

        lead: args.data.lead
          ? {
              connect: args.data.lead,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Submission)
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "update",
    possession: "any",
  })
  async updateSubmission(
    @graphql.Args() args: UpdateSubmissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Submission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Submission",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Submission"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          form: args.data.form
            ? {
                connect: args.data.form,
              }
            : undefined,

          lead: args.data.lead
            ? {
                connect: args.data.lead,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Submission)
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "delete",
    possession: "any",
  })
  async deleteSubmission(
    @graphql.Args() args: DeleteSubmissionArgs
  ): Promise<Submission | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Form, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "any",
  })
  async form(
    @graphql.Parent() parent: Submission,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Form",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .form();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Lead, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "any",
  })
  async lead(
    @graphql.Parent() parent: Submission,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Lead",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .lead();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
