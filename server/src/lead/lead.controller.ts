import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LeadService } from "./lead.service";
import { LeadControllerBase } from "./base/lead.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("leads")
@common.Controller("leads")
export class LeadController extends LeadControllerBase {
  constructor(
    protected readonly service: LeadService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
