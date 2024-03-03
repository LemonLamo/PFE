import Card from "../components/UI/Card"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import Table from "../components/UI/Table"
import ModalTrigger from "../components/UI/ModalTrigger"

function NouveauPatient() {
  return (
    <>
      <Card title="Idk" subtitle="This is a quick subtitle">
        <Timeline>
          <TimelineItem icon="fa fa-bell text-red-500" title="$2400, Design changes" subtitle="Idk"/>
          <TimelineItem icon="fa fa-bell text-red-500" title="$2400, Design changes" subtitle="Idk" />
          <TimelineItem icon="fa fa-bell text-red-500" title="$2400, Design changes" subtitle="Idk" />
        </Timeline>
      </Card>
      <Card title="New Patient" action={<ModalTrigger icon="fa fa-plus" text="New"/>}>
        <Table></Table>
      </Card>
    </>
  )
}

export default NouveauPatient