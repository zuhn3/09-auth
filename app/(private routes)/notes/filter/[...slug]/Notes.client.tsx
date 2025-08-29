'use client'
import css from './App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { useDebounce } from 'use-debounce'
import SearchBox from '@/components/SearchBox/SearchBox'
import  React, { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api/clientApi';
import Pagination from '@/components/Pagination/Pagination'
import { Note } from '@/types/note'
import Link from 'next/link'


interface NotesClientProps {
    initialData: {
        totalPages: number
        notes: Note[]
    }
    initialTag: string | null
    
}
export default function NotesClient({initialData, initialTag}: NotesClientProps){
    
    
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [pageQuery, setCurrentPage] = useState<number>(1);
    const [searchText] = useDebounce(
        searchQuery,
        300,
    )

        
    

    

     
    
        
     const {data} = useQuery({
        queryKey: ['notes', searchText, pageQuery, initialTag],
        queryFn: () => fetchNotes({
            ...(searchText.trim() ? {searchText: searchText}: {}),
            pageQuery: pageQuery,
            tagNote: initialTag
        }),
        placeholderData: keepPreviousData, initialData
    })


    
    
    

    

   
    

    const totalPages = data?.totalPages ?? 0;
    console.log(totalPages);

    
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery}  onChange={(value) =>{
                    setSearchQuery(value);
                    setCurrentPage(1)
                }}/>
                
                    <Link href={`/notes/action/create`} className={css.button}>
                        <button className={css.button} type='button'>
                            Create note +
                        </button>
                    </Link>
                    
                

                
            </header>
            {data?.notes && data?.notes.length > 0 
                ? <NoteList notes={data?.notes}/>
                : <p>No notes found.</p>
            }
            {totalPages !== undefined && totalPages > 1 &&
                <Pagination totalPages={totalPages} currentPage={pageQuery} onPageSelect={setCurrentPage}/>

            }
            
            
            
            
        </div>

    )
}