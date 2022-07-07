import { useState } from "react";

import { Box, Card, CardBody, CardHeader, CardFooter, Button } from "grommet";
import { Down } from "grommet-icons";

const CustomCardBody = ({ children }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleDetailsOpen = () => setDetailsOpen(prev => !prev);


    return (
        <>
            <style>{`
            .swap-details-button {
                transition: 500ms;
                width: fit-content;
                margin-lefy: auto;
            }

            .swap-details-button-open {
                transform: rotate(-90deg);
            }

        `}</style>

            <Button
                alignSelf="end"
                icon={
                    <Down
                        className={detailsOpen ? "swap-details-button swap-details-button-open" : "swap-details-button"}
                    />
                }
                className={detailsOpen ? "swap-details-button swap-details-button-open" : "swap-details-button"}
                onClick={handleDetailsOpen}
            />
            <Box
                pad="6px"
                style={{
                    overflow: detailsOpen ? "auto" : "hidden",
                    maxHeight: 150,
                    height: detailsOpen ? "fit-content" : "0px"
                }}
            >
                {children}
            </Box>
        </>
    )
}

function CardGroup({ cardsData = [{ header: <></>, body: <></>, footer: <></> }], rawData = [{}] }) {

    return (
        <>
            <Box wrap gap="10px" justify="evenly" align="center" direction="row">
                {cardsData?.map((card, index) => (
                    <Card pad="10px" gap="5px" key={index} style={{ minWidth: 200, maxWidth: 350, height: "fit-content" }}>
                        {card.header && (
                            <CardHeader>{card.header}</CardHeader>
                        )}


                        {card.body && (
                            <CustomCardBody>
                                {card.body}
                            </CustomCardBody>
                        )}
                        {card.footer && (
                            <CardFooter>{card.footer}</CardFooter>
                        )}
                    </Card>
                ))}
            </Box>
        </>
    );
}

export default CardGroup;