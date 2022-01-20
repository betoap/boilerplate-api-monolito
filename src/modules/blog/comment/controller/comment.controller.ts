import { SequelizeController } from './../../../../core/controller';

import { CommentService } from './../service/comment.service';

export class CommentController extends SequelizeController {

    protected service: CommentService = new CommentService;

}
