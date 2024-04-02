import Card from "../../components/UI/Card";
import { Line, Pie, Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale,  LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import StatisticsCard from "../../components/StatisticsCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../hooks/AuthContext";
import { baseURL } from "../../config";
import moment from "moment";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend );

const MAIN_COLORS = ['rgb(100, 212, 253)', 'rgb(255, 99, 132)', 'rgb(99, 200, 132)', 'rgb(180, 15, 180)', 'rgb(240, 220, 0)']
const OFF_COLORS = ['rgba(100, 212, 253, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(99, 220, 132, 0.5)']

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
    const [statistics, setStatistics] = useState({
      consultations: "0",
      hospitalisations: "0",
      interventions: "0",
      personnel: "0",
    })
    const [chart1Data, setChart1Data] = useState({date_keys:[], consultations:[], hospitalisations:[], interventions:[]})
    const [chart2Data, setChart2Data] = useState({labels: [], data: []})
    const [chart3Data, setChart3Data] = useState({labels: [], data: []})
    const [chart4Data, setChart4Data] = useState({labels: [], data: []})

    const chart1_data = {
      labels: chart1Data.date_keys,
      datasets: [
        {
          label: 'Consultations',
          data: chart1Data.consultations,
          borderColor: MAIN_COLORS[0],
          backgroundColor: OFF_COLORS[0]
        },
        {
          label: 'Hospitalisations',
          data: chart1Data.hospitalisations,
          borderColor: MAIN_COLORS[1],
          backgroundColor: OFF_COLORS[1]
        },
        {
          label: 'Interventions',
          data: chart1Data.interventions,
          borderColor: MAIN_COLORS[2],
          backgroundColor: OFF_COLORS[2]
        }
      ],
    };

    const chart2_data = {
      labels: chart2Data.labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: chart2Data.data,
          backgroundColor: MAIN_COLORS,
        }
      ],
    };

    const chart3_data = {
      labels: chart3Data.labels,
      datasets: [
        {
          label: 'Personnel',
          data: chart3Data.data,
          backgroundColor: MAIN_COLORS[0],
        }
      ],
    };

    const chart4_data = {
      labels: chart4Data.labels,
      datasets: [
        {
          label: 'Personnel',
          data: chart4Data.data,
          backgroundColor: MAIN_COLORS,
        }
      ],
    };
    useEffect(()=>{
      // get cards
      axios.get(`${baseURL}/api/ehr/consultations/count?hopital=${auth!.hopital}`).then((response: any)=> setStatistics(s => ({...s, consultations: response.data.count})))
      axios.get(`${baseURL}/api/ehr/hospitalisations/count?hopital=${auth!.hopital}`).then((response: any)=> setStatistics(s => ({...s, hospitalisations: response.data.count})))
      axios.get(`${baseURL}/api/ehr/interventions/count?hopital=${auth!.hopital}`).then((response: any)=> setStatistics(s => ({...s, interventions: response.data.count})))
      axios.get(`${baseURL}/api/personnel/count?hopital=${auth!.hopital}`).then((response: any)=> setStatistics(s => ({...s, personnel: response.data.count})))

      //get chart 1
      const months = 12
      axios.get(`${baseURL}/api/ehr/statistics`).then((response: any)=> {
        const today = new Date();
        const lastYear = moment(today).subtract(months, 'months').year();
        const date_keys : any = []
        const consultations : any = []
        const hospitalisations : any = []
        const interventions : any = []

        for(let i=0; i<=months; i++){
          const date = new Date(lastYear, today.getMonth()+i+1, 1)
          const date_key = date.getFullYear() + "-" + date.getMonth().toString().padStart(2, '0');
          date_keys.push(date_key)
          consultations.push(response.data[date_key]? response.data[date_key].consultations : 0)
          hospitalisations.push(response.data[date_key]? response.data[date_key].hospitalisations : 0)
          interventions.push(response.data[date_key]? response.data[date_key].interventions : 0)
        }
        setChart1Data({date_keys, consultations, hospitalisations, interventions})
      })

      //get chart 2
      axios.get(`${baseURL}/api/personnel/countBySexe?hopital=${auth!.hopital}`).then((response: any)=> {
        const labels = response.data.map((x : any) => x.sexe);
        const data = response.data.map((x : any) => x.count);
        setChart2Data({labels, data})
      })

      //get chart 3 & 4
      axios.get(`${baseURL}/api/personnel/countByService?hopital=${auth!.hopital}`).then((response: any)=> {
        const labels = response.data.map((x : any) => x.service);
        const data = response.data.map((x : any) => x.count);
        setChart3Data({labels, data})
        setChart4Data({labels, data})
      })
    }, [])
    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <StatisticsCard icon="fa fa-user" title="Consultations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.consultations}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-bed-pulse" title="Hospitalisations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.hospitalisations}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-heart-pulse" title="Interventions">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.interventions}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-user-nurse" title="Personnel">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.personnel}</h5>
            </StatisticsCard>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Consultations, Hospitalisations et Interventions" className="col-span-12 md:col-span-7">
                <Line options={options} height={220} data={chart1_data} />
            </Card>
            <Card title="Personnel par sexe" className="col-span-12 md:col-span-3">
                <Pie options={options} height={220} data={chart2_data} />
            </Card>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Personnel par service" className="col-span-12 md:col-span-7">
                <Bar options={options} height={220} data={chart3_data} />
            </Card>
            <Card title="Personnel par service" className="col-span-12 md:col-span-3">
                <Pie options={options} height={220} data={chart4_data} />
            </Card>
        </div>
    </>
}

export default DashboardAdmin;