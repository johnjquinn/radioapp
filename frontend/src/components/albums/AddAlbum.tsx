import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AddSong from "../songs/AddSong";
import AddDisc from "../songs/AddDisc";

const AddAlbum = (props: any) => {
    const {albums, setAlbums, visible, setVisible} = props;
    const [basicinfo, setBasicinfo] = useState({});
    
    const handleInfo = (event: any) => {
        event.preventDefault();
        const elems = event.target;
        const basic = {
            title: elems[0].value,
            artists: elems[1].value,
            releaseDate: elems[2].value,
            discNum: elems[3].value,
            discTracks: elems[4].value.split(',')
        };
        setBasicinfo(basic);
    };
    const handleCancel = (event: any) => {
        setVisible(!visible);
    };
    return (
        <>
            <h3>Add Album</h3>
            {(JSON.stringify(basicinfo) === '{}') && (
                <Form onSubmit={handleInfo}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required placeholder="Enter Title Here" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control required placeholder="Enter Artists separated by commas" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control required type="date" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number of Discs</Form.Label>
                        <Form.Control required defaultValue={1} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number of Tracks per Disc</Form.Label>
                        <Form.Control required placeholder="Enter track count per disc separated by commas" />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form>
            )}
            {basicinfo && <AddDisc basicinfo={basicinfo} />}
        </>
    );
};

export default AddAlbum;