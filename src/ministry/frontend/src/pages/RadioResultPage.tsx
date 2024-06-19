import { useQuery } from '@tanstack/react-query'
import Tabs from '../components/UI/Tabs'
import TabContent from '../components/UI/Tabs/TabContent'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../config';
import TableLoading from '../components/UI/Loading';
import TableError from '../components/UI/Tables/TableError';
import { useState } from 'react';

function RadioResultPage() {
    const { id } = useParams();
    const [observations, setObservations] = useState('');

    const radios = useQuery({
        queryKey: ["radios" + id],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/radios/${id}/results`)).data;
            setObservations(data.observations)
            return data.results;
        }
    })

    return (
        <Tabs>
            {
                radios.isError ?
                    <TableError /> :
                    radios.isLoading ?
                        <TableLoading /> :
                        radios.data.map((_: any, i: number) => {
                            return <TabContent icon='fa fa-x-ray' text={`Pièce jointe N°${i + 1}`} key={i} className="!p-0">
                                <img className='w-full aspect-[16/9]' src={`${baseURL}/api/radios/${id}/results/${i + 1}`} />
                                <div className='bg-gray-50/100 absolute bottom-0 left-[19vw] right-0 p-4'>
                                    <div className="w-1/4 font-bold">Observations:</div>
                                    <textarea className="primary" rows={3} placeholder="Observations" value={observations} disabled />
                                </div>
                            </TabContent>
                        })
            }
        </Tabs>
    )
}

export default RadioResultPage