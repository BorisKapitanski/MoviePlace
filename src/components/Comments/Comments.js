import { useContext, useState } from "react";
import { Context } from "../../context/useContext";
import styles from "./comments.module.css";

export const Comments = ({
    onCommentSubmit,
}) =>{
    const { email } = useContext(Context);
    const [comment, setComment] = useState({
        author: email,
        text: ""
    });
    const onTextChange = (e) =>{
        setComment(text => ({...text, [e.target.name]: e.target.value}))
    }


    return(
        <div className={styles["comments"]}>
            <form onSubmit={(e) => onCommentSubmit(e, comment)}>
                <textarea name="text" id="comment" placeholder="Add your comment here..." value={comment.text} onChange={onTextChange} ></textarea>
                <input className={styles["button"]} type="submit" value="Add comment"/>
            </form>
        </div>
    )
}