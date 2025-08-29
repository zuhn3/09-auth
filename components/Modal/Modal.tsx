'use client'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'
import type React from 'react'
import { useEffect } from 'react'
interface ModalProps{
    onClose: () => void
     
    children?: React.ReactNode;

}



const BoxModal = ({children}: {children?: React.ReactNode}) =>{
    return(
        <div className={css.modal} >

        {children}         
    </div>
    )
    
    
}

export default function Modal({onClose, children}: ModalProps){

    

    const handleClickBackDrop = (event: React.MouseEvent<HTMLDivElement>) =>{
        if(event.target == event.currentTarget){
            onClose();
        }
    }

    useEffect(() =>{
        const handleKeyDown = (event: KeyboardEvent) =>{
            if(event.key === 'Escape'){
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () =>{
            document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        }
    }, [onClose])
   
    

    




    return(
        createPortal(
            <div
            onClick={handleClickBackDrop}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            >
                <BoxModal>
                    {children}
                </BoxModal>
                    
                
            </div>,

    document.body
)
    )
    
}