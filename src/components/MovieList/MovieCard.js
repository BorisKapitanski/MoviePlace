import { Link } from "react-router-dom"
export const MovieCard = ({
    _id,
    title,
    director,
    year,
    genre,
    img,
    onDetailsClick,
}) => {
    return (
        <li>
            <h3>{title}</h3>
            <img src={img} alt= {title} />
            <h5>{director}, <span>{year}</span></h5>
            <p>{genre}</p>
            <button><Link to={`/movies/${_id}`} onClick={()=>onDetailsClick(_id)} >Details</Link></button>
        </li>
    )
}