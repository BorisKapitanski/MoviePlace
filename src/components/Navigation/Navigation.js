import styles from "./navigation.module.css"
import { Link } from "react-router-dom"
export const Navigation = ({
    user,
    onLogout
}) => {
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
                        {user && <>
                            <li><Link to={"/add-movie"}>Add Movie</Link></li>
                            <li><Link onClick={onLogout}>Logout</Link></li>
                        </>
                        }
                        {!user && <>
                            <li><Link to={"/login"}>Login</Link></li>
                            <li><Link to={"/register"}>Register</Link></li>
                        </>
                        }

                    </ul>
                </nav>
            </div>
        </header>
    )
}