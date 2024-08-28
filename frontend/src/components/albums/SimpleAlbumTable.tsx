import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { artistsToSingleString, convertTimestampToUTC, getAllAlbumsSimp } from "../../api/albums/albumAPI";

const SimpleAlbumTable = (props: any) => {
    const {albums, isEditing, setIsEditing, isDeleting, setIsDeleting, targetAlbum, setTargetAlbum} = props;
    const handleEdit = (event: any) => {
        event.preventDefault();
        const id = event.target.parentElement.parentElement.id;
        console.log(id);
        setTargetAlbum(id);
        setIsEditing(!isEditing);
    };
    const handleDelete = (event: any) => {
        event.preventDefault();
        const id = event.target.parentElement.parentElement.id;
        console.log(id);
        setTargetAlbum(id);
        setIsDeleting(!isDeleting);
    };
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Release Date</th>
                        <th></th>
                        <th></th>
                    </tr>  
                </thead>
                <tbody>
                    {albums.map((album: any, index: number) => (
                        <tr key={album._id} id={album._id}>
                            <td>{index}</td>
                            <td>{album.title}</td>
                            <td>{artistsToSingleString(album.artist)}</td>
                            <td>{convertTimestampToUTC(album.releaseDate)}</td>
                            <td><Button onClick={handleEdit}>Edit</Button></td>
                            <td><Button onClick={handleDelete}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};

export default SimpleAlbumTable;