import React from "react"
import { Layout, Breadcrumb } from "antd"
import "./Layout.css"
import { withRouter } from "react-router-dom"
const { Content } = Layout

const LayoutContainer = ({ location, children, history }) => {
  const path = location.pathname
  const breadcrumb = path.split('/').filter(e => e.length > 0).map(e => (
    <Breadcrumb.Item key={e}>{e}</Breadcrumb.Item>
  ))
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 10px" }}>
        <Breadcrumb style={{ margin: "16px 30px" }}>
          <Breadcrumb.Item
            className="home-link"
            onClick={() => history.push("/")}
          >
            Home
          </Breadcrumb.Item>
          {breadcrumb}
        </Breadcrumb>
        <div className="content" style={{ padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
    </Layout>
  )
}

export default withRouter(LayoutContainer)
