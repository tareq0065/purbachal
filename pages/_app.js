import React from "react";
import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/vars.css';
import '../styles/global.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </>
    )
}
