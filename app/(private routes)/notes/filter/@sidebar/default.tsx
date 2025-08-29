import css from './SidebarNotes.module.css'
import Link from 'next/link';


const SidebarNotes = async () =>{

    const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
    return(
        
        
        <div>
            <ul className={css.menuList}>
                {categories.map((category) =>(
                    <li key={category} className={css.menuItem}>
                        <Link className={css.menuLink} href={`/notes/filter/${category}`}>
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        
          
          
    
    )
}


export default SidebarNotes;