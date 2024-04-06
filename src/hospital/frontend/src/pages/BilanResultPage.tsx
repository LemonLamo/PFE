import { useQuery } from '@tanstack/react-query'
import Tabs from '../components/UI/Tabs'
import TabContent from '../components/UI/Tabs/TabContent'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../config';
import TableLoading from '../components/UI/Loading';
import TableError from '../components/UI/Tables/TableError';

function BilanResultPage() {
    const { id } = useParams();

    const bilans = useQuery({
        queryKey: ["bilans"+id],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/bilans/${id}/results`)).data;
            return data;
        }
    })

    return (
        <Tabs>
            {
                bilans.isError?
                <TableError />:
                bilans.isLoading?
                <TableLoading />:
                bilans.data.map((_ : any, i : number)=>{
                    return <TabContent icon='fa fa-x-ray' text={`Radio N°${i+1}`} key={i}>
                                <iframe className='w-full aspect-[16/9]' src={`${baseURL}/api/bilans/${id}/results/${i+1}`}>

                                </iframe>
                            </TabContent>
                })
            }
        </Tabs>
    )
}

export default BilanResultPage