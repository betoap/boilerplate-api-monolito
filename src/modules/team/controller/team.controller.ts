import { SequelizeController } from './../../../core/controller';

import { TeamService } from './../service/team.service';

export class TeamController extends SequelizeController {

    protected service: TeamService = new TeamService;

}
