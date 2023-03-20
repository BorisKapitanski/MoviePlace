import { useState } from "react";
import { Link } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import styles from "./details.module.css";



export const Details = ({
    movie,
    onDeleteClick,
    onDetailsClick,
    onCommentSubmit
}) => {
    const [deleteModal, setDeleteModal] = useState(false);

    const onDeleteButton = () =>{
        setDeleteModal(true);
    }
    const onCancelClick = () =>{
        setDeleteModal(false);
    }
    
   
    return (
        <>
        {deleteModal && <DeleteModal movie={movie} onDeleteClick={onDeleteClick} onCancelClick={onCancelClick}/>}
        <div className={styles["details"]}>
            <h3>Details</h3>
            <article>
                <h4>{movie.title}</h4>
                <img src={movie.imageUrl} alt={movie.title} />
                <h5>{movie.director}, <span>{movie.year}</span></h5>
                <p>{movie.genre}</p>
                <p>{movie.plot}</p>
                <button><Link to={`/movies/${movie._id}/edit`} onClick={() => onDetailsClick(movie._id)}>Edit</Link></button>
                <button onClick={() => onDeleteButton()} >Delete</button>
            </article>

            <Comments onCommentSubmit={onCommentSubmit} movieId={movie._id} />

            <div className={styles["comment-list"]}>
                <ul>
                    {Object.values(movie.comments ? movie.comments : {}).map(x =>
                    
                            <li key={x._id}>
                                <h5>{x.author}</h5>
                                <p>{x.text}</p>
                            </li>
                       
                    )}
                </ul>
            </div>
        </div>
        </>
        
    )
}