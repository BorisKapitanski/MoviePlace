import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import { Context } from "../../context/useContext";
import services from "../../services/movieService";
import { useParams } from "react-router-dom";
import styles from "./details.module.css";



const baseUrl = "http://localhost:3030/data/movies"
export const Details = ({
    onDeleteClick,
}) => {
    const [movie, setMovie] = useState({})
    const [deleteModal, setDeleteModal] = useState(false);
    const {movieId} = useParams();
    const {userId} = useContext(Context)
    useEffect(()=>{
        services.get(`${baseUrl}/${movieId}`)
          .then(response => setMovie(response));  
    },[]);
    
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
                    <h4>{movie.title}</h4>
                    <img src={movie.img} alt={movie.title} />
                    <h5>{movie.director}, <span>{movie.year}</span></h5>
                    <p>{movie.genre}</p>
                    <p>{movie.description}</p>
                    {userId && userId === movie._ownerId && (
                        <>
                            <button><Link to={`/movies/${movie._id}/edit`}>Edit</Link></button>
                            <button onClick={() => onDeleteButton()} >Delete</button>
                        </>
                    )}

                </article>
                <Comments />
            </div>
        </>

    )
}