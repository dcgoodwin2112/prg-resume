import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import markdownToHtml from "./markdownToHtml"

const contentDir = join(process.cwd(), "markdown");

const SECTIONS = [
  // contact: 'contact.md',
  "certifications",
  "education",
  "experience",
  "publications",
  "invitedTalks",
  "funding",
];

export async function getContent(section) {
  if (!SECTIONS.includes(section)) {
    throw new Error(`Invalid section name`);
  }

  const fullPath = join(contentDir, `${section}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const html = await markdownToHtml(content)
  return { data, html };
}
