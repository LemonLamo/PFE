import { Menu } from '@headlessui/react'
import NotificationEntry from './NotificationEntry';

function NotificationDropdown() {
  return (
      <Menu>
          <Menu.Button className="block p-0 transition-all text-2xl ease-nav-brand text-slate-500">
              <i className="cursor-pointer fa fa-bell"></i>
          </Menu.Button>
          <Menu.Items className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft shadow-soft-3xl duration-250 min-w-80 right-[-80px] sm:right-0 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:block lg:cursor-pointer">
              <Menu.Item>
                    <NotificationEntry text="We don't know where to go So I'll just get lost with you" timestamp={new Date()} />
              </Menu.Item>
          </Menu.Items>
      </Menu>
  )
}

export default NotificationDropdown