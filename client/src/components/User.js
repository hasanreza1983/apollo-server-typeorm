import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import "./User.css"
import { Link } from "react-router-dom"

const User = ({ match, data }) => {
  const { user, loading, error } = data
  if (error) {
    return error
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div className="user-container">
      <div className="user-wrp">
        <div className="user-header">User:</div>
        <div className="user-name">
          {user.name} {user.lastName}
        </div>
      </div>
      <div className="comments-container">
        <div className="comments-header">
          <b>
            {user.name} {user.lastName} latest comments:
          </b>
        </div>
        {user.comments.map(comment => (
          <div className="comment" key={comment.id}>
            "{comment.text}" on {comment.post.author.name}{" "}
            {comment.post.author.lastName}'s post
          </div>
        ))}
      </div>
      <div className="posts-container">
        <div className="post-header">
          <b>
            {user.name} {user.lastName} latest posts:
          </b>
        </div>
        {user.posts.map(post => (
          <div>
          <Link to={`/post/${post.id}`} className="post" key={post.id}>
            {post.title}
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const USER_QUERY = gql`
  query userById($id: Int!) {
    user(id: $id) {
      id
      name
      lastName
      posts {
        id
        title
      }
      comments {
        id
        text
        post {
          id
          author {
            id
            name
            lastName
          }
        }
      }
    }
  }
`
export default graphql(USER_QUERY, {
  options: ({ match }) => {
    return { variables: { id: match.params.id } }
  }
})(User)
