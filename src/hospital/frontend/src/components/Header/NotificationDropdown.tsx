import { Menu, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query';
import TableLoading from '../UI/Loading';
import TableError from '../UI/Tables/TableError';
import { getNotifiations, mark_as_read } from '../../hooks/useNotifications';
import NotificationEntry from './NotificationEntry';
import { useContext, useState } from 'react';
import AlertsContext from '../../hooks/AlertsContext';

function NotificationDropdown() {
    const { showAlert } = useContext(AlertsContext);
    const [unreadCount, setUnreadCount] = useState(0);

    const notifications = useQuery<Notif[]>({
        queryKey: ['notifications'],
        queryFn: async () => {
            const notifs = await getNotifiations();
            setUnreadCount(notifs.filter((x : Notif) => !x.read_at).length);
            return notifs;
        }
    })
    
    async function submit(id: Notif["id"]){
        try{
            await mark_as_read(id);
            notifications.refetch();
        }catch(error: any){
            if (error.response)
                if(error.response?.data?.errorCode != "form-validation")
                showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
            else
                showAlert("error", error.code + ": " + error.message);
        }
    }

    return (
        <Menu>
            <Menu.Button className="relative block p-0 transition-all text-2xl ease-nav-brand text-slate-500">
                <i className="cursor-pointer fa fa-bell"></i>
                {
                    (unreadCount > 0) &&
                    <>
                        <span className='absolute w-4 h-4 rounded-full bg-red-500 bottom-0 right-[-0.4rem] text-white font-bold text-xs m-0 p-0 animate-ping'/>
                        <span className='absolute w-4 h-4 rounded-full bg-red-500 bottom-0 right-[-0.4rem] text-white font-bold text-xs m-0 p-0'>
                            {unreadCount}
                        </span>
                    </>
                    
                }
            </Menu.Button>
            <Transition
                className={"z-50"}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Menu.Items className="min-h-10 max-h-80 overflow-auto min-w-80 right-[-80px] text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer">
                    {
                    notifications.isError?
                    <TableError />:

                    notifications.isLoading?
                    <TableLoading />:
                    notifications.data?.map((n, i)=>(
                        <Menu.Item key={i}>
                            <NotificationEntry notification_id={n.id} summary={n.summary} created_at={n.created_at} isRead={n.read_at != null && n.read_at != undefined} action={submit}/>
                        </Menu.Item>
                    ))
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default NotificationDropdown