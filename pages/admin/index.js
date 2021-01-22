import React, {useEffect} from "react";
import { Button, Modal, Form, Input, Radio } from 'antd';
import {useLocalStorage} from "../../utils/useLocalstorage";
import {postData} from "../../utils/helpers";

const Admin = (props) => {
    const [currentUser, setCurrentUser] = useLocalStorage("currentUser", false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentUser) {
            window.location = '/admin/dashboard';
        }
    }, []);

    const onFinish = async (values) => {
        postData('user/login', values)
            .then((resp) => {
                if (resp.success && resp.data.userType === 'admin') {
                    setCurrentUser(JSON.stringify({
                        _id: resp.data._id,
                        userType: resp.data.userType,
                        username: resp.data.username,
                    }));
                    window.location = '/admin/dashboard';
                }
                else {
                    Modal.error({
                        title: 'Sorry',
                        content: "Username or password doesn't match.",
                    });
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            visible={true}
            closable={false}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                name="login_form"
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Admin;
