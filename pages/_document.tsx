import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className={"explorer-theme"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
