import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from "next/link";
const { Header, Content, Footer } = Layout;
import { NextSeo } from 'next-seo'

const HomeLayout = (props) => {
    return (
        <Layout>
            <NextSeo
                title={props.title ? props.title : "purbachalplot"}
                description={props.description ? props.description : "purbachalplot"}
                canonical="https://purbachalplot.com/"
                openGraph={{
                    url: 'https://purbachalplot.com/',
                    title: props.title ? props.title : "",
                    description: props.description ? props.description : "purbachalplot",
                    images: [
                        {
                            url: 'https://purbachalplot.com/og.png',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: 'https://purbachalplot.com/og.png',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        }
                    ],
                }}
            />
            <Header className="header">
                <div className="home-logo">
                    <h1 className="logo text-disabled">PURBACHAL PLOT</h1>
                    <h4 className="tagline text-disabled">FOR SALE</h4>
                </div>
            </Header>
            <Content className="site-layout">
                {props.children}
            </Content>
            <div className="footer">
                <div className="footer-menu">
                    <Link href="/"><a>Home</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/terms"><a>Terms of use</a></Link>
                    <Link href="/privacy"><a>Privacy & policy</a></Link>
                </div>
            </div>
        </Layout>
    )
}

export default HomeLayout;
