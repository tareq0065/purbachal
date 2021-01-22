import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/AdminLayout";
import {Col, Row, Form, Input, Button, Switch, Table, Modal} from "antd";
import useSWR from "swr";
import {postData, deleteData} from "../../utils/helpers";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const fetcher = url => fetch(url).then(res => res.json());

const ViewRequests = (props) => {
    const { data, error } = useSWR(
        "/api/plots",
        fetcher,
        { refreshInterval: 2000 }
    );

    const columns = [
        {
            title: 'Plot Name',
            dataIndex: 'plotName',
            key: 'plotName'
        },
        {
            title: 'Available',
            dataIndex: 'available',
            key: 'available'
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            render: (text, record) => {
                return <span>{text ? 'Available' : 'Not Available'}</span>
            }
        },
    ];

    return (
        <AdminLayout {...props}>
            <Row gutter={10}>
                <Col xs={{span: 24}} lg={{span: 24}}>
                    <Table
                        size="small"
                        loading={!data && !error}
                        columns={columns}
                        dataSource={data && data.data}
                        rowKey={record => record._id}
                    />
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default ViewRequests;
