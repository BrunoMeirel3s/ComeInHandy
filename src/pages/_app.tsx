import LayoutDefault from "@/components/layouts/LayoutDefault";
import "../../styles/globals.css";

import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const Layout = Component.Layout || LayoutDefault;
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}