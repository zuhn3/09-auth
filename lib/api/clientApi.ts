import { nextServer } from "./api";
import type { NewNoteData, Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}


export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
};

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};