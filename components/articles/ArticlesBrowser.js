"use client";

import { useMemo, useState, useEffect } from "react";
import Articles from "./Articles";
import styles from "./ArticlesBrowser.module.css";

const PAGE_SIZE = 9;

function normaliseTopics(topics) {
  if (!topics) return [];
  if (Array.isArray(topics)) return topics;
  // allow a single string in frontmatter without breaking
  return [String(topics)];
}

export default function ArticlesBrowser({ allArticlesData }) {
  const [q, setQ] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allTopics = useMemo(() => {
    const set = new Set();
    for (const a of allArticlesData) {
      for (const t of normaliseTopics(a.topics)) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allArticlesData]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const hasTopics = selectedTopics.length > 0;

    return allArticlesData.filter((a) => {
      const topics = normaliseTopics(a.topics);

      // topic filter (OR)
      if (hasTopics) {
        const matchesTopic = topics.some((t) => selectedTopics.includes(t));
        if (!matchesTopic) return false;
      }

      // search filter
      if (!query) return true;
      const hay = `${a.title ?? ""} ${a.summary ?? ""} ${a.author ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, selectedTopics, allArticlesData]);

  // reset pagination when filters/search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q, selectedTopics]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  function toggleTopic(topic) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function clearAll() {
    setQ("");
    setSelectedTopics([]);
  }

  const showingAll = visibleCount >= filtered.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <input
            className={styles.search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
          />

          <span className={styles.count} title="Results">
            {filtered.length}
          </span>
        </div>

        {allTopics.length > 0 && (
          <div className={styles.pills} aria-label="Filter by topic">
            {(q || selectedTopics.length > 0) && (
              <button type="button" className={styles.pillClear} onClick={clearAll}>
                Clear ✕
              </button>
            )}

            {allTopics.map((t) => {
              const active = selectedTopics.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  className={active ? styles.pillActive : styles.pill}
                  onClick={() => toggleTopic(t)}
                  aria-pressed={active}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}

        <p className={styles.helper}>
          Showing {Math.min(visible.length, filtered.length)} of {filtered.length}
          {filtered.length !== allArticlesData.length
            ? ` (from ${allArticlesData.length} total)`
            : ""}
        </p>
      </div>

      <Articles allArticlesData={visible} />

      {!showingAll && (
        <div className={styles.loadMoreRow}>
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
