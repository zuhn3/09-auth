'use client'


import css from './TagsMenu.module.css'
import { useState } from 'react';
import Link from 'next/link';



const TagsMenu =  () =>{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);
    const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
    
    
    
    
    return(
            <div className={css.menuContainer}>
                <button  className={css.menuButton} onClick={toggle}>
                    Notes ▾
                </button>
                
                {isOpen && (
                    <ul className={css.menuList}>
                        {categories.map((category) =>(
                            <li key={category}>
                                <Link onClick={toggle} href={`/notes/filter/${category}`}>{category}</Link>
                            
                            </li>
    
                    
                    
                        ))}
                    
                
                    </ul>
                )
                    
                
                }
                
            </div>

    )
}


export default TagsMenu;