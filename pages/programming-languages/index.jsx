import { useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";

import CustomLink from "../../components/CustomLink.jsx";
import CardGroup from "../../components/displayers/CardGroup.jsx";
import ProgrammingLanguagesService from "../../services/programming-languages.service.js";
const request = ProgrammingLanguagesService();

function ProgrammingLanguages({ programmingLanguages }) {
    return (
        <>
            <style>{`
            .card-link {
                color: var(--primary);
            }
        `}</style>
            <ToastContainer />
            <CardGroup
                cardsData={programmingLanguages?.map(language => ({
                    header: <strong>{language?.name}</strong>,
                    body: language?.description,
                    footer: (
                        <CustomLink className="card-link" to={`/programming-languages/guides/${language.id}`}>
                            Check guides
                        </CustomLink>
                    )
                })
                )}
            />
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const programmingLanguages = await request.get_();

    return {
        props: {
            programmingLanguages: programmingLanguages.data || []
        }
    }
}

export default ProgrammingLanguages;