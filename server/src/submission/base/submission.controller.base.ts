import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { SubmissionService } from "../submission.service";
import { SubmissionCreateInput } from "./SubmissionCreateInput";
import { SubmissionWhereInput } from "./SubmissionWhereInput";
import { SubmissionWhereUniqueInput } from "./SubmissionWhereUniqueInput";
import { SubmissionUpdateInput } from "./SubmissionUpdateInput";
import { Submission } from "./Submission";

export class SubmissionControllerBase {
  constructor(
    protected readonly service: SubmissionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Submission })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: SubmissionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Submission> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Submission",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Submission"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        form: data.form
          ? {
              connect: data.form,
            }
          : undefined,

        lead: data.lead
          ? {
              connect: data.lead,
            }
          : undefined,
      },
      select: {
        anonId: true,
        createdAt: true,
        data: true,

        form: {
          select: {
            id: true,
          },
        },

        id: true,

        lead: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Submission] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: SubmissionWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Submission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Submission",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        anonId: true,
        createdAt: true,
        data: true,

        form: {
          select: {
            id: true,
          },
        },

        id: true,

        lead: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Submission })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: SubmissionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Submission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Submission",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        anonId: true,
        createdAt: true,
        data: true,

        form: {
          select: {
            id: true,
          },
        },

        id: true,

        lead: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Submission })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: SubmissionWhereUniqueInput,
    @common.Body()
    data: SubmissionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Submission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Submission",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Submission"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          form: data.form
            ? {
                connect: data.form,
              }
            : undefined,

          lead: data.lead
            ? {
                connect: data.lead,
              }
            : undefined,
        },
        select: {
          anonId: true,
          createdAt: true,
          data: true,

          form: {
            select: {
              id: true,
            },
          },

          id: true,

          lead: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Submission",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Submission })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: SubmissionWhereUniqueInput
  ): Promise<Submission | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          anonId: true,
          createdAt: true,
          data: true,

          form: {
            select: {
              id: true,
            },
          },

          id: true,

          lead: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
