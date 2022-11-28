import { gql } from "@apollo/client";

export const Posts = gql`
  query Posts {
    Posts {
      id
      title
      imgUrl
      categoryId
      Category {
        name
      }
    }
  }
`;

export const Post = gql`
  query Post($postId: ID) {
    Post(postId: $postId) {
      title
      content
      imgUrl
      Category {
        id
        name
      }
      User {
        email
      }
    }
  }
`;

export const Categories = gql`
  query Categories {
    Categories {
      name
      id
    }
  }
`;

export const PostByCategory = gql`
query PostByCategory($categoryId: ID) {
  PostByCategory(categoryId: $categoryId) {
    id
    title
    imgUrl
  }
}
`;

