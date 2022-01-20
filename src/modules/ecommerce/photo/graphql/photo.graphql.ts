import { IGraphqlBase } from './../../../../core/graphql/graphql';
import { PhotoResolve } from './photo.resolve';

export default class PhotoGraphql extends PhotoResolve implements IGraphqlBase {}
