import Link from "next/link";
import css from './Header.module.css'
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";


const Header = async () =>{
    
    
    
    return(
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <AuthNavigation/>
                    <li>
                        <TagsMenu/>
                    </li>
                </ul>
            </nav>
        </header>

    )
}


export default Header;