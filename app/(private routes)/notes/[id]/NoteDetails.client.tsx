'use client'
import { fetchNoteById } from '@/lib/api/clientApi';
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query";
import css from './NoteDetails.module.css'


const NoteDetailsClient = () =>{
    
    const {id} = useParams<{id: string}>();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    })



    if(isLoading){
        return(
            <p>Loading, please wait...</p>
        )
    }

    if(isError || !data){
        return(
            <p>Something went wrong.</p>
        )
        
    }

    return(
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{data?.title}</h2>
                </div>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>{data?.createdAt}</p>
            </div>
        </div>

    )

}



export default NoteDetailsClient;