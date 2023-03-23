import styles from "./edit.module.css";
import { useState, useContext } from "react";
import { Context } from "../../context/useContext";



export const Edit = ({
    onEditSubmit
}) => {
    const {formError, movie } = useContext(Context);

    const [editedData, setEditedData] = useState(movie);
   
    const onEditInputChange = (e) => {
        setEditedData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    }

    return (
        <div className={styles["add-movie"]}>
            <h3>Edit Movie</h3>
            <form onSubmit={(e) => onEditSubmit(e, movie._id, editedData)}>
                {formError &&
                    <div className="error">
                        <p>{formError}</p>
                    </div>
                }
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={editedData.title} onChange={onEditInputChange} />
                </div>
                <div>
                    <label>Director</label>
                    <input type="text" name="director" value={editedData.director} onChange={onEditInputChange} />
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" name="year" value={editedData.year} onChange={onEditInputChange} />
                </div>
                <div>
                    <label>Genre</label>
                    <input type="text" name="genre" value={editedData.genre} onChange={onEditInputChange} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" name="img" value={editedData.img} onChange={onEditInputChange} />
                </div>
                <div>
                    <label>Plot</label>
                    <textarea name="description" id="plot" cols="21" rows="10" value={editedData.description} onChange={onEditInputChange}></textarea>
                </div>
                <div>
                    <input className={styles["button"]} type="submit" value="Edit" />
                </div>
            </form>
        </div>
    )
}