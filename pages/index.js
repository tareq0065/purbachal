import React, { useState, useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import {Button, Col, Modal, Row, Form, Input} from "antd";
import dbConnect from '../utils/dbConnect';
import Plots from '../models/Plots';
import {postData} from "../utils/helpers";

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoidGFyZXFheml6MDA2NSIsImEiOiJjamNvbjQ3cnAyNXgyMzNybnlmN3p5NGFkIn0.zbs39bVfUf9ztz3AxnNTDg'
});

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 24,
    },
};

const Home = (props) => {
    const [mapCenter, setMapCenter] = useState([90.51465942166527, 23.84351211073789]);
    const [mapZoom, setMapZoom] = useState([14]);
    const [sellModal, setSellModal] = useState(false);
    const [viewNumber, setViewNumber] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        postData('sales', values)
            .then((resp) => {
                if (resp.success) {
                    form.resetFields();
                    setSellModal(false);
                    Modal.success({
                        title: 'Success',
                        content: "Thanks for submitting your valuable information. We will contact with you soon.",
                    });
                }
                else {
                    Modal.error({
                        title: 'Success',
                        content: "Cannot submit you information now.",
                    });
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <HomeLayout
            title="Rajuk Purbachal Plot Dhaka Bangladesh"
            description="Trusted Rajuk Purbachal Plot Manager in Dhaka Bangladesh. Buy Sale Your Rajuk Purbachal New Town Plot with Best Price"
        >
            <Map
                center={mapCenter}
                zoom={mapZoom}
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '94vh',
                    width: '100vw'
                }}
                attributionControl={false}
                onClick={(_, e) => {
                    var coordinates = e.lngLat;
                    console.log('log-coordinates', coordinates);
                }}
            >
            </Map>
            <Modal
                title="Required Information for Sale"
                visible={sellModal}
                onCancel={() => {
                    setSellModal(false);
                }}
                footer={null}
            >
                <div className="text-center">
                    <h3>Rajuk Purbachal Plot</h3>
                    <p>Required Information for Sale</p>
                </div>
                <Form
                    {...layout}
                    form={form}
                    name="collect_sell_data"
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Owner Name"
                        name="ownerName"
                        rules={[
                            {
                                required: true,
                                message: 'Please type owner name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please type category!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sector No."
                        name="sectorNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please type sector no.!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Road No."
                        name="roadNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please type road no.!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Plot No."
                        name="plotNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please type plot no.!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Plot Size (Katha)"
                        name="plotSize"
                        rules={[
                            {
                                required: true,
                                message: 'Please type plot size in katha!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price (BDT)"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please type plot price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contact No."
                        name="contactNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please type contact no!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <p className="text-center">
                        Please Submit.<br/>
                        We'll get back to you soon.
                    </p>

                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="content-container">
                <div className="content-container-inner">
                    <Row gutter={40}>
                        {
                            props.plots.map((item, index) => {
                                return (
                                    <Col key={index} xs={{span: 12}} lg={{span: 12}}>
                                        <div className="plot-content">
                                            <h2 className="plot-title">{item.plotName}</h2>
                                            <h2 className="plot-title text-disabled">{item.available}</h2>
                                            <Button
                                                className="cta-mobile-hide"
                                                type="primary"
                                                disabled={!item.availability}
                                                block
                                                onClick={() => {
                                                    setViewNumber(index === viewNumber ? false : index);
                                                }}
                                            >
                                                {
                                                    (viewNumber === index) ? "01713518167" : item.availability ? "Available" : "Not Available"
                                                }
                                            </Button>

                                            <Button
                                                className="cta-desktop-hide"
                                                href="tel:01713518167"
                                                type="primary"
                                                disabled={!item.availability}
                                                block
                                            >
                                                {item.availability ? "Available" : "Not Available"}
                                            </Button>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <div className="large-container">
                    <div className="large-container-inner">
                        <a
                            onClick={() => {
                                setSellModal(true);
                            }}
                        ><h1 className="large-title">+ Add Property</h1></a>
                    </div>
                </div>
            </div>
            <a
                className="info-button"
                onClick={() => {
                    Modal.info({
                        title: null,
                        content: <p style={{fontSize: 20}}>প্রিয় মহোদয়, আমরা দেড় দশকের অভিজ্ঞ ও বিশ্বস্ত। প্লট ক্রয়-বিক্রয় সংক্রান্ত সরাসরি যোগাযোগ: বাড়ী ০৯, রোড ০১, সেক্টর ০৬, উত্তরা, ঢাকা-১২৩০। মোবাইল: ০১৭১৩৫১৮১৬৭</p>,
                    });
                }}
            >
                Info
            </a>
        </HomeLayout>
    )
}

/* Retrieves plot(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await Plots.find({});
    const plots = result.map((doc) => {
        const plot = doc.toObject()
        plot._id = plot._id.toString();
        plot.createdAt = plot.createdAt.toString();
        plot.updatedAt = plot.updatedAt.toString();
        return plot
    });

    return { props: { plots: plots } }
}

export default Home;
