import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddSong = (props: any) => {
    const {basicinfo, discNum, trackNum} = props;
    const [visible, setVisible] = useState(true);
    const handleSubmit = (event: any) => {
        setVisible(!visible);
    };

    return (
        <>
        {visible && (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required placeholder="Enter title here"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Length</Form.Label>
                        <Form.Control required type="time" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control required placeholder="Enter Artists separated by commas" defaultValue={basicinfo.artist} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disc #</Form.Label>
                        <Form.Control required placeholder={discNum} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Track #</Form.Label>
                        <Form.Control required placeholder={trackNum} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Explicit</Form.Label>
                        <Form.Check />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>)}
        </>
    )
};

export default AddSong;