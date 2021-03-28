import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateLeadArgs } from "./CreateLeadArgs";
import { UpdateLeadArgs } from "./UpdateLeadArgs";
import { DeleteLeadArgs } from "./DeleteLeadArgs";
import { FindManyLeadArgs } from "./FindManyLeadArgs";
import { FindOneLeadArgs } from "./FindOneLeadArgs";
import { Lead } from "./Lead";
import { FindManySubmissionArgs } from "../../submission/base/FindManySubmissionArgs";
import { Submission } from "../../submission/base/Submission";
import { Client } from "../../client/base/Client";
import { LeadService } from "../lead.service";

@graphql.Resolver(() => Lead)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LeadResolverBase {
  constructor(
    protected readonly service: LeadService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Lead])
  @nestAccessControl.UseRoles({
    resource: "Lead",
    action: "read",
    possession: "any",
  })
  async leads(
    @graphql.Args() args: FindManyLeadArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Lead",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Lead, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Lead",
    action: "read",
    possession: "own",
  })
  async lead(
    @graphql.Args() args: FindOneLeadArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Lead",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Lead)
  @nestAccessControl.UseRoles({
    resource: "Lead",
    action: "create",
    possession: "any",
  })
  async createLead(
    @graphql.Args() args: CreateLeadArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Lead",
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
        `providing the properties: ${properties} on ${"Lead"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Lead)
  @nestAccessControl.UseRoles({
    resource: "Lead",
    action: "update",
    possession: "any",
  })
  async updateLead(
    @graphql.Args() args: UpdateLeadArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Lead",
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
        `providing the properties: ${properties} on ${"Lead"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Lead)
  @nestAccessControl.UseRoles({
    resource: "Lead",
    action: "delete",
    possession: "any",
  })
  async deleteLead(@graphql.Args() args: DeleteLeadArgs): Promise<Lead | null> {
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
    resource: "Lead",
    action: "read",
    possession: "any",
  })
  async submissions(
    @graphql.Parent() parent: Lead,
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
    resource: "Lead",
    action: "read",
    possession: "any",
  })
  async client(
    @graphql.Parent() parent: Lead,
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
