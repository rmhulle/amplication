import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { FormService } from "../form.service";
import { FormCreateInput } from "./FormCreateInput";
import { FormWhereInput } from "./FormWhereInput";
import { FormWhereUniqueInput } from "./FormWhereUniqueInput";
import { FormUpdateInput } from "./FormUpdateInput";
import { Form } from "./Form";
import { SubmissionWhereInput } from "../../submission/base/SubmissionWhereInput";
import { Submission } from "../../submission/base/Submission";

export class FormControllerBase {
  constructor(
    protected readonly service: FormService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Form })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: FormCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        client: data.client
          ? {
              connect: data.client,
            }
          : undefined,
      },
      select: {
        body: true,

        client: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        display: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Form] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: FormWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Form",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        body: true,

        client: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        display: true,
        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Form",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        body: true,

        client: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        display: true,
        id: true,
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
    resource: "Form",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput,
    @common.Body()
    data: FormUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          client: data.client
            ? {
                connect: data.client,
              }
            : undefined,
        },
        select: {
          body: true,

          client: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          display: true,
          id: true,
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
    resource: "Form",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput
  ): Promise<Form | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          body: true,

          client: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          display: true,
          id: true,
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
  @common.Get("/:id/submissions")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  async findManySubmissions(
    @common.Param() params: FormWhereUniqueInput,
    @common.Query() query: SubmissionWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Submission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Submission",
    });
    const results = await this.service.findOne({ where: params }).submissions({
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
  @common.Post("/:id/submissions")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "update",
    possession: "any",
  })
  async createSubmissions(
    @common.Param() params: FormWhereUniqueInput,
    @common.Body() body: FormWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      submissions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Form"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/submissions")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "update",
    possession: "any",
  })
  async updateSubmissions(
    @common.Param() params: FormWhereUniqueInput,
    @common.Body() body: FormWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      submissions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Form"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/submissions")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "update",
    possession: "any",
  })
  async deleteSubmissions(
    @common.Param() params: FormWhereUniqueInput,
    @common.Body() body: FormWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      submissions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Form"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
