import { toast, ToastContainer } from "react-toastify";

import ProgrammingLanguagesService from "../services/programming-languages.service";

const request = ProgrammingLanguagesService();

function ProgrammingLanguageGuides({ guides }) {

    return (
        <>
            <ToastContainer />
            {guides?.guides?.map(guide => <div>{guide.title}</div>)}
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const guides = await request.getProgrammingLanguageGuides(query.programming_language_id);

    return {
        props: {
            guides: guides.data
        }
    }
}

export default ProgrammingLanguageGuides;