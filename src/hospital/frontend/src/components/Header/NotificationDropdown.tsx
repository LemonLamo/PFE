import { Menu, Transition } from '@headlessui/react'
import NotificationEntry from './NotificationEntry';
import { useQuery } from '@tanstack/react-query';
import TableLoading from '../UI/Loading';
import TableError from '../UI/Tables/TableError';
import { getNotifiations } from '../../hooks/useNotifications';

function NotificationDropdown() {
    const notifications = useQuery<Notif[]>({
        queryKey: ['notifications'],
        queryFn: getNotifiations
    })
    return (
        <Menu>
            <Menu.Button className="block p-0 transition-all text-2xl ease-nav-brand text-slate-500">
                <i className="cursor-pointer fa fa-bell"></i>
            </Menu.Button>
            <Transition
                className={"z-50"}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Menu.Items className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft shadow-soft-3xl duration-250 min-w-80 right-[-80px] sm:right-0 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:block lg:cursor-pointer">
                    {
                    notifications.isError?
                    <TableError />:

                    notifications.isLoading?
                    <TableLoading />:
                    notifications.data?.map((n, i)=>(
                        <Menu.Item key={i}>
                            <NotificationEntry text={n.summary} timestamp={n.created_at} />
                        </Menu.Item>
                    ))
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default NotificationDropdown