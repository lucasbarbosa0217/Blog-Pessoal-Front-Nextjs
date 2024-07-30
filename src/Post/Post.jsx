import styles from "./blogStyle.module.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {useEffect, useRef, useState} from "react";
import Button from "../Button/Button.jsx";
import {redirect, useNavigate} from "react-router-dom";

export default function Post({ post }) {
	const [relativeTime, setRelativeTime] = useState("");
	const [createdComment, setCreatedComment] = useState(null);
	const [errorComment, setErrorCreatedComment] = useState(null);
	const navigate = useNavigate();


	const commentRef = useRef(null);
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


	async function teste() {
		try {
			let response = await fetch("https://blogpessoal-zdcv.onrender.com/comentario/comentar", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWNhc2JhcmJvc2EwMjE3QGdtYWlsLmNvbSIsImlhdCI6MTcyMjI5OTI1OSwiZXhwIjoxNzIyMzAyODU5fQ.YapB8S6Ng3kGFVJLMdizAHPsaWtUl60hokKQXId7k4"
				},
				body: JSON.stringify({
					"text": commentRef.current.value,
					"blog": {
						id: post.id
					}
				})
			});

			let body;
			try {
				body = await response.json();
			} catch (e) {
				body = null;  // O corpo da resposta não é JSON válido ou está vazio
			}

			if (!response.ok) {
				let error = new Error('Erro na requisição');
				error.status = response.status;
				error.response = body;
				throw error;
			}

			console.log(body);
		} catch (e) {
			if (e.status) {
				console.error('Erro HTTP:', e.status);
				console.error('Resposta:', e.response);
				if(e.status == 401 || e.status == 403){
					navigate("/login")
				}
			} else {
				console.error('Erro na requisição:', e.message);
			}
		}
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
						<i></i>
					</p>
				</div>
			</aside>

			<section className={styles.commentSection}>
				<div className={styles.makeComment}>
					<h2 >Deixe um comentário:</h2>
					<textarea
						ref={commentRef}
					maxLength={400}
					></textarea>
					<Button onClick={teste}>Enviar comentário</Button>
				</div>
			</section>
		</div>
	);
}
