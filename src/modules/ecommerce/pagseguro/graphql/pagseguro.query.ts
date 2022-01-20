import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class PagseguroQuery extends GraphqlBase {

    @type
    public mutationResponsePagseguro(): string {
        return `
            {
                success: [pagseguro]
                error: [pagseguroError]
            }
        `;
    }

    @type
    public pagseguroError(): string {
        return `
            {
                id: ID
                status: String!
                description: String
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public pagseguro(): string {
        return `
            {
                id: ID
                status: String!
                description: String
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @input
    public pagseguroWhereInput(): string {
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

                status: String
                status_eq: String
                status_not: String
                status_in: [String!]
                status_not_in: [String!]
                status_lt: String
                status_lte: String
                status_gt: String
                status_gte: String
                status_contains: String
                status_not_contains: String
                status_starts_with: String
                status_not_starts_with: String
                status_ends_with: String
                status_not_ends_with: String

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

                AND: [pagseguroWhereInput!]
                OR: [pagseguroWhereInput!]
            }
        `;
    }

    @input
     public pagseguroCreateInput(): string {
        return `
            {
              id: String
              description: String
              price: String
              quantity: Int
              weight: Int
            }
        `;
    }

    @input
    public pagseguroUpdateInput(): string {
        return `
            {
                status_id: Int
                description_id: Int
            }
        `;
    }

    @input
    public pagseguroDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
