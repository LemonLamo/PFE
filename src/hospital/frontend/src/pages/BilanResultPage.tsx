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
                return <TabContent icon='fa fa-x-ray' text={`Pièce jointe N°${i+1}`} key={i} className="!p-0 !mb-0">
                            <iframe className='w-full h-[100vh]' src={`${baseURL}/api/bilans/${id}/results/${i+1}`}>

                            </iframe>
                            <div className='bg-gray-50/100 absolute bottom-0 left-[19vw] right-0 p-4'>
                                <div className="w-1/4 font-bold">Observations:</div>
                                <textarea className="primary" rows={3} placeholder="Observations" value={"Sdqsd"} disabled/>
                            </div>
                        </TabContent>
                })
            }
        </Tabs>
    )
}

export default BilanResultPage