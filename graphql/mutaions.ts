import { gql } from '@apollo/client';

// this is for front end

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $body: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $body
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      # if error, return this
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
