import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
const HomeLayout = (props) => {
    return (
        <Layout>
            <Header className="header">
                <h1 className="logo text-disabled">পূর্বাচল প্লট</h1>
                <h4 className="tagline text-disabled">ক্রয়-বিক্রয়</h4>
            </Header>
            <Content className="site-layout">
                {props.children}
            </Content>
        </Layout>
    )
}

export default HomeLayout;
