import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import Notepreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { QueryClient } from '@tanstack/react-query';
type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  
  const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id)
   })
   

  return (
    
      <Notepreview  id={id}/>
    
      
  );
};

export default NotePreview;