import { SequelizeService } from './../../../../core/service';

import { TagFilter } from './../filter/tag.filter';
import { TagRepository } from './../repository/tag.repository';
import TagEntity from './../entity/tag.entity';

export class TagService extends SequelizeService {

    public filter: TagFilter = new TagFilter;
    protected repository: TagRepository = new TagRepository;
    protected entity = TagEntity;

}
