import React from 'react';
import { Helmet } from 'react-helmet-async';

export const BrandedHeadContent = () => {
  return (
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={require('../assets/brand/apple-touch-icon.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={require('../assets/brand/favicon-32x32.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={require('../assets/brand/favicon-16x16.png')}
      />
      {/*<link rel="manifest" href="XXX/site.webmanifest" />*/}
      <link
        rel="mask-icon"
        href={require('../assets/brand/safari-pinned-tab.svg')}
        color="#0a0923"
      />
      <link rel="shortcut icon" href={require('../assets/brand/favicon.ico')} />
      <meta name="msapplication-TileColor" content="#da532c" />
      {/*<meta name="msapplication-config" content="XXX/browserconfig.xml" />*/}
      <meta name="theme-color" content="#da532c" />
    </Helmet>
  );
};
