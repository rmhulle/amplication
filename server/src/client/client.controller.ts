import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ClientService } from "./client.service";
import { ClientControllerBase } from "./base/client.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("clients")
@common.Controller("clients")
export class ClientController extends ClientControllerBase {
  constructor(
    protected readonly service: ClientService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
