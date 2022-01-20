import { SequelizeRoute } from './../../../../core/router';

import { GalleryController } from './../controller/gallery.controller';

export default class GalleryRoute extends SequelizeRoute {

    protected controller: GalleryController = new GalleryController();

    constructor( config ) {
        super( config );
    }
}

