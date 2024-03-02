import { Menu } from '@headlessui/react'
import user from '../../assets/user.svg'
import NotificationDropdown from './NotificationDropdown';

function Header() {

    return <nav className="pr-2 relative flex bg-white flex-wrap items-center justify-between py-2 transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
                <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                    <li className="leading-normal text-sm">
                        <a className="opacity-50 text-slate-700">Pages</a>
                    </li>
                    <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']">
                        Dashboard
                    </li>
                </ol>
                <h6 className="mb-0 font-bold capitalize">
                    Dashboard
                </h6>
            </nav>
            <div className="flex justify-end  mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full gap-4">
                    <li className="relative flex items-center">
                        <NotificationDropdown></NotificationDropdown>
                    </li>
                    <li className="relative flex items-center">
                        <Menu>
                            <Menu.Button className="block p-0 transition-all text-2xl ease-nav-brand text-slate-500">
                                <img src={user} width="32px" />
                            </Menu.Button>
                            <Menu.Items className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer">
                                <div className="block px-4 py-2 text-xs text-gray-400">
                                    Manage Account
                                </div>
                                <Menu.Item>
                                    <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition" href="profile">Profile</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition" href="profile">Log out</a>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </li>
                    <li className="flex items-center xl:hidden">
                        <a href="javascript:;" className="block p-0 transition-all ease-nav-brand text-sm text-slate-500">
                            <div className="w-4.5 overflow-hidden">
                                <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}

export default Header;