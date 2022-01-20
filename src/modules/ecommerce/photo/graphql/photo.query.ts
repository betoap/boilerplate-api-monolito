import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class PhotoQuery extends GraphqlBase {

    @type
    public mutationResponsePhoto(): string {
        return `
            {
                success: [photo]
                error: [photoError]
            }
        `;
    }

    @type
    public photoError(): string {
        return `
            {
                id: ID
                gallery_id: Int
                photo: String!
                cover_is: Boolean
                gallery: gallery
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public photo(): string {
        return `
            {
                id: ID
                gallery(where: galleryWhereInput, order: [[String!]!], first: Int, offset: Int): galleries
                photo: String!
                cover_is: Boolean
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public photos(): string {
      return `
        {
          response: [photo!]
          paginate: paginate
        }
    `;
    }

    @input
    public photoWhereInput(): string {
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

                gallery_id: Int
                gallery_id_eq: Int
                gallery_id_not: Int
                gallery_id_in: [Int!]
                gallery_id_not_in: [Int!]
                gallery_id_lt: Int
                gallery_id_lte: Int
                gallery_id_gt: Int
                gallery_id_gte: Int
                gallery_id_contains: Int
                gallery_id_not_contains: Int
                gallery_id_starts_with: Int
                gallery_id_not_starts_with: Int
                gallery_id_ends_with: Int
                gallery_id_not_ends_with: Int

                photo: String
                photo_eq: String
                photo_not: String
                photo_in: [String!]
                photo_not_in: [String!]
                photo_lt: String
                photo_lte: String
                photo_gt: String
                photo_gte: String
                photo_contains: String
                photo_not_contains: String
                photo_starts_with: String
                photo_not_starts_with: String
                photo_ends_with: String
                photo_not_ends_with: String

                cover_is: Boolean
                cover_is_eq: Boolean
                cover_is_not: Boolean
                cover_is_in: [Boolean!]
                cover_is_not_in: [Boolean!]
                cover_is_lt: Boolean
                cover_is_lte: Boolean
                cover_is_gt: Boolean
                cover_is_gte: Boolean
                cover_is_contains: Boolean
                cover_is_not_contains: Boolean
                cover_is_starts_with: Boolean
                cover_is_not_starts_with: Boolean
                cover_is_ends_with: Boolean
                cover_is_not_ends_with: Boolean

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

                AND: [photoWhereInput!]
                OR: [photoWhereInput!]
            }
        `;
    }

    @input
     public photoCreateInput(): string {
        return `
            {
                gallery_id: Int
                photo: String!
                cover_is: Boolean
            }
        `;
    }

    @input
    public photoUpdateInput(): string {
        return `
            {
                gallery_id: Int
                photo: String
                cover_is: Boolean
            }
        `;
    }

    @input
    public photoDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
