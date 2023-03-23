
import { useContext } from "react"
import { Context } from "../../context/useContext"
import { MovieCard } from "./MovieCard"
import styles from "./movieList.module.css"

export const MovieList = ({
    movies,
}) => {
    const {onDetailsClick} = useContext(Context);
    return (
        <div className={styles["movie-list"]}>
            <h1>All Movies</h1>
            <ul>
                    {movies ? 
                     movies.map(x => <MovieCard  key={x._id} {...x} onDetailsClick={onDetailsClick} />)
                    : (<span>There is no added movies yet.</span>)}
            </ul>
        </div>
    )
}