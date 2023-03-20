import styles from "./home.module.css";

export const Home = () =>{
    return (
        <div className={styles["home-page"]}>
        <h1>Welcome to the best Movie place!</h1>
        <h3>Add your favorite movies and comment with our communite of cinema enthusiast</h3>
    </div>
    )
}