import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/AdminLayout";
import {Col, Row, Button, Table, Modal} from "antd";
import useSWR from "swr";
import {postData, deleteData} from "../../utils/helpers";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const fetcher = url => fetch(url).then(res => res.json());

const ViewRequests = (props) => {
    const { data, error } = useSWR(
        "/api/sales",
        fetcher,
        { refreshInterval: 2000 }
    );

    const columns = [
        {
            title: 'Owner Name',
            dataIndex: 'ownerName',
            key: 'ownerName'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
            key: 'contactNo'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        size="small"
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Do you want to delete this product?',
                                content: 'You cannot retrieve once you deleted.',
                                onOk() {
                                    deleteData(`sales/${record._id}`)
                                        .then((resp) => {
                                            if (resp.success) {
                                                Modal.success({
                                                    title: 'Success',
                                                    content: "Sales successfully deleted.",
                                                });
                                            }
                                            else {
                                                Modal.error({
                                                    title: 'Error',
                                                    content: "Cannot delete sales now.",
                                                });
                                            }
                                        })
                                },
                                onCancel() {
                                },
                            });
                        }}
                    />
                </>
            ),
        },
    ];

    return (
        <AdminLayout {...props}>
            <Row gutter={10}>
                <Col xs={{span: 24}} lg={{span: 24}}>
                    <Table
                        size="small"
                        expandable={{
                            expandedRowRender: record => {
                                return (
                                    <p>
                                        Owner Name: {record.ownerName}<br/>
                                        Category: {record.category}<br/>
                                        Sector No: {record.sectorNo}<br/>
                                        Road No: {record.roadNo}<br/>
                                        Plot No: {record.plotNo}<br/>
                                        Plot Size: {record.plotSize}<br/>
                                        Price: {record.price}<br/>
                                        Contact No: {record.contactNo}<br/>
                                    </p>
                                )
                            },
                        }}
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
