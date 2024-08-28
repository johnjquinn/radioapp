import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editProfile } from "../../api/profiles/profileAPI";

const EditProfile = (props: any) => {
    const {profile, setProfile, visible, setVisible} = props;
    const {userToken} = useSelector((state: any) => state.auth);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const elems = event.target;
        const newBio = {
            name: elems[0].value,
            email: elems[1].value,
            bio: elems[2].value
        };
        try {
            let data = await editProfile(userToken, newBio);
            setProfile(newBio);
            setVisible(!visible);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    const handleCancel = (event: any) => {
        event.preventDefault();
        setVisible(!visible);
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder={profile.name}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={profile.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Biography</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder={profile.bio}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Form>
        </div>
    )
};

export default EditProfile;