import { useState } from "react";
import { Accordion, AccordionBody, AccordionItem, Container } from "react-bootstrap";
import AddSong from "./AddSong";

const AddDisc = (props: any) => {
    const {basicinfo} = props;
    const [songs, setSongs] = useState([]);
    return (
        <>
            {Array.from({length: basicinfo.discNum}, (disc: any, dIndex: number ) => (
                <Container>
                    <h3>Disc #{dIndex}</h3>
                    <Accordion>
                        {Array.from({length: Number(basicinfo.discTracks[dIndex])}, (song: any, sIndex: number) => (
                            <AccordionItem eventKey={sIndex.toString()}>
                                <Accordion.Header>Track #{sIndex}</Accordion.Header>
                                <Accordion.Body><AddSong basicinfo={basicinfo} discNum={dIndex} trackNum={sIndex} /></Accordion.Body>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            ))}
        </>
        // <div>

        //     {/* <Accordion>
        //     {Array.from({length: basicinfo.discNum}, (item: any, index: number) => (
        //         <Accordion.Item eventKey={index.toString()}>
        //             <Accordion.Header>Disc #{index}</Accordion.Header>
        //             <Accordion.Body>
        //                 {Array.from({length: Number(basicinfo.discTracks[index])}, (song: any, sIndex: number) => <AddSong key={sIndex} discNum={index} trackNum={sIndex} />)}
        //             </Accordion.Body>
        //         </Accordion.Item>
        //     ))}
        //     </Accordion> */}
        // </div>
    )
};

export default AddDisc;