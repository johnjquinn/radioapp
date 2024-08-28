import { Button, Card } from "react-bootstrap";

const ViewProfile = (props: any) => {
    const {profile, visible, setVisible} = props;
    const handleEdit = (event: any) => {
        setVisible(!visible);
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{profile.name}</Card.Title>
                    <Card.Subtitle>{profile.email}</Card.Subtitle>
                    <Card.Text>{profile.bio}</Card.Text>
                    <Button onClick={handleEdit} variant="primary">Edit Profile</Button>
                </Card.Body>
            </Card>
        </>
    )
};

export default ViewProfile;