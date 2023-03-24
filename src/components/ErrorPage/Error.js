import styles from "./error.module.css";

export const Error = () => {
    return(
        <div className={styles["error-page"]}>
            <h3>404</h3>
            <h5>Not found!</h5>
        </div>
    )
}