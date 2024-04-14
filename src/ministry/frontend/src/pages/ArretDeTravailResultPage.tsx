import { useParams } from 'react-router-dom';
import { baseURL } from '../config';

function ArretDeTravailResultPage() {
    const { id } = useParams();

    return (
        <iframe className='w-[100vw] h-[100vh]' src={`${baseURL}/api/prescriptions/arret-de-travail/${id}`} />
    )
}

export default ArretDeTravailResultPage
