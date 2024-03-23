import LayoutDefault from "@/components/layouts/LayoutDefault";
import "../../styles/globals.css";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || LayoutDefault;
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
