import { Grommet, Heading } from "grommet";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import CustomLink from "../components/CustomLink";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
	return (
		<Grommet full>
			<Head>
				<title>Programming master</title>
			</Head>
			<NavBar>
				<Heading
					level="3"
					textAlign="left"
					style={{ marginTop: "10px" }}
				>
					Programming master
				</Heading>
				<CustomLink href="/home" className="sidebar-link">
					Home
				</CustomLink>
				<CustomLink href="/guides" className="sidebar-link">
					Guides
				</CustomLink>
				<CustomLink href="/login" className="sidebar-link">
					Sign in
				</CustomLink>
			</NavBar>
			<Component {...pageProps} />
		</Grommet>
	);
}

export default MyApp;
