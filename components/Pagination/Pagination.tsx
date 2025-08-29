
"use client";

import React from "react";
import styles from "./Pagination.module.css"; 

export type PaginationProps = {
 
  currentPage: number;

  totalPages: number;
  
  onPageChange: (page: number) => void;
};


const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const clamp = (p: number) => Math.max(1, Math.min(totalPages, p));

  const goTo = (p: number) => {
    const next = clamp(p);
    if (next !== currentPage) onPageChange(next);
  };

  
  const pages: Array<number | "dots"> = [];
  const add = (n: number | "dots") => pages.push(n);

  const siblings = 1; 
  const start = Math.max(1, currentPage - siblings);
  const end = Math.min(totalPages, currentPage + siblings);

  
  add(1);
  if (start > 2) add("dots");

  
  for (let p = start; p <= end; p++) {
    if (p !== 1 && p !== totalPages) add(p);
  }

  
  if (end < totalPages - 1) add("dots");
  if (totalPages > 1) add(totalPages);

  return (
    <nav
      className={styles?.root ?? ""}
      aria-label="Pagination"
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "dots" ? (
          <span key={`dots-${idx}`} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => goTo(p)}
            aria-current={p === currentPage ? "page" : undefined}
            style={{
              fontWeight: p === currentPage ? 700 : 400,
              textDecoration: p === currentPage ? "underline" : "none",
            }}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
