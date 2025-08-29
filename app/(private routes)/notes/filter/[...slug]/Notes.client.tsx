"use client";
import css from "./NotesPage.module.css";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

type NotesClientProps = {
  initialData: NotesResponse;
  tag: string;
};

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(() => {
    setSearch("");
    setInputValue("");
    setCurrentPage(1);
  }, [tag]);

  
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 1000);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, search, tag],
    
    queryFn: () => fetchNotes(currentPage, 12, search, tag),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && search === "" ? initialData : undefined,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  useEffect(() => {
    if (isSuccess && !isLoading && notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [isSuccess, isLoading, notes.length]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(p: number) => setCurrentPage(p)}
/>
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <Toaster position="top-center" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
