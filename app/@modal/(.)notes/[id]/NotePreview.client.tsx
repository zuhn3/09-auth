'use client'
import { useRouter } from 'next/navigation';
import { useQuery} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import css from './NotePreview.module.css'

interface NoteModalPreviewProps{
    id: string,
    
    
}



const NoteModalPreview = ({id}: NoteModalPreviewProps) =>{

    const router = useRouter();
    const handleClose = () => router.back();

    

    const {data, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    })


    if(isLoading){
        return(
          
            <Modal onClose={handleClose}>
                <p>Loading...</p>
            </Modal>
          
            
        )
    }

    if(error){
        return(
          
            <Modal onClose={handleClose}>
                <p>Something went wrong...</p>
            </Modal>
          
        )
        
    }


    return(
      <>
        {data !== undefined &&
            <Modal onClose={handleClose}>
            <div className={css.container}>
              <div className={css.item}>
                <div className={css.header}>
                  <h2>{data.title}</h2>
                </div>
                <div>
                  <p className={css.content}>{data.content}</p>
                </div>
              </div>
              <div className={css.infoDiv}>
                <button className={css.backBtn} onClick={handleClose}>Close</button>
                <p className={css.tag}>{data.tag}</p>
                <p className={css.date}>{data.createdAt.slice(0, 10)}</p>
              </div>
              
                
              
            </div>
          </Modal>
            
          }

        </>
        

      
      
    )

}


export default NoteModalPreview;