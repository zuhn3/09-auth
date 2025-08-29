import { nextServer } from "./api";
import type { Note } from "@/types/note";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: 12,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};