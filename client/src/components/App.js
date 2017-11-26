import React from "react"
import "./App.css"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import "antd/dist/antd.css"
import { Card } from "antd"

const to = (url, history) => (e) => {
  e.stopPropagation()
  history.push(url)
}


const App = ({ data, history }) => {
  const { loading, posts, error } = data

  if (error) {
    return <div>error: {error}</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return posts.map(post => (
    <Card
      onClick={to("/post/" + post.id, history)}
      key={post.id}
      className="post"
      title={post.title}
      style={{ minWidth: 350, maxWidth: 600 }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="post-content">
        {post.content}
      </div>

      <div onClick={to("/user/" + post.author.id, history)} className="post-author">
        by: {post.author.name} {post.author.lastName}
      </div>

    </Card>
  ))
}

const POSTS_QUERY = gql`
query allPosts {
  posts {
    id
    title
    content
    author {
      id
      name
      lastName
    }
  }
}
`
export default graphql(POSTS_QUERY)(App)
