import { IGraphqlBase } from './../../../../core/graphql/graphql';
import { PostResolve } from './post.resolve';

export default class PostGraphql extends PostResolve implements IGraphqlBase {}
