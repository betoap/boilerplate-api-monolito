import { IGraphqlBase } from './../../../core/graphql/graphql';
import { UserResolve } from './user.resolve';

export default class UserGraphql extends UserResolve implements IGraphqlBase {}
