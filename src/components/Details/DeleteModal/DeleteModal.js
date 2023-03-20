import styles from "./deleteModal.module.css";

export const DeleteModal = ({
    movie,
    onDeleteClick,
    onCancelClick
}) => {
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
            <h6>Are you sure, you want to DELETE <span>{movie.title}</span>?</h6>
            <button onClick={()=> onDeleteClick(movie._id)}>Delete</button>
            <button onClick={()=> onCancelClick()}>Cancel</button>
            </div>
        </div>
    )
}