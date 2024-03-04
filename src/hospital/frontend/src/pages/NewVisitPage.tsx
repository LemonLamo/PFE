import Card from "../components/UI/Card"
import Tabs from "../components/UI/Tabs/Tabs"
import TabContent from "../components/UI/Tabs/TabContent"
import profile from "../assets/profile.jpg"
import Timeline from "../components/UI/Timeline/Timeline"
import TimelineItem from "../components/UI/Timeline/TimelineItem"
import TableEntry from "../components/UI/Tables/TableEntry"
import Table from "../components/UI/Tables/Table"
import moment from "moment"
function NewVisitPage() {

  return (
    <>
      <Card title="Who is this visit for?" subtitle="Pick a patient, any patient" className="flex">
        <div className="relative flex transition-all rounded-sm ease-soft">
          <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
            <i className="fas fa-user" aria-hidden="true"></i>
          </span>
          <input type="text" className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search for a patient..." />
        </div>
      </Card>
      <Card title="New patient" subtitle="You wanna add a new patient huh?">
        <Tabs>
          <TabContent icon="fa fa-user" text="Informations personnelles">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Informations personnelles</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <div className="flex flex-row gap-x-2 w-full">
              <div className="">
                <img src={profile} style={{width: "10rem", aspectRatio: 3.5/4.5}} />
              </div>
              <ul className="grid grid-cols-12 grid-rows-2 gap-x-2">
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Nom:</strong>
                  <p className="mb-0">Kennedy</p>
                </li>
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Prénom:</strong>
                  <p className="mb-0">Leon</p>
                </li>
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Age:</strong>
                  <p className="mb-0">21ans</p>
                </li>
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Date naiss:</strong>
                  <p className="mb-0">13/07/2001</p>
                </li>
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Sexe:</strong>
                  <p className="mb-0">Male</p>
                </li>
                <li className="flex flex-col col-span-2">
                  <strong className="text-slate-700">Situation:</strong>
                  <p className="mb-0">Célébataire</p>
                </li>
                <li className="flex flex-col col-span-3">
                  <strong className="text-slate-700">Email:</strong>
                  <p className="mb-0">brahim.abderrazak1307@gmail.com</p>
                </li>
                <li className="flex flex-col col-span-3">
                  <strong className="text-slate-700">Phone:</strong>
                  <ul className="ps-4 list-disc">
                    <li>(+213) 549297666</li>
                    <li>(+213) 549297666</li>
                  </ul>
                </li>
                <li className="flex flex-col col-span-3">
                  <strong className="text-slate-700">Addresse:</strong>
                  <p>22 BD Laichi Abdellah, Blida 09000, Algerie</p>
                </li>
                <li className="flex flex-col col-span-3">
                  <strong className="text-slate-700">Urgence:</strong>
                  <ul className="ps-4 list-disc">
                    <li>(+213) 549297666</li>
                    <li>(+213) 549297666</li>
                  </ul>
                </li>
              </ul>
            </div>
          </TabContent>
          
          <TabContent icon="fa fa-user" text="Historique médicale">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Historique médicale</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <Timeline>
              <TimelineItem icon="fa fa-bell text-red-500" title="Hospitalization" date={new Date()}>
                <p className="mb-0 font-semibold leading-tight text-xs text-justify text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis elementum eros id maximus. Nam commodo dolor venenatis nunc tempus porta. Quisque nibh leo, finibus eget dui ut, blandit euismod mauris. Pellentesque semper sem vel velit facilisis sodales et vitae nisi. Integer orci quam, ultrices ac convallis in, vehicula eu turpis. Pellentesque rutrum id neque sit amet vestibulum. Curabitur at varius mi.</p>
              </TimelineItem>

              <TimelineItem icon="fa fa-bell text-yellow-400" title="Consultaiton" date={new Date()}>
                <p className="mb-0 font-semibold leading-tight text-xs text-justify text-slate-400">Fusce venenatis elementum eros id maximus. Nam commodo dolor venenatis nunc tempus porta. Quisque nibh leo, finibus eget du.</p>
              </TimelineItem>

              <TimelineItem icon="fa fa-bell text-red-500" title="Hospitalization" date={new Date()}>
                <p className="mb-0 font-semibold leading-tight text-xs text-justify text-slate-400">Nam commodo dolor venenatis nunc tempus porta. Quisque nibh leo, finibus eget dui ut, blandit euismod mauris. Pellentesque semper sem vel velit facilisis sodales et vitae nisi.</p>
              </TimelineItem>
            </Timeline>
          </TabContent>

          <TabContent icon="fa fa-user" text="Motifs de la visite">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Motif de la visite</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <div className="grid grid-cols-6 gap-x-2 gap-y-3">
              <div className="col-span-2">
                <input type="datetime-local" defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></input>
              </div>
              <div className="col-span-2">
                <select className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none">
                  <option disabled value={""} selected>Type de la visite</option>
                  <option>Evaluation de nouveau patient</option>
                  <option>Suivi periodique (non urgent)</option>
                  <option>Viste de soins (urgent)</option>
                </select>
              </div>
              <div className="col-span-2">
                <select className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none">
                  <option disabled value={""} selected>Motif de la visite</option>
                  <option>Symptôme</option>
                  <option>Plainte</option>
                </select>
              </div>
              <div className="col-span-6">
                <textarea rows={2} placeholder="Symptômes" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
              </div>
              <div className="col-span-6">
                <textarea rows={5} placeholder="Résumé de visite" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
              </div>
            </div>
          </TabContent>

          <TabContent icon="fa fa-user" text="Examen clinique">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Examen clinique</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <div className="">
              <div className="flex justify-between">
                <h6>Liste des examens cliniques</h6>
                <button>Edit</button>
              </div>
              <div className="col-span-6">
                <Table fields={['#', 'Examen clinique', 'Résultat', 'Remarques']}>
                  <TableEntry data={['1', 'Verification de la gorge', 'Vraiiiment enflammé', '-']}></TableEntry>
                </Table>
              </div>
            </div>
          </TabContent>

          <TabContent icon="fa fa-user" text="Diagnostique">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Diagnostique</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <div className="grid grid-cols-6 gap-x-2 gap-y-3">
              <div className="col-span-6">
                <input type="text" placeholder="Diagnostique" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></input>
              </div>
              <div className="col-span-6">
                <textarea rows={5} placeholder="Détails" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
              </div>
            </div>
          </TabContent>

          <TabContent icon="fa fa-user" text="Prise en charge">
            <h3 className="text-lg font-bold text-gray-900 mb-0">Prise en charge</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <div className="">
              <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                  <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Médicaments</label>
                </label>
                <button>Edit</button>
              </div>
              <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-4">
                <Table fields={['#', 'Médicament', 'Dosage', 'Fréquence', 'Durée', 'Remarques']}>
                  <TableEntry data={['1', 'CM101 - Paracétamol', '1g', '3 fois / jr', '30d', "Pas d'alcool"]}></TableEntry>
                </Table>
              </div>

              <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                  <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Radiologie</label>
                </label>
                <button>Edit</button>
              </div>
              <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-4">
                <Table fields={['#', 'Radio', 'Remarques']}>
                  <TableEntry data={['1', 'X-Ray Maxillo-faciale', "-"]}></TableEntry>
                </Table>
              </div>

              <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                  <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Analyses</label>
                </label>
                <button>Edit</button>
              </div>
              <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-4">
                <Table fields={['#', 'Analyses', 'Remarques']}>
                  <TableEntry data={['1', 'Bilan glucidique', "-"]}></TableEntry>
                  <TableEntry data={['2', 'Bilan cardiaque', "-"]}></TableEntry>
                </Table>
              </div>

              <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                  <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Interventions</label>
                </label>
                <button>Edit</button>
              </div>
              <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-4">
                <Table fields={['#', 'Intervention', 'Remarques']}>
                  <TableEntry data={['1', 'Appendectomie', "par cœlioscopie"]}></TableEntry>
                </Table>
              </div>
              <div className="block pl-7">
                <label>
                  <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Prochaine consultation</label>
                </label>
                <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-4">
                  <input type="datetime-local" defaultValue={moment(new Date()).add(7, 'days').format("YYYY-MM-DDTHH:mm")} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></input>
                </div>
              </div>
            </div>
          </TabContent>
        </Tabs>
        <div className="w-full flex justify-end">
          <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
            Submit
          </button>
        </div>
      </Card>
    </>
  )
}

export default NewVisitPage