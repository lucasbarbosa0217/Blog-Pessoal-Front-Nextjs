import styles from "./blogStyle.module.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function Post({ post }) {
	const [relativeTime, setRelativeTime] = useState("");

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

	if (!post) return <p>Post not found.</p>;

	return (
		<>
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
						<a href={"mailto: " + post.user.email}> {post.user.email} </a>
					</p>
					<p className={styles.userDescription}>
						<i>
							Sou uma pessoas apaixonada por criar projetos de tecnologia, sejam
							de programação, ou até de covers mixados de músicas de kpop que eu
							gosto
						</i>
					</p>
				</div>
			</aside>
		</>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	try {
		const res = await fetch(
			`https://blogpessoal-zdcv.onrender.com/postagens/urlPath/${id}`
		);
		if (!res.ok) {
			throw new Error("Post not found");
		}
		const post = await res.json();

		return {
			props: {
				post,
			},
		};
	} catch (error) {
		return {
			props: {
				post: null,
			},
		};
	}
}
