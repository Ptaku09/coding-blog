import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import ScrollRestorationProvider from '../providers/ScrollRestorationProvider';
import PostMenuProvider from '../providers/PostMenuProvider';

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <>
      <Head>
        <title>Coding blog</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="coding, java, javascript, typescript, python, js, ts, jsx, tsx, coding blog, react, next" />
        <meta name="author" content="Mateusz Ptak" />
        <meta name="description" content="Project to React portfolio" />
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <ThemeProvider attribute="class">
        <SessionProvider session={session} refetchInterval={0}>
          <ScrollRestorationProvider>
            <PostMenuProvider>
              <>
                <NextNProgress
                  color="#9333ea"
                  startPosition={0.2}
                  stopDelayMs={200}
                  height={5}
                  showOnShallow={false}
                  options={{ showSpinner: false }}
                  nonce={undefined}
                />
                {getLayout(<Component {...pageProps} />)}
              </>
            </PostMenuProvider>
          </ScrollRestorationProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
