import styles from "./edit.module.css";
import { useState } from "react";
import { Context } from "../../context/useContext";

export const Edit = ({
    onEditSubmit
}) => {
    const { movie } = useState(Context);
    console.log(movie)
    const [createData, setCreateData] = useState(movie);
    
    const onCreateInputChange = (e) => {
        setCreateData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    }

    return (
        <div className={styles["add-movie"]}>
            <h3>Edit Movie</h3>
            <form onSubmit={(e) => onEditSubmit(e, createData._id, createData)}>
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
                    <textarea name="plot" id="plot" cols="21" rows="10" value={createData.plot} onChange={onCreateInputChange}></textarea>
                </div>
                <div>
                    <input className={styles["button"]} type="submit" value="Edit" />
                </div>
            </form>
        </div>
    )
}