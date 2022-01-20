import { IGraphqlBase } from './../../../../core/graphql/graphql';
import { CommentResolve } from './comment.resolve';

export default class CommentGraphql extends CommentResolve implements IGraphqlBase {}
