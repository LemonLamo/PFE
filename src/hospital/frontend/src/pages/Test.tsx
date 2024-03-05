import Card from "../components/UI/Card"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import Tabs from "../components/UI/Tabs/Tabs"
import TabContent from "../components/UI/Tabs/TabContent"
import Alert from "../components/UI/Alert"
import ProgressBar from "../components/UI/ProgressBar"
import Table from "../components/UI/Tables/Table"
import CreateModal from "../components/Modals/CreateModal"
import ViewModal from "../components/Modals/ViewModal"
import EditModal from "../components/Modals/EditModal"
import DeleteModal from "../components/Modals/DeleteModal"
import TableRow from "../components/UI/Tables/TableRow"
import TableCell from "../components/UI/Tables/TableCell"

function Test() {
  const fields = ["#", "Column 1", "Column 2", "Column 3", "Column 4", "Column 5", ""];
  const tableContent = [
    { id: "1", name: "Nadil", surname :"Marwa", age :"21ans", data1 :"jsp", data2 :"jsp", data3: "idk"},
    { id: "2", name : "Brahim", surname :"Abderrazak", age :"22ans", data1 :"jsp", data2 :"jsp", data3: "idk"}
  ]

  const createModal = <>
    <CreateModal onCreate={() => alert("Created")} onCancel={() => console.log("Cancelled create")}>
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Create agent</h3>
      <p className="text-gray-600">Here is the form.</p>
    </CreateModal>
  </>
  return (
    <>
      <Card title="New Patient dynamic" action={createModal} >
        <Table fields={fields}>
          {tableContent.map((a) => (
            <TableRow>
              <TableCell> {a.id} </TableCell>
              <TableCell> {a.name} </TableCell>
              <TableCell> {a.surname} </TableCell>
              <TableCell> {a.age} </TableCell>
              <TableCell> {a.data1} </TableCell>
              <TableCell> {a.data2} </TableCell>
              <TableCell> {a.data3} </TableCell>

              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => console.log("Viewing "+a.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">View agent</h3>
                </ViewModal>

                <EditModal onOpen={() => console.log("Editing " + a.id)} onEdit={() => console.log("Edited " + a.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Edit agent</h3>
                  <p className="text-gray-600">Here is some more more info.</p>
                </EditModal>

                <DeleteModal onOpen={() => console.log("Deleting "+ a.id)} onDelete={() => console.log("Deleted " + a.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Agent</h3>
                  <p className="text-gray-600">Are you sure you want to delete this record? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
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
          <TimelineItem icon="fa fa-bell text-red-500" title="$2400, Design changes" date={new Date()}>
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">Wallahi idk</p>
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">Now we can fit more info</p>
          </TimelineItem>

          <TimelineItem icon="fa fa-bell text-red-500" title="Or not" date={new Date()}>
          </TimelineItem>

          <TimelineItem icon="fa fa-bell text-red-500" title="Depends" date={new Date()}>
            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">As you like</p>
          </TimelineItem>
        </Timeline>
      </Card>
    </>
  )
}

export default Test