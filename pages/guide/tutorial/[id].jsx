import { Box, Heading } from "grommet";

import CardGroup from "../../../components/displayers/CardGroup";
import NavBar from "../../../components/NavBar";
import TutorialService from "../../../services/tutorial.service";
import GuidesService from "../../../services/guides.service";
import MdViewer from "../../../components/displayers/MdViewer";
import CustomLink from "../../../components/CustomLink";

function Tutorial({ tutorial, guideTutorials }) {
    return (
        <>
            <style>{`
            .tutorial-link {
                color: var(--secondary);
            }
        `}</style>
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
                    <CustomLink className="tutorial-link" key={index} to={`/guide/tutorial/${tutorial.id}`}>
                        {tutorial.title || "Tutorial " + index + 1}
                    </CustomLink>
                ))}
            </NavBar>

            <Box width="80%" margin="auto">
                <Heading level="4">{tutorial.tutorial?.title}</Heading>
                <MdViewer programmingLanguage={tutorial.guide?.programming_language?.extension_name} >
                    {tutorial?.tutorial?.md_body || "## Hello"}
                </MdViewer>
            </Box>
        </>
    );
}
export const getServerSideProps = async ({ query }) => {
    const request = TutorialService();
    const guidesRequest = GuidesService();
    const tutorial = await request.get_(query.id);

    const { id } = tutorial.data.guide;
    const guideTutorials = await guidesRequest.getGuideTutorials(id);
    return {
        props: { tutorial: tutorial.data, guideTutorials: guideTutorials.data }
    }
}

export default Tutorial;