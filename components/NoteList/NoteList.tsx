'use client'

import css from './NoteList.module.css'
import { deleteNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Note } from '../../types/note'
import Link from 'next/link'
interface NoteListProps{
    notes: Note[] 
}
type idNote = Note['id']

export default function NoteList({notes}: NoteListProps){
    

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['notes']})
            
        }
        
    })

    const handleDeleteTask = (id: idNote) =>{
        mutation.mutate(id)
    }

    

    return (
        <>
        <ul className={css.list}>
            {notes !== undefined &&
                notes.map((card) =>(
                    <li className={css.listItem} key={`card-${card.id}`}>
                            <h2 className={css.title}>{card.title}</h2>
                            <p className={css.content}>{card.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{card.tag}</span>
                                <Link href={`/notes/${card.id}`}>View details</Link>
                                <button onClick={() => handleDeleteTask(card.id)} className={css.button}>Delete</button>
                            </div>
                        </li>
                ))
            
            }

        </ul>
        
        
        </>
        
        
    )
}