import React, {useEffect} from "react";
import { Layout, Menu, Spin } from 'antd';
import {useLocalStorage} from "../utils/useLocalstorage";
import Link from "next/link";
import { useRouter } from 'next/router';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = (props) => {
    const router = useRouter();
    const [currentUser] = useLocalStorage("currentUser");

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    backgroundColor: "#fff"
                }}
            >
                <div className="admin-header-logo" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={[router.pathname.split("/").pop()]}>
                    <Menu.Item key="dashboard">
                        <Link href="/admin/dashboard">
                            <a>
                                Dashboard
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="view_requests">
                        <Link href="/admin/view_requests">
                            <a>
                                View Requests
                            </a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="admin-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="admin-layout-background" style={{ padding: 14, }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright ©2021</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;
