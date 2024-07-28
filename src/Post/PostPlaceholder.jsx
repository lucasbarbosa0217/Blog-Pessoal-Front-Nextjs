import React from "react";
import styles from "./placeholder.module.css";

const PostPlaceholder = () => (
	<div className={styles.main}>
		<main className={styles.mainblog}>
			<div className={styles.headerblog}>
				<div className={"" + styles.placeholder + " " + styles.time}>.</div>
				<div className={styles.divider}></div>
				<div className={"" + styles.placeholder + " " + styles.time}>.</div>
			</div>
			<div className={"" + styles.placeholder + " " + styles.title}>.</div>
			<div className={styles.postcontent}>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.textshort}>
					.
				</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.text}>.</div>
				<div className={"" + styles.placeholder + " " + styles.textshort}>
					.
				</div>
			</div>
		</main>
		<aside className={styles.userPost}>
			<div
				className={
					"" + styles.placeholder + " " + styles.imagePlaceholder
				}></div>
			<div className={styles.postuser}>
				<div className={"" + styles.placeholder + " " + styles.textshort}></div>

				<div className={"" + styles.placeholder + " " + styles.textshort}></div>
				<div className={"" + styles.placeholder + " " + styles.text}></div>
				<div className={"" + styles.placeholder + " " + styles.text}></div>
			</div>
		</aside>
	</div>
)

export default PostPlaceholder
