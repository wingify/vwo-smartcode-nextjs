# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-03

### Added

- First release of Next.js component for VWO Smart-code

  #### Usage

  **Page Router (Legacy `pages/` Directory)**

  For applications using the **Page Router**, add the `VWOScript` component inside `_document.js` (or `_document.tsx` if using TypeScript) to include it in the `<head>` of your HTML document.

  ```javascript
  // pages/_document.js
  import Document, { Html, Head, Main, NextScript } from 'next/document';
  import { VWOScript } from 'vwo-smartcode-nextjs';

  class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            <VWOScript accountId="YOUR_ACCOUNT_ID" />
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
  ```

  **App Router (`app/` Directory)**

  For applications using the **App Router**, include the `VWOScript` component in `layout.tsx` to ensure it loads correctly within the `<head>` of your HTML document.

  ```tsx
  // app/layout.tsx
  import { VWOScript } from 'vwo-smartcode-nextjs';

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <VWOScript accountId="YOUR_ACCOUNT_ID" />
        </head>
        <body>{children}</body>
      </html>
    );
  }
  ```

  **Using Nonce**

  To add a nonce attribute for Content Security Policy:

  ```tsx
  <VWOScript
    accountId="YOUR_ACCOUNT_ID"
    scriptAttributes={{
      nonce: 'your-nonce-value',
    }}
  />
  ```
