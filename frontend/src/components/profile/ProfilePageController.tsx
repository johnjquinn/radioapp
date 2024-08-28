import { useSelector } from "react-redux";
import ProfileContainer from "./ProfileContainer";

const ProfilePageController = () => {
    const {userInfo} = useSelector((state: any) => state.auth);
    return (
        <>
            <h3>Welcome {userInfo?.username}</h3>
            <ProfileContainer />
        </>
    )
};

export default ProfilePageController;