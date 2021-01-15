import React, { useState, useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import {Button, Col, Row} from "antd";
import dbConnect from '../utils/dbConnect'
import Plots from '../models/Plots'

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoidGFyZXFheml6MDA2NSIsImEiOiJjamNvbjQ3cnAyNXgyMzNybnlmN3p5NGFkIn0.zbs39bVfUf9ztz3AxnNTDg'
});

const Home = (props) => {
    const [mapCenter, setMapCenter] = useState([90.51465942166527, 23.84351211073789]);
    const [mapZoom, setMapZoom] = useState([14]);

    useEffect(() => {
        console.log('log-props', props);
    })

    return (
        <HomeLayout>

            <Map
                center={mapCenter}
                zoom={mapZoom}
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                attributionControl={false}
                onClick={(_, e) => {
                    var coordinates = e.lngLat;
                    console.log('log-coordinates', coordinates);
                }}
            >
            </Map>
            <div className="content-container">
                <div className="large-container">
                    <div className="large-container-inner">
                        <a><h1 className="large-title">বিক্রি করবেন?</h1></a>
                    </div>
                </div>
                <div className="content-container-inner">
                    <Row gutter={40}>
                        {
                            props.plots.map((item, index) => {
                                return (
                                    <Col key={index} xs={{span: 24}} lg={{span: 8}}>
                                        <div className="plot-content">
                                            <h2 className="plot-title">{item.plotName}</h2>
                                            <h2 className="plot-title text-disabled">{item.available}</h2>
                                            <Button
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
            </div>
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
