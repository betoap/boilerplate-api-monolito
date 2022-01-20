import { SequelizeRoute } from './../../../core/router';

import { TeamController } from './../controller/team.controller';

export default class TeamRoute extends SequelizeRoute {

    protected controller: TeamController = new TeamController();

    constructor( config ) {
        super( config );
    }
}

