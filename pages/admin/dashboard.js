import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/AdminLayout";
import {Col, Row, Form, Input, Button, Switch, Table, Modal} from "antd";
import useSWR from "swr";
import {postData, deleteData} from "../../utils/helpers";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const fetcher = url => fetch(url).then(res => res.json());

const Dashboard = (props) => {
    const { data, error } = useSWR(
        "/api/plots",
        fetcher,
        { refreshInterval: 2000 }
    );
    const [form] = Form.useForm();
    const [single, setSingle] = useState(false);

    const onFinish = (values) => {
        postData('plots', values)
            .then((resp) => {
                if (resp.success) {
                    Modal.success({
                        title: 'Success',
                        content: "Plot successfully added.",
                    });
                    form.resetFields();
                }
                else {
                    Modal.error({
                        title: 'Success',
                        content: "Cannot add plot now.",
                    });
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        size="small"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSingle(record);
                            form.setFieldsValue({
                                plotName: record.plotName,
                                available: record.available,
                                availability: record.availability,
                            })
                        }}
                    />
                    <Button
                        size="small"
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Do you want to delete this product?',
                                content: 'You cannot retrieve once you deleted.',
                                onOk() {
                                    deleteData(`plots/${record._id}`)
                                        .then((resp) => {
                                            console.log('log-resp', resp);
                                            if (resp.success) {
                                                Modal.success({
                                                    title: 'Success',
                                                    content: "Plot successfully deleted.",
                                                });
                                            }
                                            else {
                                                Modal.error({
                                                    title: 'Error',
                                                    content: "Cannot delete plot now.",
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
                <Col xs={{span: 24}} lg={{span: 6}}>
                    <Form
                        form={form}
                        layout="vertical"
                        name="create_plot"
                        initialValues={{
                            availability: true
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Plot Name"
                            name="plotName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input plot name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Available"
                            name="available"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input available plots(example: 2 plots)!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Availability"
                            name="availability"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                {single ? "Update Plot" : "Save Plot"}
                            </Button>
                            {
                                single &&
                                <Button block type="danger"
                                        onClick={() => {
                                            setSingle(false);
                                            form.resetFields();
                                        }}
                                >
                                    Cancel
                                </Button>
                            }
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={{span: 24}} lg={{span: 18}}>
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

export default Dashboard;
