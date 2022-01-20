import { GraphQLFieldResolver } from "graphql";

import { ComposableResolver } from "./composable.resolver";

export const authResolver: ComposableResolver<any, any> =
    (resolver: GraphQLFieldResolver<any, any>): GraphQLFieldResolver<any, any> => {

        return (parent, args, context: any, info) => {
          // new Autentication().tokenValidation(null, next);
        };

    };
