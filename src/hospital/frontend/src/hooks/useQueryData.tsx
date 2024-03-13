import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useQueryData<T>(key: string[], method: 'GET'|'POST'|'PUT'|'DELETE', url: string) {
    const result = useQuery({
        queryKey: key,
        queryFn: async () => {
            if(method=='GET')
                return (await axios.get(url)).data as T
            else if (method == 'POST')
                return (await axios.post(url)).data as T
            else if (method == 'PUT')
                return (await axios.put(url)).data as T
            else if (method == 'DELETE')
                return (await axios.delete(url)).data as T
        }
    });
    return result
}