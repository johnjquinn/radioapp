import axios from 'axios';

const BASE_URL = "http://localhost:9000";

export const getProfile = async (userToken: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.get(
            `${BASE_URL}/users/profile`,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const editProfile = async (userToken: any, {name, bio, email}: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.post(
            `${BASE_URL}/users/profile`,
            {name, bio, email},
            config
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};