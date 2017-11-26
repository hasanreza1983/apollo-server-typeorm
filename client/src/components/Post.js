import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { Link } from "react-router-dom"
import "./Post.css"

const Post = ({ match, data }) => {
  const { post, loading, error } = data
  if (error) return error
  if (loading) return <div>loading...</div>
  return (
    <div className="post-container">
      <div className="post-wrp">
        <div className="post-header">
          Post by {post.author.name} {post.author.lastName}:
        </div>
        <div className="post-title">Title: {post.title}</div>
      </div>
      <div className="post-body">{post.content}</div>
      <div className="post-comments">
        <div>
          <b>Latest comments: </b>
        </div>
        {post.comments.map(comment => (
          <div className="post" key={comment.id}>
            {comment.text} by{" "}
            <Link to={"/user/" + comment.user.id}>
              {comment.user.name} {comment.user.lastName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const POST_QUERY = gql`
  query postById($id: Int!) {
    post(id: $id) {
      id
      title
      content
      author {
        id
        name
        lastName
      }
      comments {
        id
        text
        user {
          id
          name
          lastName
        }
      }
    }
  }
`
export default graphql(POST_QUERY, {
  options: ({ match }) => {
    return { variables: { id: match.params.id } }
  }
})(Post)
