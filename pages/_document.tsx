/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TPQ5KJJ');`,
            }}
          />
          {/* <!-- End Google Tag Manager --> */}

          <meta
            name="description"
            content="Workshop de Investigadores en Ciencias de la Computación.
          Edición 2021 - Chilecito, La Rioja, Argentina."
          />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta
            itemProp="name"
            content="WICC 2021 | Workshop de Investigadores en Ciencias de la Computación"
          />
          <meta
            itemProp="description"
            content="Workshop de Investigadores en Ciencias de la Computación.
          Edición 2021 - Chilecito, La Rioja, Argentina."
          />
          <meta itemProp="image" content="https://www.wicc.tk/WICC-logo.png" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://www.wicc.tk" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="WICC 2021 | Workshop de Investigadores en Ciencias de la Computación"
          />
          <meta
            property="og:description"
            content="Workshop de Investigadores en Ciencias de la Computación.
          Edición 2021 - Chilecito, La Rioja, Argentina."
          />
          <meta
            property="og:image"
            content="https://www.wicc.tk/WICC-logo.png"
          />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="WICC 2021 | Workshop de Investigadores en Ciencias de la Computación"
          />
          <meta
            name="twitter:description"
            content="Workshop de Investigadores en Ciencias de la Computación.
          Edición 2021 - Chilecito, La Rioja, Argentina."
          />
          <meta
            name="twitter:image"
            content="https://www.wicc.tk/WICC-logo.png"
          />

          {/* <!-- Meta Tags Generated via http://heymeta.com --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TPQ5KJJ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;