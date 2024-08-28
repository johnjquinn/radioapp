import { Button, Form } from "react-bootstrap";

const EditAlbum = (props: any) => {
    const {albums, setAlbums, targetAlbum, visible, setVisible} = props;
    const handleSubmit = (event: any) => {

    };
    const handleCancel = (event: any) => {
        setVisible(!visible);
    };
    return (
        <>
            <h3>Edit Album</h3>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form>
            </div>
        </>
    )
};

export default EditAlbum;