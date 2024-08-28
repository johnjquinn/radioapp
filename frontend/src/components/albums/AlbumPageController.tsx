import { Button } from "react-bootstrap";
import SimpleAlbumTable from "./SimpleAlbumTable";
import Error from "../user/Error";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAlbumsSimp } from "../../api/albums/albumAPI";
import EditAlbum from "./EditAlbum";
import AddAlbum from "./AddAlbum";

const AlbumPageController = () => {
    const {userToken, userInfo, error} = useSelector((state: any) => state.auth);
    const [albums, setAlbums] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [targetAlbum, setTargetAlbum] = useState("");
    useEffect(() => {
        async function myAlbums() {
            try {
                let found = await getAllAlbumsSimp(userToken);
                if(found.data){
                    setAlbums(found.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        myAlbums();
    }, [userToken]);
    const handleAdd = (event: any) => {
        setIsAdding(!isAdding);
    };
    return (
        <>
            {error && <Error>{error}</Error>}
            {(albums && !isAdding && !isEditing && !isDeleting) && 
                <div>
                    <h3>Album Table</h3>
                    <SimpleAlbumTable 
                        albums={albums}
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing} 
                        isDeleting={isDeleting} 
                        setIsDeleting={setIsDeleting} 
                        targetAlbum={targetAlbum} 
                        setTargetAlbum={setTargetAlbum}
                    />
                    <Button onClick={handleAdd}>Add Album</Button>
                </div>
            }
            {isEditing && <EditAlbum albums={albums} setAlbums={setAlbums} targetAlbum={targetAlbum} visible={isEditing} setVisible={setIsEditing} />}
            {isAdding && <AddAlbum albums={albums} setAlbums={setAlbums} visible={isAdding} setVisible={setIsAdding}/>}
        </>
    );
};

export default AlbumPageController;