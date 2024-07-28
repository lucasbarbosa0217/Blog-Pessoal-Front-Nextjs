import styles from "./postpage.module.css";
import Post from "../Post/Post";

function PostPage() {
	return (
		<div className={styles.postpage}>
			<div className={styles.space}></div>
			<div className={styles.content}>
				<Post className={styles.main}></Post>
				<div className={styles.aside}>q</div>
			</div>
			<div className={styles.space}></div>
		</div>
	);
}

export default PostPage;
