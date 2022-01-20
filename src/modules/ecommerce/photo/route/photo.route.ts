import { SequelizeRoute } from './../../../../core/router';

import { PhotoController } from './../controller/photo.controller';

export default class PhotoRoute extends SequelizeRoute {

    protected controller: PhotoController = new PhotoController();

    constructor( config ) {
        super( config );
    }
}

