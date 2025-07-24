import { gql } from "apollo-angular";

export const POST_TABLE_FIELDS_FRAGMENT = gql `
    fragment PostTableFields on Post {
        id,
        title,
        views
    }
`