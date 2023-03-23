import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/useContext";
import styles from "./comments.module.css";
import services from "../../services/movieService";
import { useParams } from "react-router-dom";
export const Comments = ({

}) => {
    const { email, token } = useContext(Context);
    const [comment, setComment] = useState({
        text: ""
    });
    const [comments, setComments] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        services.get(`http://localhost:3030/data/comments?where=movieId%3D%22${movieId}%22`)
            .then(response => setComments(response))
    }, [])

    const onTextChange = (e) => {
        setComment(text => ({ ...text, [e.target.name]: e.target.value }))
    }

    const onCommentSubmit = async (e, comment) => {
        e.preventDefault();
        const commentWithMovieIdandEmail = { ...comment, movieId, author: email }
        const response = await services.post(`http://localhost:3030/data/comments`, commentWithMovieIdandEmail, token);
        setComments(oldComments => [...oldComments, response]);
        setComment({
            text: ""
        });
    }



    return (
        <>

            {token && (
                <div className={styles["comments"]}>
                    <form onSubmit={(e) => onCommentSubmit(e, comment)}>
                        <textarea name="text" id="comment" placeholder="Add your comment here..." value={comment.text} onChange={onTextChange} ></textarea>
                        <input className={styles["button"]} type="submit" value="Add comment" />
                    </form>
                </div>)}


            <div className={styles["comment-list"]}>
                {comments !== [] ?
                    (<ul>
                        {comments.map(x =>

                            <li key={x._id}>
                                <h5>{x.author}</h5>
                                <p>{x.text}</p>
                            </li>

                        )}
                    </ul>) : (<span>No added comments!</span>)}
            </div>
        </>

    )
}