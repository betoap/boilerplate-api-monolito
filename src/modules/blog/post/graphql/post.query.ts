import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class PostQuery extends GraphqlBase {

    @type
    public mutationResponsePost(): string {
        return `
            {
                success: [post]
                error: [postError]
            }
        `;
    }

    @type
    public postError(): string {
        return `
            {
                id: ID
                user_id: Int!
                title: String!
                image: Upload
                call: String!
                integrate: String!
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public post(): string {
        return `
            {
                id: ID
                user(where: userWhereInput, order: [[String!]!], first: Int, offset: Int): users
                comment(where: commentWhereInput, order: [[String!]!], first: Int, offset: Int): comments
                title: String!
                call: String!
                image: Upload
                integrate: String!
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public posts(): string {
      return `
        {
          response: [post!]
          paginate: paginate
        }
    `;
    }

    @input
    public postWhereInput(): string {
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

                title: String
                title_eq: String
                title_not: String
                title_in: [String!]
                title_not_in: [String!]
                title_lt: String
                title_lte: String
                title_gt: String
                title_gte: String
                title_contains: String
                title_not_contains: String
                title_starts_with: String
                title_not_starts_with: String
                title_ends_with: String
                title_not_ends_with: String

                image: Upload
                image_eq: Upload
                image_not: Upload
                image_in: [Upload!]
                image_not_in: [Upload!]
                image_lt: Upload
                image_lte: Upload
                image_gt: Upload
                image_gte: Upload
                image_contains: Upload
                image_not_contains: Upload
                image_starts_with: Upload
                image_not_starts_with: Upload
                image_ends_with: Upload
                image_not_ends_with: Upload

                call: String
                call_eq: String
                call_not: String
                call_in: [String!]
                call_not_in: [String!]
                call_lt: String
                call_lte: String
                call_gt: String
                call_gte: String
                call_contains: String
                call_not_contains: String
                call_starts_with: String
                call_not_starts_with: String
                call_ends_with: String
                call_not_ends_with: String

                integrate: String
                integrate_eq: String
                integrate_not: String
                integrate_in: [String!]
                integrate_not_in: [String!]
                integrate_lt: String
                integrate_lte: String
                integrate_gt: String
                integrate_gte: String
                integrate_contains: String
                integrate_not_contains: String
                integrate_starts_with: String
                integrate_not_starts_with: String
                integrate_ends_with: String
                integrate_not_ends_with: String

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

                AND: [postWhereInput!]
                OR: [postWhereInput!]
            }
        `;
    }

    @input
     public postCreateInput(): string {
        return `
            {
                user_id: Int!
                title: String!
                image: Upload
                call: String!
                integrate: String!
            }
        `;
    }

    @input
    public postUpdateInput(): string {
        return `
            {
              user_id: Int
              title: String
              image: Upload
              call: String
              integrate: String
            }
        `;
    }

    @input
    public postDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
