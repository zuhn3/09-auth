import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBoxProps{
    onChange: (searchQuery: string) => void,
    value: string
    
}

export default function SearchBox({onChange, value}: SearchBoxProps){
    
    const updateSearchQuery = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value.trim()), 1000
    )

    
    
    return(
        
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                onChange={updateSearchQuery}
                defaultValue={value}
                name='query'
            />
        
            
        
        
        

    )
}