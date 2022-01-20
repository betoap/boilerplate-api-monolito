import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class PromotionQuery extends GraphqlBase {

    @type
    public mutationResponsePromotion(): string {
        return `
            {
                success: [promotion]
                error: [promotionError]
            }
        `;
    }

    @type
    public promotionError(): string {
        return `
            {
                id: ID
                name: String!
                percentage: Int
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public promotion(): string {
        return `
            {
                id: ID
                name: String!
                percentage: Int
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public promotions(): string {
      return `
        {
          response: [promotion!]
          paginate: paginate
        }
    `;
    }

    @input
    public promotionWhereInput(): string {
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

                percentage: Int
                percentage_eq: Int
                percentage_not: Int
                percentage_in: [Int!]
                percentage_not_in: [Int!]
                percentage_lt: Int
                percentage_lte: Int
                percentage_gt: Int
                percentage_gte: Int
                percentage_contains: Int
                percentage_not_contains: Int
                percentage_starts_with: Int
                percentage_not_starts_with: Int
                percentage_ends_with: Int
                percentage_not_ends_with: Int

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

                AND: [promotionWhereInput!]
                OR: [promotionWhereInput!]
            }
        `;
    }

    @input
     public promotionCreateInput(): string {
        return `
            {
                name: String!
                percentage: Int
            }
        `;
    }

    @input
    public promotionUpdateInput(): string {
        return `
            {
                name_id: Int
                percentage_id: Int
            }
        `;
    }

    @input
    public promotionDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
