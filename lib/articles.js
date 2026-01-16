import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";

import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

// upgrades
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

const articlesDirectory = path.join(process.cwd(), "articles");

export function getAllArticleParams() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ""),
  }));
}

export function getSortedArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

export async function getArticleData(id) {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // Convert markdown -> HTML
  const processedContent = await remark()
    // GitHub-flavoured markdown: tables, strikethrough, task lists, etc.
    .use(remarkGfm)

    // md -> hast
    .use(remarkRehype, { allowDangerousHtml: true })

    // allow raw HTML inside markdown (your <img>, <audio>, etc)
    .use(rehypeRaw)

    // add ids to headings (needed for anchors/progress targets later if desired)
    .use(rehypeSlug)

    // external links open in new tab safely (optional but sensible for long-form)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })

    // hast -> html
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // --- Reading time (simple + good enough) ---
  // Strip tags and estimate words/min. No "fake precision".
  const textOnly = contentHtml
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = textOnly ? textOnly.split(" ").length : 0;
  const minutesToRead = Math.max(1, Math.round(wordCount / 220));

  return {
    id,
    contentHtml,
    topics: matterResult.data.topics ?? [],
    minutesToRead,
    wordCount,
    ...matterResult.data,
  };
}
