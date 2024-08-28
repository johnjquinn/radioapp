import axios from 'axios';
const BASE_URL = "http://localhost:9000";

export const getAlbumSimp = async (userToken: any, albumID: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.get(
            `${BASE_URL}/albums?id=${albumID}`,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAlbum = async (userToken: any, albumID: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.get(
            `${BASE_URL}/albums?id=${albumID}&full=true`,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllAlbumsSimp = async (userToken: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.get(
            `${BASE_URL}/albums`,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllAlbums = async (userToken: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        };
        const {data} = await axios.get(
            `${BASE_URL}/albums?full=true`,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const convertTimestampToUTC = (timestamp: string) => {
    const timeDate = new Date(timestamp);
    return timeDate.toUTCString();
}

export const artistsToSingleString = (artists: [string]) => {
    let allartists = artists[0];
    for(let i=1; i<artists.length; i++){
        allartists = allartists.concat(", ", artists[i]);
    }
    return allartists;
}