import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "../user/Error";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import { getProfile } from "../../api/profiles/profileAPI";

const ProfileContainer = () => {
    const {userToken, error} = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState({});
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        async function myProfile() {
            try {
                let found = await getProfile(userToken);
                if(found.data){
                    setProfile({
                        name: found.data.name,
                        email: found.data.email,
                        bio: found.data.bio
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        myProfile();
    }, [userToken]);
    return (
        <div>
            {error && <Error />}
            {showForm ? (
                <EditProfile profile={profile} setProfile={setProfile} visible={showForm} setVisible={setShowForm}/>
            ) : (
                <ViewProfile profile={profile} visible={showForm} setVisible={setShowForm} />
            )}
        </div>
    )
};

export default ProfileContainer;