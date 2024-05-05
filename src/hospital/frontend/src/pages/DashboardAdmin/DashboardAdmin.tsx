import Card from "../../components/UI/Card";
import { Line, Pie, Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale,  LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import StatisticsCard from "../../components/StatisticsCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../hooks/AuthContext";
import { baseURL } from "../../config";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../../components/UI/Loading";
import Synthese from "../../components/UI/Synthese";
import SyntheseItem from "../../components/UI/Synthese/SyntheseItem";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend );

const MAIN_COLORS = ['rgb(100, 212, 253)', 'rgb(255, 99, 132)', 'rgb(99, 200, 132)', 'rgb(180, 15, 180)', 'rgb(240, 220, 0)']
const OFF_COLORS = ['rgba(100, 212, 253, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(99, 220, 132, 0.6)']

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        position: 'right' as const,
    }
  },
};

function DashboardAdmin(){
    const auth = useContext(AuthContext);

    const statistics = useQuery<any>({
      queryKey: ['statistics_admin'],
      queryFn: async () => {
        const statistics = { consultations: "", hospitalisations: "", interventions: "", personnel: "",}
        statistics.consultations = (await axios.get(`${baseURL}/api/consultations/count?hopital=${auth!.hopital}`)).data.count;
        statistics.hospitalisations = (await axios.get(`${baseURL}/api/hospitalisations/count?hopital=${auth!.hopital}`)).data.count;
        statistics.interventions = (await axios.get(`${baseURL}/api/interventions/count?hopital=${auth!.hopital}`)).data.count;
        statistics.personnel = (await axios.get(`${baseURL}/api/personnel/count?hopital=${auth!.hopital}`)).data.count;
        return statistics
      }
    })

    const timeline = useQuery<any>({
      queryKey: ['timeline_admin'],
      queryFn: async () => {
        const result : Record<string, any[]> = {date_keys:[], consultations:[], hospitalisations:[], interventions:[]}
        const months = 12
        const [result1, result2, result3] = await Promise.all([
          axios.get(`${baseURL}/api/consultations/timeline?hopital=${auth?.hopital}&duree=${months}`),
          axios.get(`${baseURL}/api/hospitalisations/timeline?hopital=${auth?.hopital}&duree=${months}`),
          axios.get(`${baseURL}/api/interventions/timeline?hopital=${auth?.hopital}&duree=${months}`),
        ])
        
        const today = new Date();
        const lastYear = moment(today).subtract(months, 'months').year();

        for(let i=0; i <= months; i++){
          const date = new Date(lastYear, today.getMonth()+i, 1)
          const date_key = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0');

          result.date_keys.push(date_key)
          result.consultations.push(result1.data[date_key]? result1.data[date_key] : 0)
          result.hospitalisations.push(result2.data[date_key]? result2.data[date_key] : 0)
          result.interventions.push(result3.data[date_key]? result3.data[date_key] : 0)
        }

        return result
      }
    })

    const chart2 = useQuery<any>({
      queryKey: ['activites_par_service_admin'],
      queryFn: async () => {
        const result : Record<string, any[]> = {services:[], consultations:[], hospitalisations:[], interventions:[]}
        const [result1, result2, result3] = await Promise.all([
          axios.get(`${baseURL}/api/consultations/countByService`),
          axios.get(`${baseURL}/api/hospitalisations/countByService`),
          axios.get(`${baseURL}/api/interventions/countByService`),
        ])

        // Find all services
        const allServices = new Set();
        for (const item of [...result1.data, ...result2.data, ...result3.data])
          allServices.add(item.service);

        // Initialize empty arrays for services and counts
        result.services = Array.from(allServices);
        result.consultations = new Array(result.services.length).fill(0);
        result.hospitalisations = new Array(result.services.length).fill(0);
        result.interventions = new Array(result.services.length).fill(0);

        // Iterate through each array and update counts
        for (const item of result1.data)
          result.consultations[result.services.indexOf(item.service)] += item.count;

        for (const item of result2.data)
          result.hospitalisations[result.services.indexOf(item.service)] += item.count;

        for (const item of result3.data)
          result.interventions[result.services.indexOf(item.service)] += item.count;

        return result
      }
    })

    const synthese = useQuery<any>({
      queryKey: ['synthese_admin'],
      queryFn: async () => {
        const synthese = { consultations: "", hospitalisations: "", interventions: "", bilans: "", radios:""}
        synthese.consultations = (await axios.get(`${baseURL}/api/consultations/countToday`)).data.count;
        synthese.hospitalisations = (await axios.get(`${baseURL}/api/hospitalisations/countToday`)).data.count;
        synthese.interventions = (await axios.get(`${baseURL}/api/interventions/countToday`)).data.count;
        synthese.bilans = (await axios.get(`${baseURL}/api/bilans/countToday`)).data.count;
        synthese.radios = (await axios.get(`${baseURL}/api/radios/countToday`)).data.count;
        return synthese
      }
    })

    const [chart3Data, setChart3Data] = useState({labels: [], data: []})

    const chart1_data = {
      labels: timeline.data? timeline.data.date_keys : [],
      datasets: [
        {
          label: 'Consultations',
          data: timeline.data? timeline.data.consultations : [],
          borderColor: MAIN_COLORS[0],
          backgroundColor: OFF_COLORS[0]
        },
        {
          label: 'Hospitalisations',
          data: timeline.data? timeline.data.hospitalisations : [],
          borderColor: MAIN_COLORS[1],
          backgroundColor: OFF_COLORS[1]
        },
        {
          label: 'Interventions',
          data: timeline.data? timeline.data.interventions : [],
          borderColor: MAIN_COLORS[2],
          backgroundColor: OFF_COLORS[2]
        }
      ],
    };

    const chart2_data = {
      labels: chart2.data? chart2.data.services : [],
      datasets: [
        {
          label: 'Consultations',
          data: chart2.data? chart2.data.consultations : [],
          borderColor: MAIN_COLORS[0],
          backgroundColor: OFF_COLORS[0]
        },
        {
          label: 'Hospitalisations',
          data: chart2.data? chart2.data.hospitalisations : [],
          borderColor: MAIN_COLORS[1],
          backgroundColor: OFF_COLORS[1]
        },
        {
          label: 'Interventions',
          data: chart2.data? chart2.data.interventions : [],
          borderColor: MAIN_COLORS[2],
          backgroundColor: OFF_COLORS[2]
        }
      ],
    };

    const chart3_data = {
      labels: chart3Data.labels,
      datasets: [
        {
          label: 'Personnel',
          data: chart3Data.data,
          backgroundColor: MAIN_COLORS,
        }
      ],
    };

    useEffect(()=>{
      //get chart 3
      // TODO: mazal

      //get chart 4
      axios.get(`${baseURL}/api/personnel/countByService?hopital=${auth!.hopital}`).then((response: any)=> {
        const labels = response.data.map((x : any) => x.service);
        const data = response.data.map((x : any) => x.count);
        setChart3Data({labels, data})
      })
    }, [])
    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <StatisticsCard icon="fa fa-user" title="Consultations" >
            {
              statistics.isError? "Erreur":
              statistics.isLoading?
                <TableLoading />:
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.consultations}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-bed-pulse" title="Hospitalisations" >
            {
              statistics.isError? "Erreur":
              statistics.isLoading?
                <TableLoading />:
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.hospitalisations}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-heart-pulse" title="Interventions">
            {
              statistics.isError? "Erreur":
              statistics.isLoading?
                <TableLoading />:
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.interventions}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-user-nurse" title="Personnel">
            {
              statistics.isError? "Erreur":
              statistics.isLoading?
                <TableLoading />:
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.personnel}</h5>
            }
            </StatisticsCard>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Tendence des activités médicales" className="col-span-12 md:col-span-7">
                <Line options={options} height={300} data={chart1_data} />
            </Card>
            <Card title="Synthèse" subtitle={`Aujourd'hui, ${moment(new Date()).format("DD/MM/YYYY")}`} className="col-span-12 md:col-span-3">
                <Synthese>
                  <SyntheseItem icon="fa fa-staff-snake text-cyan-400" title={`Consultations`}>
                    {
                      synthese.isError? "Erreur":
                      synthese.isLoading?
                        <TableLoading />:
                        <p className="mb-0 leading-tight text-sm text-justify text-slate-500">
                          +{synthese.data?.consultations} Nouvelles consultations
                        </p>
                    }
                  </SyntheseItem>
                  <SyntheseItem icon="fa fa-bed-pulse text-cyan-400" title={`Hospitalisations`}>
                    {
                      synthese.isError? "Erreur":
                      synthese.isLoading?
                        <TableLoading />:
                        <p className="mb-0 leading-tight text-sm text-justify text-slate-500">
                          +{synthese.data?.hospitalisations} Nouvelles hospitalisations
                        </p>
                    }
                  </SyntheseItem>
                  <SyntheseItem icon="fa fa-syringe text-cyan-400" title={`Interventions`}>
                    {
                      synthese.isError? "Erreur":
                      synthese.isLoading?
                        <TableLoading />:
                        <p className="mb-0 leading-tight text-sm text-justify text-slate-500">
                          +{synthese.data?.interventions} Nouvelles interventions
                        </p>
                    }
                  </SyntheseItem>
                  <SyntheseItem icon="fa fa-vial text-cyan-400" title={`Bilans`}>
                    {
                      synthese.isError? "Erreur":
                      synthese.isLoading?
                        <TableLoading />:
                        <p className="mb-0 leading-tight text-sm text-justify text-slate-500">
                          +{synthese.data?.bilans} Nouveaux bilans
                        </p>
                    }
                  </SyntheseItem>
                  <SyntheseItem icon="fa fa-x-ray text-cyan-400" title={`Radios`} className="!mb-0">
                    {
                      synthese.isError? "Erreur":
                      synthese.isLoading?
                        <TableLoading />:
                        <p className="mb-0 leading-tight text-sm text-justify text-slate-500">
                          +{synthese.data?.radios} Nouveaux radios
                        </p>
                    }
                  </SyntheseItem>
                </Synthese>
            </Card>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Activités médicales par service" className="col-span-12 md:col-span-7">
                <Bar options={options} height={220} data={chart2_data} />
            </Card>
            <Card title="Personnel par service" className="col-span-12 md:col-span-3">
                <Pie options={options} height={220} data={chart3_data} />
            </Card>
        </div>
    </>
}

export default DashboardAdmin;