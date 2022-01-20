import {
    type,
    input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../../core/graphql/graphql';

export class PrivilegeQuery extends GraphqlBase {

    @type
    public mutationResponsePrivilege(): string {
        return `
            {
                success: [privilege]
                error: [privilegeError]
            }
        `;
    }

    @type
    public privilegeError(): string {
        return `
            {
                id: ID
                name: String!
                permission: String!
                role_id: Int!
                resource_id: Int!
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
    }

    @type
    public privilege(): string {
        return `
            {
                id: ID
                name: String!
                permission: String!
                role: role
                resource: resources
                createdAt: String
                updatedAt: String
            }
        `;
    }

    @type
    public privileges(): string {
      return `
        {
          response: [privilege!]
          paginate: paginate
        }
    `;
    }

    @input
    public privilegeWhereInput(): string {
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

                permission: String
                permission_eq: String
                permission_not: String
                permission_in: [String!]
                permission_not_in: [String!]
                permission_lt: String
                permission_lte: String
                permission_gt: String
                permission_gte: String
                permission_contains: String
                permission_not_contains: String
                permission_starts_with: String
                permission_not_starts_with: String
                permission_ends_with: String
                permission_not_ends_with: String

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

                AND: [privilegeWhereInput!]
                OR: [privilegeWhereInput!]
            }
        `;
    }

    @input
     public privilegeCreateInput(): string {
        return `
            {
                name: String!
                permission: String!
                role_id: Int!
                resource_id: Int!
            }
        `;
    }

    @input
    public privilegeUpdateInput(): string {
        return `
            {
                name_id: Int
                permission_id: Int
                role_id: Int
                resource_id: Int
            }
        `;
    }

    @input
    public privilegeDeleteInput(): string {
        return `
            {
                id: ID!
            }
        `;
    }
}
