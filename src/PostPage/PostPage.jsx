import styles from "./postpage.module.css";
import Post from "../Post/Post";
import PostPlaceholder from "../Post/PostPlaceholder";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostPage() {
	const { blogtitle } = useParams();
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPost() {
			try {
				const res = await fetch(
					`https://blogpessoal-zdcv.onrender.com/postagens/urlPath/${blogtitle}`
				);
				if (!res.ok) {
					throw new Error("Post not found");
				}
				const data = await res.json();
				setPost(data);
			} catch (error) {
				setError("Erro");
			}
		}
		fetchPost();
	}, [blogtitle]);

	useEffect(() => {
		if (error) {
			navigate("/404");
		}
	}, [error, navigate]);


	return (
		<div className={styles.postpage}>
			{post ? <Post post={post} /> : <PostPlaceholder />}
			<div className={styles.aside}>q</div>
		</div>
	);
}

export default PostPage;
