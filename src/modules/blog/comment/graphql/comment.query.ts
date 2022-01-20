import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class CommentQuery extends GraphqlBase {

    @type
    public mutationResponseComment(): string {
        return `
            {
                success: [comment]
                error: [commentError]
            }
        `;
    }

    @type
    public commentError(): string {
        return `
            {
                id: ID
                user_id: Int!
                post_id: Int!
                content: String!
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public comment(): string {
        return `
            {
                id: ID
                user(where: userWhereInput, order: [[String!]!], first: Int, offset: Int): users
                post(where: postWhereInput, order: [[String!]!], first: Int, offset: Int): posts
                content: String!
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public comments(): string {
      return `
        {
          response: [comment!]
          paginate: paginate
        }
    `;
    }

    @input
    public commentWhereInput(): string {
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

                user_id: Int
                user_id_eq: Int
                user_id_not: Int
                user_id_in: [Int!]
                user_id_not_in: [Int!]
                user_id_lt: Int
                user_id_lte: Int
                user_id_gt: Int
                user_id_gte: Int
                user_id_contains: Int
                user_id_not_contains: Int
                user_id_starts_with: Int
                user_id_not_starts_with: Int
                user_id_ends_with: Int
                user_id_not_ends_with: Int

                post_id: Int
                post_id_eq: Int
                post_id_not: Int
                post_id_in: [Int!]
                post_id_not_in: [Int!]
                post_id_lt: Int
                post_id_lte: Int
                post_id_gt: Int
                post_id_gte: Int
                post_id_contains: Int
                post_id_not_contains: Int
                post_id_starts_with: Int
                post_id_not_starts_with: Int
                post_id_ends_with: Int
                post_id_not_ends_with: Int

                content: String
                content_eq: String
                content_not: String
                content_in: [String!]
                content_not_in: [String!]
                content_lt: String
                content_lte: String
                content_gt: String
                content_gte: String
                content_contains: String
                content_not_contains: String
                content_starts_with: String
                content_not_starts_with: String
                content_ends_with: String
                content_not_ends_with: String

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

                AND: [commentWhereInput!]
                OR: [commentWhereInput!]
            }
        `;
    }

    @input
     public commentCreateInput(): string {
        return `
            {
                user_id: Int!
                post_id: Int!
                content: String!
            }
        `;
    }

    @input
    public commentUpdateInput(): string {
        return `
            {
                user_id: Int
                post_id: Int
                content: String
            }
        `;
    }

    @input
    public commentDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
