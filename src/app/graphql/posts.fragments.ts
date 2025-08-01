import { gql } from "apollo-angular";

export const POST_TABLE_FIELDS_FRAGMENT = gql `
    fragment PostTableFields on Post {
        id,
        title,
        views
    }
`

export const POST_TABLE_FIELDS_FRAGMENTS = gql `
    fragment PostTableFieldsComplete on Post {
        id,
        title,
        views,
        comment
    }
`