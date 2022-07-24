import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import LoginButton from "../component/LoginButton";
import styles from "../styles/Home.module.css";

const Home: NextPage = (props) => {
	const { data: session } = useSession();

	const [linkDescription, setLinkDescription] = React.useState("");
	const [linkUrl, setLinkUrl] = React.useState("");
	const [linkSlug, setLinkSlug] = React.useState("");

	return (
		<div className={styles.container}>
			<Head>
				<title>PPI One</title>
				{/* <meta name="description" content="Generated by create next app" /> */}
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a>PPI.One</a>
				</h1>

				<LoginButton />
				<br />

				{!!session && (
					<div style={{ display: "flex", flexDirection: "column" }}>
						<label>
							URL:{" "}
							<input
								type="text"
								value={linkUrl}
								placeholder="https://corliansa.xyz"
								onChange={(e) => setLinkUrl(e.target.value)}
							/>
							<br />
						</label>
						<label>
							Slug:{" "}
							<input
								type="text"
								value={linkSlug}
								placeholder="corliansa"
								onChange={(e) => setLinkSlug(e.target.value)}
							/>
							<br />
						</label>
						<label>
							Desc:{" "}
							<input
								type="text"
								value={linkDescription}
								placeholder="My personal website"
								onChange={(e) => setLinkDescription(e.target.value)}
							/>
							<br />
						</label>
						<button
							style={{ marginTop: 6 }}
							onClick={async () => {
								const res = await fetch("/api/createLink", {
									method: "POST",
									body: JSON.stringify({
										email: session.user!.email,
										url: linkUrl,
										slug: linkSlug,
										description: linkDescription,
									}),
								});
								const data = await res.json();
								alert(JSON.stringify(data, null, 2));
								setLinkUrl("");
								setLinkSlug("");
								setLinkDescription("");
							}}
						>
							Add
						</button>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
