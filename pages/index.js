import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getContent } from "../lib/api";

export default function Home({
  education,
  experience,
  publications,
  invitedTalks,
  funding,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Image src="/prairie-rose.jpeg" width="302px" height="403px" />
        <div className={styles.contactInfo}>
          <h1>Dr. Prairie Rose Goodwin</h1>
          <p>Sr. Product Developer and Computer Science Professor</p>
          <p>Apex, NC</p>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Section {...education} />
          <Section {...experience} />
          <Section {...publications} />
          <Section {...invitedTalks} />
          <Section {...funding} />
        </div>
      </main>
    </div>
  );
}

export function Section({ data: { title }, html }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: html }}></div>
    </section>
  );
}

export async function getStaticProps() {
  const education = await getContent("education");
  const experience = await getContent("experience");
  const publications = await getContent("publications");
  const invitedTalks = await getContent("invitedTalks");
  const funding = await getContent("funding");

  return {
    props: {
      education,
      experience,
      publications,
      invitedTalks,
      funding,
    },
  };
}
