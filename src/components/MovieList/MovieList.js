
import { MovieCard } from "./MovieCard"
import styles from "./movieList.module.css"

export const MovieList = ({
    movies,
    onDetailsClick,
}) => {
    return (
        <div className={styles["movie-list"]}>
            <h1>All Movies</h1>
            <ul>
                    {movies.map(x => <MovieCard  key={x._id} {...x} onDetailsClick={onDetailsClick}/>)}
            </ul>
        </div>
    )
}