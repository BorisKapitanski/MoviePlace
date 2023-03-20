import { useState } from "react";
import styles from "./addMovie.module.css";

export const AddMovie = ({
    onCreateSubmit,
}) =>{
    const [createData, setCreateData] = useState({
        title: "",
        director: "",
        year: "",
        genre: "",
        imageUrl: "",
        plot: "",
        comments: [],
    });
    
    const onCreateInputChange = (e) =>{
        setCreateData((oldState) => ({...oldState, [e.target.name]: e.target.value}));
    }

    return(
        <div className={styles["add-movie"]}>
        <h3>Add Movie</h3>
        <form onSubmit={(e)=>onCreateSubmit(e, createData)}>
            <div className="error">
            <p>Title is required!</p>
            </div>  
            <div>
                <label>Title</label>
                <input type="text" name="title" value={createData.title} onChange={onCreateInputChange} />
            </div>
            <div>
                <label>Director</label>
                <input type="text" name="director" value={createData.director} onChange={onCreateInputChange} />
            </div>
            <div>
                <label>Year</label>
                <input type="text" name="year" value={createData.year} onChange={onCreateInputChange} />
            </div>
            <div>
                <label>Genre</label>
                <input type="text" name="genre" value={createData.genre} onChange={onCreateInputChange} />
            </div>
            <div>
                <label>Image</label>
                <input type="text" name="imageUrl" value={createData.imageUrl} onChange={onCreateInputChange} />
            </div>
            <div>
                <label>Plot</label>
                <textarea name="plot" id="plot" cols="21" rows="10" value={createData.plot} onChange={onCreateInputChange} ></textarea>
            </div>
            <div>
                <input className={styles["button"]} type="submit" value="Add" />
            </div>
        </form>
    </div>
    )
}