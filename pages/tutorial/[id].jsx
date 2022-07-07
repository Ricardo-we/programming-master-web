import { Box, Heading } from "grommet";

import CardGroup from "../../components/displayers/CardGroup";
import NavBar from "../../components/NavBar";
import TutorialService from "../guide/services/tutorial.service";
import GuidesService from "../guide/services/guides.service";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark as highlightTheme } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CustomLink from "../../components/CustomLink";

const request = TutorialService();
const guidesRequest = GuidesService();

function Tutorial({ tutorial, guideTutorials }) {
    return (
        <>
            <NavBar
                heading={tutorial.guide?.title}
                navStyle={{
                    width: "fit-content",
                    background: "white",
                    align: "center",
                    justify: "end",
                    direction: "row-reverse"
                }}
            >
                <Heading level="3">{tutorial.guide?.title}</Heading>
                {guideTutorials.tutorials && guideTutorials.tutorials?.map((tutorial, index) => (
                    <CustomLink key={index} to={`/tutorial/${tutorial.id}`}>
                        {tutorial.title || "Tutorial " + index + 1}
                    </CustomLink>
                ))}
            </NavBar>

            <Box width="80%" margin="auto">
                <Heading level="4">{tutorial.tutorial?.title}</Heading>
                <ReactMarkdown
                    remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                    components={{
                        code({ node, inline, children }) {
                            const language = tutorial.guide?.programming_language?.extension_name;
                            return <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={highlightTheme}
                                language={language}
                                PreTag="div"
                            />

                        }
                    }}
                >
                    {tutorial?.tutorial?.md_body || "## Hello"}
                </ReactMarkdown>
            </Box>
        </>
    );
}
export const getServerSideProps = async ({ query }) => {
    const tutorial = await request.get_(query.id);
    const { id } = tutorial.data.guide;
    const guideTutorials = await guidesRequest.getGuideTutorials(id);
    return {
        props: { tutorial: tutorial.data, guideTutorials: guideTutorials.data }
    }
}

export default Tutorial;