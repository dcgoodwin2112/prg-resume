import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getContent } from "../lib/api";

export default function Home({
  certifications,
  education,
  experience,
  publications,
  invitedTalks,
  funding,
}) {
  const scrollBreakpoint = 400;
  const [scrollPos, setScrollPos] = useState("top");

  useEffect(() => {
    const handleScroll = (e) => {
      const scroll = window.scrollY;
      if (scroll < scrollBreakpoint && scrollPos !== "top") {
        setScrollPos("top");
      } else if (scroll >= scrollBreakpoint && scrollPos !== "scroll") {
        setScrollPos("scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollPos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dr. Prairie Rose Goodwin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header scrollPos={scrollPos} />
      <main className={styles.main}>
        <div className={styles.grid}>
          <Section {...education} />
          <Section {...certifications} />
          <Section {...experience} />
          <Section {...publications} />
          <Section {...invitedTalks} />
          <Section {...funding} />
        </div>
      </main>
      <footer className={styles.siteFooter}>
        <hr />
        &copy;{new Date().getFullYear()}
      </footer>
    </div>
  );
}

export function Header({ scrollPos }) {
  return (
    <header className={styles[`header-${scrollPos}`]}>
      {scrollPos == "top" && (
        <Image src="/prairie-rose-cropped.jpg" width="262px" height="400px" alt="Photo of Dr. Prairie Rose Goodwin" />
      )}

      <div className={styles[`contact-info-${scrollPos}`]}>
        <h1>Dr. Prairie Rose Goodwin</h1>
        <p className={styles[`job-title-${scrollPos}`]}>
          Sr. Product Developer and Computer Science Professor
        </p>
        {scrollPos == "top" && (
          <>
            <p className={styles.location}>Apex, NC</p>
            <p>
              <a
                href="https://www.linkedin.com/in/prairie-rose-goodwin-2589b648"
                target="_blank"
              >
                LinkedIn
              </a>
            </p>
          </>
        )}
      </div>
    </header>
  );
}

export function Section({ data: { title }, html }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={styles.sectionContent}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
}

export async function getStaticProps() {
  const certifications = await getContent("certifications");
  const education = await getContent("education");
  const experience = await getContent("experience");
  const publications = await getContent("publications");
  const invitedTalks = await getContent("invitedTalks");
  const funding = await getContent("funding");

  return {
    props: {
      certifications,
      education,
      experience,
      publications,
      invitedTalks,
      funding,
    },
  };
}
