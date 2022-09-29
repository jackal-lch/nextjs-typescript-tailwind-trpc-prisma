import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
// import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '@utils/trpc';
import { Session } from 'next-auth';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <SessionProvider session={session}>
      {layout}
      {/* <CartProvider>
        <UIProvider>{layout}</UIProvider>
      </CartProvider>
      <Toaster /> */}
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
