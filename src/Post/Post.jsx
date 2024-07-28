import styles from "./blogStyle.module.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostPlaceholder from "./PostPlaceholder";

export default function Post() {
	const { blogtitle } = useParams();

	const [relativeTime, setRelativeTime] = useState("");
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
		if (post) {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const date = parseISO(post.createdTimestamp + "Z");
			const localDate = new Date(date.toLocaleString("en-US", { timeZone }));
			const relative = formatDistanceToNow(localDate, {
				addSuffix: true,
				locale: ptBR,
			});
			setRelativeTime(relative);
		}
	}, [post]);

	if (error) {
		return navigate("/404");
	}

	if (!post) {
		return (
			<div>
				<PostPlaceholder />
			</div>
		);
	}

	return (
		<div className={styles.main}>
			<main className={styles.mainblog}>
				<div className={styles.headerblog}>
					<p>{relativeTime}</p>
					<div className={styles.divider}></div>
					<a href={"/post/theme/" + post.theme.description}>
						<p>{post.theme.description}</p>
					</a>
				</div>

				<h1>{post.title}</h1>
				<p dangerouslySetInnerHTML={{ __html: post.text }}></p>
			</main>
			<aside className={styles.userPost}>
				<img
					className={styles.userImage}
					src={post.user.photo}
					alt="User Profile"
				/>

				<div>
					<p>
						<b>Autor:</b> {post.user.name}
					</p>
					<p>
						<b>Email: </b>
						<a href={"mailto:" + post.user.email}> {post.user.email} </a>
					</p>
					<p className={styles.userDescription}>
						<i>
							Sou uma pessoa apaixonada por criar projetos de tecnologia, sejam
							de programação, ou até de covers mixados de músicas de kpop que eu
							gosto
						</i>
					</p>
				</div>
			</aside>
		</div>
	);
}
