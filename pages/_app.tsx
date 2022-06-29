import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session} refetchInterval={0}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
