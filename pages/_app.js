import { useState, useEffect } from "react";
import { Grommet, Heading } from "grommet";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import CustomLink from "../components/CustomLink";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import ProgrammingLanguagesService from "../services/programming-languages.service";
import SimpleAccordion from "../components/displayers/SimpleAccordion";

function MyApp({ Component, pageProps }) {
	const programmingLanguagesReq = ProgrammingLanguagesService();
	const [programmingLanguages, setProgrammingLanguages] = useState([]);

	useEffect(() => {
		programmingLanguagesReq
			.get_(undefined, {
				params: { language_code: window.navigator.languages[1] },
			})
			.then((res) => setProgrammingLanguages(res.data));
	}, []);

	return (
		<>
			<ToastContainer />
			<style>{`
			.sidebar-link {
				color: var(--black);
				text-decoration: none;
				transition: 500ms;
				padding: 10px;
				width: 100%;
			}
			.sidebar-link:hover {
				color: var(--light-gray);
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
						style={{ marginTop: "10px", paddingBlock: 10 }}
					>
						Programming master
					</Heading>
					<CustomLink to="/home" className="sidebar-link">
						Home
					</CustomLink>
					<SimpleAccordion
						style={{ width: "100%", padding: "6px" }}
						panels={[
							{
								label: "Programming languages",
								content: (
									<>
										{programmingLanguages?.map(
											(programmingLang) => (
												<CustomLink
													to={
														"/programming-languages/guides/" +
														programmingLang?.id
													}
												>
													{programmingLang.name}
												</CustomLink>
											),
										)}
									</>
								),
							},
						]}
					/>
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
