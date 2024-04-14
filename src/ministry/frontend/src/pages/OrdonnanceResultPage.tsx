import { useParams } from 'react-router-dom';
import { baseURL } from '../config';

function OrdonnanceResultPage() {
    const { id } = useParams();

    return (
        <iframe className='w-[100vw] h-[100vh]' src={`${baseURL}/api/prescriptions/ordonnances/${id}`} />
    )
}

export default OrdonnanceResultPage
