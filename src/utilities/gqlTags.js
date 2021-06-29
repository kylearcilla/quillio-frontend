import { gql } from '@apollo/client'
// gql mutations and queries used throughout the app

export const GET_USERS_QUERY = gql`
  query getUsers {
        getUsers {
        id
        name
        username
        houseName
        profileImageURL
        bio
        followers {
           username
        }
        following {
           username
        }
    }
}
`
export const LIKE_POST_MUTATION = gql`
   mutation likePost ($postId: ID!) {
     likePost (postId: $postId) {
        id
        likes {
           username
        }
        dislikes {
           username
        }
        likeCount
        dislikeCount
     }
   }
`
export const DISLIKE_POST_MUTATION = gql`
   mutation dislikePost ($postId: ID!) {
     dislikePost (postId: $postId) {
        id
        likes {
           username
        }
        dislikes {
           username
        }
        likeCount
        dislikeCount
       }
   }
`
export const FOLLOW_USER_MUTATION = gql`
   mutation followClicked ($userId: ID!) {
      followClicked (userId: $userId) {
         profileImageURL
         following {
            id
            profileImageURL
            name
            username
            houseName
         }
         followers  {
            id
            profileImageURL
            name
            username
            houseName
         }
         followerCount
         followingCount
       }
   }
`
export const LOGIN_USER_MUTATION = gql`
    mutation login ($username: String! $password: String!) {
      login (username: $username password: $password) {
         id
         profileImageURL
         email
         token
         name
         username
         createdAt
         houseName
         location
         bio
         bannerURL
         following {
            id
            name
            username
            houseName
            profileImageURL
         }
         followers {
            id
            name
            username
            houseName
            profileImageURL
         }
         followerCount
         followingCount
      }
    }
`
export const GET_POSTS_QUERY = gql`
   query getPosts {
     getPosts {
      id
      userInfo {
        userId
        name
        username
        houseName
        profileImageURL
      }
      body
      imageURL
      createdAt
      likes {
          username
      }
      dislikes {
         username
      }
      comments {
         userInfo {
            username
         }
      }
      likeCount
      dislikeCount
      commentCount
   }
}
`
export const GET_POST_QUERY = gql`
query getPost($postId: ID!) {
  getPost(postId: $postId) {
    id
    userInfo {
      userId
      name
      username
      houseName
      profileImageURL
    }
    body
    imageURL
    createdAt
    likes {
      username
    }
    dislikes {
      username
    }
    comments {
      id
      userInfo {
        userId
        name
        username
        profileImageURL
        houseName
      }
      createdAt
      body
      likes {
        username
      }
      dislikes {
        username
      }
      likeCount
      dislikeCount
    }
    likeCount
    dislikeCount
    commentCount
  }
}
`
export const REGISTER_USER_MUTATION = gql`
mutation register (
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
  register (
      registerInput: {
         name: $name
         username: $username
         email: $email
         password: $password
         confirmPassword: $confirmPassword
      }
   ) {
     id
     profileImageURL
     email
     token
     name
     username
     location
     createdAt
     bio
     bannerURL
     following {
       id
       name
       username
       houseName
       profileImageURL
     }
     followers {
      id
      name
      username
      houseName
      profileImageURL
     }
     followerCount
     followingCount
  }
}
`
export const UPLOAD_POST_MUTATION = gql`
mutation createPost ( $body: String! $imageURL: String) {
  createPost (body: $body imageURL: $imageURL ) {
   id
    userInfo {
      userId
      name
      username
      houseName
      profileImageURL
    }
    body
    imageURL
    createdAt
    likes {
      username
    }
    dislikes {
      username
    }
    comments {
      id
      userInfo {
        userId
        name
        username
        profileImageURL
        houseName
      }
      createdAt
      body
      likes {
        username
      }
      dislikes {
        username
      }
      likeCount
      dislikeCount
    }
    likeCount
    dislikeCount
    commentCount
  }
}
`
export const DELETE_POST_MUTATION = gql`
    mutation deletePost ($postId: ID!) {
       deletePost (postId: $postId) 
    }
`
export const GET_USER_MUTATION = gql`
   mutation getUser($userId: ID!) {
      getUser(userId: $userId) {
         id
         profileImageURL
         email
         name
         houseName
         location
         username
         createdAt
         bio
         bannerURL
         following {
            id
            name
            username
            houseName
            profileImageURL
            bio
         }
         followers {
            id
            name
            username
            houseName
            profileImageURL
            bio
         }
         followerCount
         followingCount
     }
}
`
export const GET_USER_POSTS_QUERY = gql`
    query getUserPosts ($userId: ID!) {
      getUserPosts (userId: $userId) {
         id
         userInfo {
         userId
         name
         username
         houseName
         profileImageURL
         }
         body
         imageURL
         createdAt
         likes {
            username
         }
         dislikes {
            username
         }
         comments {
            userInfo {
               username
            }
         }
         likeCount
         dislikeCount
         commentCount
         }
    }
`
export const GET_USER_LIKED_POSTS_QUERY = gql`
    query getUserLikedPosts ($userId: ID!) {
      getUserLikedPosts (userId: $userId) {
         id
         userInfo {
         userId
         name
         username
         houseName
         profileImageURL
         }
         body
         imageURL
         createdAt
         likes {
            username
         }
         dislikes {
            username
         }
         comments {
            userInfo {
               username
            }
         }
         likeCount
         dislikeCount
         commentCount
         }
    }
`
export const UPDATE_USER_INFO_MUTATION = gql`
    mutation updateProfileDetails (
      $houseName: String
      $location: String
      $bio: String
      $profileImageURL: String
      $bannerURL: String
    ) {
      updateProfileDetails (
         editProfileInput: {
            houseName: $houseName
            location: $location
            bio: $bio
            profileImageURL: $profileImageURL
            bannerURL: $bannerURL
         }
      ) {
         id
         profileImageURL
         email
         name
         houseName
         location
         username
         createdAt
         bio
         bannerURL
         following {
            id
            name
            username
            houseName
            profileImageURL
            bio
         }
         followers {
            id
            name
            username
            houseName
            profileImageURL
            bio
         }
         followerCount
         followingCount
      }
    }
`
export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!) {
       createComment(postId: $postId, body: $body) {
         id
    comments {
      id
      userInfo {
        userId
        name
        username
        profileImageURL
      }
      createdAt
      body
      likes {
        username
      }
      dislikes {
        username
      }
      likeCount
      dislikeCount
    }
    commentCount
       }
    }
