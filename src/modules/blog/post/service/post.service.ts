import { SequelizeService } from './../../../../core/service';

import { PostFilter } from './../filter/post.filter';
import { PostRepository } from './../repository/post.repository';
import PostEntity from './../entity/post.entity';

export class PostService extends SequelizeService {

    public filter: PostFilter = new PostFilter;
    protected repository: PostRepository = new PostRepository;
    protected entity = PostEntity;

}
