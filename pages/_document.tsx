import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet" />
          <meta name="description" content="Project to React portfolio" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
