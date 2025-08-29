'use client'


type Props = {
    error: globalThis.Error
}


const ErrorClient = ({error}: Props) =>{
    return(
        <p>Could not fetch note details. {error.message}</p>

    )
}

export default ErrorClient;