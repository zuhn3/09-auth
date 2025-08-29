type Props = {
    children: React.ReactNode
    sidebar: React.ReactNode
}


const NotesLayout = ({children, sidebar}: Props) =>{
    return(
        <section>
            <div>
                {sidebar}
                {children}
                
            </div>
        </section>
    )
}


export default NotesLayout