import Card from "../components/UI/Card"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import Tabs from "../components/UI/Tabs/Tabs"
import TabContent from "../components/UI/Tabs/TabContent"
import Alert from "../components/UI/Alert"
import ProgressBar from "../components/UI/ProgressBar"
import Table from "../components/UI/Tables/Table"
import TableRow from "../components/UI/Tables/TableRow"
import TableCell from "../components/UI/Tables/TableCell"
import SmallCalendar from "../components/Calendar/SmallCalendar"
import { useState } from "react"
import Select from "../components/Select"

function Test() {
  const fields = [
    "#",
    "Column 1",
    "Column 2",
    "Column 3",
    "Column 4",
    "Column 5",
    "",
  ];
  const tableContent = [
    { id: "1", name: "Nadil", surname :"Marwa", age :"21ans", data1 :"jsp", data2 :"jsp", data3: "idk"},
    { id: "2", name : "Brahim", surname :"Abderrazak", age :"22ans", data1 :"jsp", data2 :"jsp", data3: "idk"}
  ]

  const createModal = <>
    <button className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle hospitalisation</span>
    </button>
  </>

  const options  = [
    { key: 'CM101', value: 'Appendectomie' },
    { key: 'CM102', value: 'Cataract' },
    { key: 'CM103', value: 'Bypass' },
  ]
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <>
      <Card title="testing new select" className="w-full">
        <Select options={options} state={selectedOption} onChange={setSelectedOption} placeholder="herba derb"></Select>
      </Card>
      <Card title="New Patient dynamic" action={createModal} className="w-full">
        <Table fields={fields}>
          {tableContent.map((a, i) => (
            <TableRow key={i}>
              <TableCell> {a.id} </TableCell>
              <TableCell> {a.name} </TableCell>
              <TableCell> {a.surname} </TableCell>
              <TableCell> {a.age} </TableCell>
              <TableCell> {a.data1} </TableCell>
              <TableCell> {a.data2} </TableCell>
              <TableCell> {a.data3} </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
      <Card title="Lets test out some stuff" subtitle="Alerts & progress bars" className="w-full">
        <Alert color="bg-red-600"> DANGER! </Alert>
        <ProgressBar title="Hi" color="bg-fuchsia-400" perc={69}></ProgressBar>
      </Card>
      <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
        <Tabs>
          <TabContent icon="fa fa-bell" text="Profile">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Profile Tab
            </h3>
            <p className="mb-2">
              This is some placeholder content the Profile tab's associated
              content, clicking another tab will toggle the visibility of this
              one for the next.
            </p>
            <p>
              The tab JavaScript swaps classNamees to control the content
              visibility and styling.
            </p>
          </TabContent>
          <TabContent icon="fa fa-user" text="Dashboard">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Tab
            </h3>
            <p className="mb-2">
              This is some placeholder content the Profile tab's associated
              content, clicking another tab will toggle the visibility of this
              one for the next.
            </p>
            <p>
              The tab JavaScript swaps classNamees to control the content
              visibility and styling.
            </p>
          </TabContent>
          <TabContent icon="fa fa-bell" text="Dashboard2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Batata
            </h3>
            <p className="mb-2">
              This is some placeholder content the Profile tab's associated
              content, clicking another tab will toggle the visibility of this
              one for the next.
            </p>
            <p>
              The tab JavaScript swaps classNamees to control the content
              visibility and styling.
            </p>
          </TabContent>
        </Tabs>
      </Card>
      <Card title="Idk" subtitle="This is a quick subtitle" className="w-full">
        <Timeline>
          <TimelineItem
            icon="fa fa-bell text-red-500"
            title="$2400, Design changes"
            date={new Date()}
          >
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
              Wallahi idk
            </p>
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
              Now we can fit more info
            </p>
          </TimelineItem>

          <TimelineItem
            icon="fa fa-bell text-red-500"
            title="Or not"
            date={new Date()}
          ></TimelineItem>

          <TimelineItem
            icon="fa fa-bell text-red-500"
            title="Depends"
            date={new Date()}
          >
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
              As you like
            </p>
          </TimelineItem>
        </Timeline>
      </Card>
      <Card title="Testing smoll calendar" className="w-full">
        <SmallCalendar />
      </Card>
    </>
  );
}

export default Test;
