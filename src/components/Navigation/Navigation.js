import styles from "./navigation.module.css"
import { Link } from "react-router-dom"
export const Navigation = () => {
    return (
        <header>
            <div className={styles["nav"]}>
                <div className={styles["logo"]}>
                    <Link to={"/"}>Movie <span>Place</span></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/movies"}>Movies</Link></li>
                        <li><Link to={"/add-movie"}>Add Movie</Link></li>
                        <li><Link to={"/login"}>Login</Link></li>
                        <li><Link to={"/register"}>Register</Link></li>
                        <li><a href="">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}