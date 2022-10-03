import "../styles/globals.css";
import type { AppProps } from "next/app";

const MpsApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MpsApp;
