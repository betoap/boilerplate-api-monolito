import { SequelizeService } from './../../../../core/service';

import { CommentFilter } from './../filter/comment.filter';
import { CommentRepository } from './../repository/comment.repository';
import CommentEntity from './../entity/comment.entity';

export class CommentService extends SequelizeService {

    public filter: CommentFilter = new CommentFilter;
    protected repository: CommentRepository = new CommentRepository;
    protected entity = CommentEntity;

}
