import Card from "../components/UI/Card"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import Table from "../components/UI/Table"
import CreatePatientModal from "../components/CreatePatientModal"
import Tabs from "../components/UI/Tabs/Tabs"
import TabContent from "../components/UI/Tabs/TabContent"

function Test() {

  return (
    <>
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
      <Card title="New Patient" action=<CreatePatientModal/> >
        <Table></Table>
      </Card>
    </>
  )
}

export default Test