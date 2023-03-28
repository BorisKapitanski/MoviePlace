import { MovieCard } from "./MovieCard"
import styles from "./movieList.module.css"

export const MovieList = ({
    movies,
}) => {
    
    return (
        <div className={styles["movie-list"]}>
            <h1>All Movies</h1>
            <ul>
                    {movies ? 
                     movies.map(x => <MovieCard  key={x._id} {...x} />)
                    : (<span>There is no added movies yet.</span>)}
            </ul>
        </div>
    )
}