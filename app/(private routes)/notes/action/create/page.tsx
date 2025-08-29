
import { Metadata } from 'next';
import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
    title: 'Create note',
    description: 'Create note page',
    openGraph:{
        url: '/notes/action/create',
        images: [{
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Create note page'
          }],
    }
}
const CreateNote = () =>{
    

    
    return(
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>

    )
}


export default CreateNote;