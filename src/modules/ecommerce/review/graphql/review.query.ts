import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class ReviewQuery extends GraphqlBase {

    @type
    public mutationResponseReview(): string {
        return `
            {
                success: [review]
                error: [reviewError]
            }
        `;
    }

    @type
    public reviewError(): string {
        return `
            {
                id: ID
                text: String
                note: Int!
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public review(): string {
        return `
            {
                id: ID
                user(where: userWhereInput, order: [[String!]!], first: Int, offset: Int): users
                product(where: productWhereInput, order: [[String!]!], first: Int, offset: Int): products
                text: String
                note: Int!
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public reviews(): string {
      return `
        {
          response: [review!]
          paginate: paginate
        }
    `;
    }

    @input
    public reviewWhereInput(): string {
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

                text: String
                text_eq: String
                text_not: String
                text_in: [String!]
                text_not_in: [String!]
                text_lt: String
                text_lte: String
                text_gt: String
                text_gte: String
                text_contains: String
                text_not_contains: String
                text_starts_with: String
                text_not_starts_with: String
                text_ends_with: String
                text_not_ends_with: String

                note: Int
                note_eq: String
                note_not: String
                note_in: [String!]
                note_not_in: [String!]
                note_lt: String
                note_lte: String
                note_gt: String
                note_gte: String
                note_contains: String
                note_not_contains: String
                note_starts_with: String
                note_not_starts_with: String
                note_ends_with: String
                note_not_ends_with: String

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

                AND: [reviewWhereInput!]
                OR: [reviewWhereInput!]
            }
        `;
    }

    @input
     public reviewCreateInput(): string {
        return `
            {
                product_id: Int!
                user_id: Int!
                text: String
                note: Int!
            }
        `;
    }

    @input
    public reviewUpdateInput(): string {
        return `
            {
                text: String
                note: Int
            }
        `;
    }

    @input
    public reviewDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
