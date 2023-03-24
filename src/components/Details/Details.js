import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import { Context } from "../../context/useContext";
import styles from "./details.module.css";

export const Details = ({
    onDeleteClick,
}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const {userId, formError, onEditClick, movie} = useContext(Context)
   
    const onDeleteButton = () => {
        setDeleteModal(true);
    }
    const onCancelClick = () => {
        setDeleteModal(false);
    }
   
      
    return (
        <>
            {deleteModal && <DeleteModal movie={movie} onDeleteClick={onDeleteClick} onCancelClick={onCancelClick} />}
            <div className={styles["details"]}>
                <h3>Details</h3>
                <article>
                {formError &&
                    <div className="error">
                        <p>{formError}</p>
                    </div>
                }
                    <h4>{movie.title}</h4>
                    <img src={movie.img} alt={movie.title} />
                    <h5>{movie.director}, {movie.year}</h5>
                    <p>{movie.genre}</p>
                    <p>{movie.description}</p>
                    {userId && userId === movie._ownerId && (
                        <>
                            <button><Link to={`/movies/${movie._id}/edit`} onClick={()=> onEditClick(movie._id)}>Edit</Link></button>
                            <button onClick={() => onDeleteButton()} >Delete</button>
                        </>
                    )}

                </article>
                <Comments />
            </div>
        </>

    )
}