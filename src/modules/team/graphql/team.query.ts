import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../core/graphql/graphql';

export class TeamQuery extends GraphqlBase {

    @type
    public mutationResponseTeam(): string {
        return `
            {
                success: [team]
                error: [teamError]
            }
        `;
    }

    @type
    public teamError(): string {
        return `
            {
                id: ID
                name: String!
                role: String
                description: String
                photo: String!
                facebook: String
                twitter: String
                linkedin: String
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public team(): string {
        return `
            {
                id: ID
                name: String!
                role: String!
                description: String
                photo: String
                facebook: String
                twitter: String
                linkedin: String
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public teams(): string {
      return `
        {
          response: [team!]
          paginate: paginate
        }
    `;
    }

    @input
    public teamWhereInput(): string {
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

                role: String
                role_eq: String
                role_not: String
                role_in: [String!]
                role_not_in: [String!]
                role_lt: String
                role_lte: String
                role_gt: String
                role_gte: String
                role_contains: String
                role_not_contains: String
                role_starts_with: String
                role_not_starts_with: String
                role_ends_with: String
                role_not_ends_with: String

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

                photo: Upload
                photo_eq: Upload
                photo_not: Upload
                photo_in: [Upload!]
                photo_not_in: [Upload!]
                photo_lt: Upload
                photo_lte: Upload
                photo_gt: Upload
                photo_gte: Upload
                photo_contains: Upload
                photo_not_contains: Upload
                photo_starts_with: Upload
                photo_not_starts_with: Upload
                photo_ends_with: Upload
                photo_not_ends_with: Upload

                facebook: String
                facebook_eq: String
                facebook_not: String
                facebook_in: [String!]
                facebook_not_in: [String!]
                facebook_lt: String
                facebook_lte: String
                facebook_gt: String
                facebook_gte: String
                facebook_contains: String
                facebook_not_contains: String
                facebook_starts_with: String
                facebook_not_starts_with: String
                facebook_ends_with: String
                facebook_not_ends_with: String

                twitter: String
                twitter_eq: String
                twitter_not: String
                twitter_in: [String!]
                twitter_not_in: [String!]
                twitter_lt: String
                twitter_lte: String
                twitter_gt: String
                twitter_gte: String
                twitter_contains: String
                twitter_not_contains: String
                twitter_starts_with: String
                twitter_not_starts_with: String
                twitter_ends_with: String
                twitter_not_ends_with: String

                linkedin: String
                linkedin_eq: String
                linkedin_not: String
                linkedin_in: [String!]
                linkedin_not_in: [String!]
                linkedin_lt: String
                linkedin_lte: String
                linkedin_gt: String
                linkedin_gte: String
                linkedin_contains: String
                linkedin_not_contains: String
                linkedin_starts_with: String
                linkedin_not_starts_with: String
                linkedin_ends_with: String
                linkedin_not_ends_with: String

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

                AND: [teamWhereInput!]
                OR: [teamWhereInput!]
            }
        `;
    }

    @input
     public teamCreateInput(): string {
        return `
            {
                name: String!
                role: String!
                description: String
                photo: Upload
                facebook: String
                twitter: String
                linkedin: String
            }
        `;
    }

    @input
    public teamUpdateInput(): string {
        return `
          {
            name: String
            role: String
            description: String
            photo: Upload
            facebook: String
            twitter: String
            linkedin: String
          }
        `;
    }

    @input
    public teamDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
