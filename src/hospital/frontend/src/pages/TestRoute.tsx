import { Fragment } from "react/jsx-runtime";
import Card from "../components/UI/Card";
import Table from "../components/UI/Tables/Table";
import TableCell from "../components/UI/Tables/TableCell";
import TableRow from "../components/UI/Tables/TableRow";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function TestRoute() {
  return (
    <>
      <Card title="Testing route v2.0 REVAMPED" className="w-full max-w-4xl">
        <Table fields={["Nom", "Prénom", "Test", "Actions"]}>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
            <TableCell>C</TableCell>
            <TableCell>
              <Menu>
                <Menu.Button className="flex items-center justify-between rounded-md bg-cyan-400 px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 font-semibold">
                  Actions
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-white" aria-hidden="true"/>
                </Menu.Button>
                <div className="relative">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute w-full divide-y divide-gray-100 rounded-b-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="">
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                              <i className="fa fa-briefcase-medical w-4 mr-2" /> Soin
                            </button>)}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                              <i className="fa fa-briefcase-medical w-4 mr-2" /> Soin 2
                            </button>)}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                              <i className="fa fa-briefcase-medical w-4 mr-2" /> Soin 3
                            </button>)}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </>
  );
}

export default TestRoute;
