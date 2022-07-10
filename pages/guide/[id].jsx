import { useRouter } from "next/router";

import { Heading, Box } from "grommet";

import GuidesService from "../../services/guides.service";
import MdViewer from "../../components/displayers/MdViewer";
import CustomLink from "../../components/CustomLink";

const guidesRequest = GuidesService();

function Guide({ guide, tutorials }) {
    return (
        <>
            <style>{`
            .tutorial-link {
                color: var(--primary);
            }
        `}</style>
            <Box margin="auto" width="80%">
                <Heading level="2">{guide.title}</Heading>
                <MdViewer programmingLanguage={guide?.programming_language?.extension_name} >
                    {guide?.guide_contents_md || "# Not contents yet..."}
                </MdViewer>

                <Heading style={{ marginTop: 30 }} level="3">Tutorials</Heading>
                <Box width="98%" margin="auto">
                    {tutorials?.tutorials?.map((tutorial, index) => (
                        <CustomLink className="tutorial-link" to={`/guide/tutorial/${tutorial.id}`}>
                            {tutorial.title || "Tutorial " + index + 1}
                        </CustomLink>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const guide = await guidesRequest.get_(query.id);
    const tutorials = await guidesRequest.getGuideTutorials(query.id);
    return {
        props: { guide: guide.data, tutorials: tutorials.data }
    }
}

export default Guide;