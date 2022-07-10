import { Grommet, Heading } from "grommet";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import CustomLink from "../components/CustomLink";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ToastContainer />
			<style>{`
			.sidebar-link {
				color: var(--secondary);
				text-decoration: none;
				transition: 500ms;
				width: 100%;
			}
			.sidebar-link:hover {
				background-color: var(--primary-translucid);
			}
			.sidebar-link:focus {
				background-color: var(--primary-translucid);
				outline: none;
			}
		`}</style>
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
					<CustomLink to="/home" className="sidebar-link">
						Home
					</CustomLink>
					<CustomLink
						to="/programming-languages"
						className="sidebar-link"
					>
						Guides
					</CustomLink>
					<CustomLink to="/login" className="sidebar-link">
						Sign in
					</CustomLink>
				</NavBar>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</Grommet>
		</>
	);
}

export default MyApp;
