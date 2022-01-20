import { SequelizeController } from './../../../../core/controller';

import { PostService } from './../service/post.service';

export class PostController extends SequelizeController {

    protected service: PostService = new PostService;

}
