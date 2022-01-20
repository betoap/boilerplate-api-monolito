import {
  type,
  input
} from 'graphql-query-mutation/annotations';

import { GraphqlBase } from './../../../core/graphql/graphql';

export class UserQuery extends GraphqlBase {

  @type
  public mutationResponseUser(): string {
    return `
          {
            success: [user]
            error: [userError]
            token: token
          }
      `;
  }

  @type
  public userError(): string {
    return `
            {
                id: ID
                name: String!
                email: String!
                password: String!
                sex: String!
                age: Date!
                is_active: Boolean
                createdAt: String
                updatedAt: String
                error: String
            }
        `;
  }

  @type
  public user(): string {
    return `
            {
                id: ID
                name: String!
                email: String!
                password: String!
                photo: String
                role: role!
                sex: String!
                age: Date!
                is_active: Boolean
                createdAt: String
                updatedAt: String
            }
        `;
  }

  @type
  public users(): string {
    return `
        {
          response: [user!]
          paginate: paginate
        }
    `;
  }

  @input
  public loginInput(): string {
    return `
        {
          email: String
          email_eq: String

          password: String
          password_eq: String
        }
      `;
  }

  @input
  public userWhereInput(): string {
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

      email: String
      email_eq: String
      email_not: String
      email_in: [String!]
      email_not_in: [String!]
      email_lt: String
      email_lte: String
      email_gt: String
      email_gte: String
      email_contains: String
      email_not_contains: String
      email_starts_with: String
      email_not_starts_with: String
      email_ends_with: String
      email_not_ends_with: String

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

      password: String
      password_eq: String
      password_not: String
      password_in: [String!]
      password_not_in: [String!]
      password_lt: String
      password_lte: String
      password_gt: String
      password_gte: String
      password_contains: String
      password_not_contains: String
      password_starts_with: String
      password_not_starts_with: String
      password_ends_with: String
      password_not_ends_with: String

      sex: String
      sex_eq: String
      sex_not: String
      sex_in: [String!]
      sex_not_in: [String!]
      sex_lt: String
      sex_lte: String
      sex_gt: String
      sex_gte: String
      sex_contains: String
      sex_not_contains: String
      sex_starts_with: String
      sex_not_starts_with: String
      sex_ends_with: String
      sex_not_ends_with: String

      age: Date
      age_eq: Date
      age_not: Date
      age_in: [Date!]
      age_not_in: [Date!]
      age_lt: Date
      age_lte: Date
      age_gt: Date
      age_gte: Date
      age_contains: Date
      age_not_contains: Date
      age_starts_with: Date
      age_not_starts_with: Date
      age_ends_with: Date
      age_not_ends_with: Date

      is_active: Boolean
      is_active_eq: Boolean
      is_active_not: Boolean
      is_active_in: [Boolean!]
      is_active_not_in: [Boolean!]
      is_active_lt: Boolean
      is_active_lte: Boolean
      is_active_gt: Boolean
      is_active_gte: Boolean
      is_active_contains: Boolean
      is_active_not_contains: Boolean
      is_active_starts_with: Boolean
      is_active_not_starts_with: Boolean
      is_active_ends_with: Boolean
      is_active_not_ends_with: Boolean

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

      AND: [userWhereInput!]
      OR: [userWhereInput!]
    }
  `;
  }

  @input
  public userCreateInput(): string {
    return `
        {
          name: String!
          email: String!
          password: String!
          photo: String
          sex: String!
          age: Date!
          role_id: Int
          is_active: Boolean
        }
    `;
  }

  @input
  public userUpdateInput(): string {
    return `
        {
          name: String
          email: String
          password: String
          sex: String
          age: Date
          is_active: Boolean
        }
    `;
  }

  @input
  public userDeleteInput(): string {
    return `
            {
                id: ID!
            }
        `;
  }
}
