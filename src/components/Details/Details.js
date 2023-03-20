import { Link } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import styles from "./details.module.css";



export const Details = ({
    movie,
    onDeleteClick,
    onDetailsClick,
    onCommentSubmit
}) => {
    
   
    return (
        <div className={styles["details"]}>
            <h3>Details</h3>
            <article>
                <h4>{movie.title}</h4>
                <img src={movie.imageUrl} alt={movie.title} />
                <h5>{movie.director}, <span>{movie.year}</span></h5>
                <p>{movie.genre}</p>
                <p>{movie.plot}</p>
                <button><Link to={`/movies/${movie._id}/edit`} onClick={() => onDetailsClick(movie._id)}>Edit</Link></button>
                <button onClick={() => onDeleteClick(movie._id)} >Delete</button>
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
    )
}