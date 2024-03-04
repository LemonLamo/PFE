import Card from "../components/UI/Card"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import CreatePatientModal from "../components/CreatePatientModal"
import Tabs from "../components/UI/Tabs/Tabs"
import TabContent from "../components/UI/Tabs/TabContent"
import Alert from "../components/Alert"
import ProgressBar from "../components/ProgressBar"
import Table from "../components/UI/Tables/Table"
import TableEntry from "../components/UI/Tables/TableEntry"

function Test() {
  const fields = ["#", "Column 1", "Column 2", "Column 3", "Column 4", "Column 5", ""];
  const tableContent = [
    { id: "1", name: "Nadil", surname :"Marwa", age :"21ans", data1 :"jsp", data2 :"jsp", data3: "idk"},
    { id: "2", name : "Brahim", surname :"Abderrazak", age :"22ans", data1 :"jsp", data2 :"jsp", data3: "idk"}
  ]
  return (
    <>
      <Card title="New Patient dynamic" action=<CreatePatientModal/> >
        <Table fields={fields}>
          { tableContent.map((item : any) => 
            <TableEntry data={Object.values(item)} />)
          }
        </Table>
      </Card>

      <Card title="Lets test out some stuff" subtitle="Alerts & progress bars">
        <Alert color="bg-red-600"> DANGER! </Alert>
        <ProgressBar title="Hi" color="bg-fuchsia-400" perc={69}></ProgressBar>
      </Card>
      
      <Card title="New patient" subtitle="You wanna add a new patient huh?">
        <Tabs>
          <TabContent icon="fa fa-bell" text="Profile">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Tab</h3>
            <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <p>The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
          </TabContent>
          <TabContent icon="fa fa-user" text="Dashboard">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard Tab</h3>
            <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <p>The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
          </TabContent>
          <TabContent icon="fa fa-bell" text="Dashboard2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Batata</h3>
            <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <p>The tab JavaScript swaps classNamees to control the content visibility and styling.</p>
          </TabContent>
        </Tabs>
      </Card>

      <Card title="Idk" subtitle="This is a quick subtitle">
        <Timeline>
          <TimelineItem icon="fa fa-bell text-red-500" title="$2400, Design changes">
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">Wallahi idk</p>
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">Now we can fit more info</p>
          </TimelineItem>

          <TimelineItem icon="fa fa-bell text-red-500" title="Or not">
          </TimelineItem>

          <TimelineItem icon="fa fa-bell text-red-500" title="Depends">
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">As you like</p>
          </TimelineItem>
        </Timeline>
      </Card>
    </>
  )
}

export default Test