import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class TagQuery extends GraphqlBase {

    @type
    public mutationResponseTag(): string {
        return `
          {
            success: [tag]
            error: [tagError]
          }
        `;
    }

    @type
    public tagError(): string {
        return `
          {
            id: ID
            name: String!
            description: String
            createdAt: String
            updatedAt: String
            error: String
          }
        `;
    }

    @type
    public tag(): string {
      return `
        {
          id: ID
          product(where: productWhereInput, order: [[String!]!], first: Int, offset: Int): products
          name: String!
          description: String
          createdAt: String
          updatedAt: String
        }
      `;
    }

    @type
    public tags(): string {
      return `
        {
          response: [tag!]
          paginate: paginate
        }
    `;
    }

    @input
    public tagWhereInput(): string {
        return `
            {
                id: ID
                id_eq: ID
                id_not: ID
                id_in: [ID!]
                id_not_in: [ID!]
                id_lt: ID
                id_lte: ID
                id_gt: ID
                id_gte: ID
                id_contains: ID
                id_not_contains: ID
                id_starts_with: ID
                id_not_starts_with: ID
                id_ends_with: ID
                id_not_ends_with: ID

                name: String
                name_eq: String
                name_not: String
                name_in: [String!]
                name_not_in: [String!]
                name_lt: String
                name_lte: String
                name_gt: String
                name_gte: String
                name_contains: String
                name_not_contains: String
                name_starts_with: String
                name_not_starts_with: String
                name_ends_with: String
                name_not_ends_with: String

                description: String
                description_eq: String
                description_not: String
                description_in: [String!]
                description_not_in: [String!]
                description_lt: String
                description_lte: String
                description_gt: String
                description_gte: String
                description_contains: String
                description_not_contains: String
                description_starts_with: String
                description_not_starts_with: String
                description_ends_with: String
                description_not_ends_with: String

                createdAt: DateTime
                createdAt_eq: DateTime
                createdAt_not: DateTime
                createdAt_in: [DateTime!]
                createdAt_not_in: [DateTime!]
                createdAt_lt: DateTime
                createdAt_lte: DateTime
                createdAt_gt: DateTime
                createdAt_gte: DateTime

                updatedAt: DateTime
                updatedAt_eq: DateTime
                updatedAt_not: DateTime
                updatedAt_in: [DateTime!]
                updatedAt_not_in: [DateTime!]
                updatedAt_lt: DateTime
                updatedAt_lte: DateTime
                updatedAt_gt: DateTime
                updatedAt_gte: DateTime

                AND: [tagWhereInput!]
                OR: [tagWhereInput!]
            }
        `;
    }

    @input
     public tagCreateInput(): string {
        return `
            {
                name: String!
                description: String
                products: [Int!]
            }
        `;
    }

    @input
    public tagUpdateInput(): string {
        return `
            {
                name: String
                description: String
                products: [Int!]
            }
        `;
    }

    @input
    public tagDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
