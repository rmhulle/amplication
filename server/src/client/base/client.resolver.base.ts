import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteClientArgs } from "./DeleteClientArgs";
import { FindManyClientArgs } from "./FindManyClientArgs";
import { FindOneClientArgs } from "./FindOneClientArgs";
import { Client } from "./Client";
import { FindManyFormArgs } from "../../form/base/FindManyFormArgs";
import { Form } from "../../form/base/Form";
import { FindManyLeadArgs } from "../../lead/base/FindManyLeadArgs";
import { Lead } from "../../lead/base/Lead";
import { ClientService } from "../client.service";

@graphql.Resolver(() => Client)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ClientResolverBase {
  constructor(
    protected readonly service: ClientService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Client])
  @nestAccessControl.UseRoles({
    resource: "Client",
    action: "read",
    possession: "any",
  })
  async clients(
    @graphql.Args() args: FindManyClientArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Client[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Client",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Client, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Client",
    action: "read",
    possession: "own",
  })
  async client(
    @graphql.Args() args: FindOneClientArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Client | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Client",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Client)
  @nestAccessControl.UseRoles({
    resource: "Client",
    action: "delete",
    possession: "any",
  })
  async deleteClient(
    @graphql.Args() args: DeleteClientArgs
  ): Promise<Client | null> {
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

  @graphql.ResolveField(() => [Form])
  @nestAccessControl.UseRoles({
    resource: "Client",
    action: "read",
    possession: "any",
  })
  async forms(
    @graphql.Parent() parent: Client,
    @graphql.Args() args: FindManyFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Form[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Form",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .forms(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Lead])
  @nestAccessControl.UseRoles({
    resource: "Client",
    action: "read",
    possession: "any",
  })
  async leads(
    @graphql.Parent() parent: Client,
    @graphql.Args() args: FindManyLeadArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Lead[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Lead",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .leads(args);
    return results.map((result) => permission.filter(result));
  }
}
