import LayoutDefault from "@/components/layouts/LayoutDefault";
import "../../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { FeaturesProvider } from "@/contexts/features/FeaturesContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const Layout = Component.Layout || LayoutDefault;
  return (
    <SessionProvider session={session}>
      <FeaturesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FeaturesProvider>
    </SessionProvider>
  );
}
