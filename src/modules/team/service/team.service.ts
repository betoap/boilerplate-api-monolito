import { SequelizeService } from './../../../core/service';

import { TeamFilter } from './../filter/team.filter';
import { TeamRepository } from './../repository/team.repository';
import TeamEntity from './../entity/team.entity';

export class TeamService extends SequelizeService {

    public filter: TeamFilter = new TeamFilter;
    protected repository: TeamRepository = new TeamRepository;
    protected entity = TeamEntity;

}
