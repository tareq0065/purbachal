import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from "next/link";
const { Header, Content, Footer } = Layout;
const HomeLayout = (props) => {
    return (
        <Layout>
            <Header className="header">
                <div className="home-logo">
                    <h1 className="logo text-disabled">পূর্বাচল প্লট</h1>
                    <h4 className="tagline text-disabled">ক্রয়-বিক্রয়</h4>
                </div>
            </Header>
            <Content className="site-layout">
                {props.children}
            </Content>
            <div className="footer">
                <div className="footer-menu">
                    <Link href="about"><a>About</a></Link>
                    <Link href="terms"><a>Terms of use</a></Link>
                    <Link href="privacy"><a>Privacy & policy</a></Link>
                </div>
            </div>
        </Layout>
    )
}

export default HomeLayout;
