import { fetchNotesServer } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{slug: string[]}>
  
}


export  async function generateMetadata({params}: Props): Promise<Metadata>{
  const {slug} = await params;

  let tag = slug[0].toUpperCase() === 'ALL' ? null : slug[0];
  
  if(tag === null){
      tag = 'ALL'
  }
  

  return{
    title: `Note ${tag}`,
    description: `Note tag is ${tag}`,
    openGraph:{
      title: `Note ${tag}`,
      description: `Note tag is ${tag}`,
      url: `https://notehub.com/notes/${tag}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Note ${tag}`,
      }]
    }
  }
}




const NoteByTag = async ({ params }: Props) => {
  const { slug } = await params;

  const tag = slug[0].toUpperCase() === 'ALL' ? null : slug[0];
  
  const response = await fetchNotesServer({searchText: '', pageQuery: 1, tagNote: tag});

  return (
    <div>
      {response?.notes?.length > 0 && (
        <NotesClient initialData={response} initialTag={tag || ''} />
      )}
    </div>
  );
};

export default NoteByTag;