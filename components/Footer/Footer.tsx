import Link from "next/link";
import css from './Footer.module.css'



const Footer = () =>{
    return(
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Andrii Panchenko</p>
                    <p>
                        Contact us:
                        <Link href="mailto:student@notehub.app">aop1603@gmail.com</Link>
                    </p>
                </div>
            </div>
        </footer>

    )
}


export default Footer;