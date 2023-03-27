import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import { Context } from "../../context/useContext";
import styles from "./details.module.css";
import services from "../../services/movieService";

const baseUrl = "http://localhost:3030/data/movies";

export const Details = ({
    onDeleteClick,
}) => {
    const navigate = useNavigate()
    const { movieId } = useParams()
    const [deleteModal, setDeleteModal] = useState(false);
    const [movie, setMovie] = useState({});
    const { userId, formError } = useContext(Context);

    useEffect(() => {
        services.get(`${baseUrl}/${movieId}`)
            .then(response => setMovie(response))
            .catch(err => {
                console.log(err.message);
                navigate("/404");
            })
    }, [movieId, navigate])

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
                            <button><Link to={`/movies/${movie._id}/edit`} >Edit</Link></button>
                            <button onClick={() => onDeleteButton()} >Delete</button>
                        </>
                    )}

                </article>
                <Comments />
            </div>
        </>

    )
}