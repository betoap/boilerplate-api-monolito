import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class ProductQuery extends GraphqlBase {

    @type
    public mutationResponseProduct(): string {
        return `
            {
                success: [product]
                error: [productError]
            }
        `;
    }

    @type
    public productError(): string {
        return `
            {
                id: ID
                gallery_id: Int
                name: String!
                call: String!
                description: String!
                price: Int!
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public product(): string {
        return `
            {
                id: ID
                gallery(where: galleryWhereInput, order: [[String!]!], first: Int, offset: Int): galleries
                review(where: reviewWhereInput, order: [[String!]!], first: Int, offset: Int): reviews
                category(where: categoryWhereInput, order: [[String!]!], first: Int, offset: Int): categories
                relationship(where: productWhereInput, order: [[String!]!], first: Int, offset: Int): products
                tag(where: tagWhereInput, order: [[String!]!], first: Int, offset: Int): tags
                name: String!
                call: String!
                description: String!
                price: Int!
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public products(): string {
      return `
        {
          response: [product!]
          paginate: paginate
        }
    `;
    }

    @input
    public productWhereInput(): string {
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

                price: Int
                price_eq: Int
                price_not: Int
                price_in: [Int!]
                price_not_in: [Int!]
                price_lt: Int
                price_lte: Int
                price_gt: Int
                price_gte: Int
                price_contains: Int
                price_not_contains: Int
                price_starts_with: Int
                price_not_starts_with: Int
                price_ends_with: Int
                price_not_ends_with: Int

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

                AND: [productWhereInput!]
                OR: [productWhereInput!]
            }
        `;
    }

    @input
     public productCreateInput(): string {
        return `
            {
                gallery_id: Int
                name: String!
                call: String!
                description: String!
                price: Int!
                categories: [Int!]
                tags: [Int!]
                relationships: [Int!]
            }
        `;
    }

    @input
    public productUpdateInput(): string {
        return `
            {
                gallery_id: Int
                name: String
                call: String
                description: String
                price: Int
                categories: [Int!]
                tags: [Int!]
                relationships: [Int!]
            }
        `;
    }

    @input
    public productDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
