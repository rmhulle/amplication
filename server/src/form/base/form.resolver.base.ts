import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateFormArgs } from "./CreateFormArgs";
import { UpdateFormArgs } from "./UpdateFormArgs";
import { DeleteFormArgs } from "./DeleteFormArgs";
import { FindManyFormArgs } from "./FindManyFormArgs";
import { FindOneFormArgs } from "./FindOneFormArgs";
import { Form } from "./Form";
import { FindManySubmissionArgs } from "../../submission/base/FindManySubmissionArgs";
import { Submission } from "../../submission/base/Submission";
import { Client } from "../../client/base/Client";
import { FormService } from "../form.service";

@graphql.Resolver(() => Form)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class FormResolverBase {
  constructor(
    protected readonly service: FormService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Form])
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  async forms(
    @graphql.Args() args: FindManyFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Form",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Form, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "own",
  })
  async form(
    @graphql.Args() args: FindOneFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Form",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Form)
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "create",
    possession: "any",
  })
  async createForm(
    @graphql.Args() args: CreateFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        client: args.data.client
          ? {
              connect: args.data.client,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Form)
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "update",
    possession: "any",
  })
  async updateForm(
    @graphql.Args() args: UpdateFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          client: args.data.client
            ? {
                connect: args.data.client,
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

  @graphql.Mutation(() => Form)
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "delete",
    possession: "any",
  })
  async deleteForm(@graphql.Args() args: DeleteFormArgs): Promise<Form | null> {
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

  @graphql.ResolveField(() => [Submission])
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  async submissions(
    @graphql.Parent() parent: Form,
    @graphql.Args() args: FindManySubmissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Submission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Submission",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .submissions(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Client, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  async client(
    @graphql.Parent() parent: Form,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Client | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Client",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .client();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
