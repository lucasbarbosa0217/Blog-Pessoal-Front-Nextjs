import { Nunito } from "next/font/google";

import "@/styles/globals.css";
const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "400", "600", "700", "800"],
});
export default function App({ Component, pageProps }) {
	return (
		<div className={nunito}>
			<Component {...pageProps} />;
		</div>
	);
}