`
export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
       deleteComment(postId: $postId, commentId: $commentId) {
         id
         comments {
         id
         userInfo {
            userId
            name
            username
            profileImageURL
         }
         createdAt
         body
         likes {
            username
         }
         dislikes {
            username
         }
         likeCount
         dislikeCount
         }
         commentCount
       }
    }
`
export const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment($postId: ID!, $commentId: ID!) {
       likeComment(postId: $postId, commentId: $commentId) {
         id
         comments {
         id
         userInfo {
            userId
            name
            username
            profileImageURL
         }
         createdAt
         body
         likes {
            username
         }
         dislikes {
            username
         }
         likeCount
         dislikeCount
         }
         commentCount
       }
    }
`
export const DISLIKE_COMMENT_MUTATION = gql`
    mutation dislikeComment($postId: ID!, $commentId: ID!) {
       dislikeComment(postId: $postId, commentId: $commentId) {
         id
         comments {
         id
         userInfo {
            userId
            name
            username
            profileImageURL
         }
         createdAt
         body
         likes {
            username
         }
         dislikes {
            username
         }
         likeCount
         dislikeCount
         }
         commentCount
       }
    }
`
export const DELETE_USER_MUTATION = gql`
   mutation {
      deleteUser 
   }
`
export const GET_FOLLOWING_POSTS_QUERY = gql`
   query getFollowingPosts {
      getFollowingPosts {
      id
      userInfo {
        userId
        name
        username
        houseName
        profileImageURL
      }
      body
      imageURL
      createdAt
      likes {
          username
      }
      dislikes {
         username
      }
      comments {
         userInfo {
            username
         }
      }
      likeCount
      dislikeCount
      commentCount
   }
}
`