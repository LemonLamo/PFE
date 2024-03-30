import Card from "../components/UI/Card";
import { Line, Pie, Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale,  LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import StatisticsCard from "../components/StatisticsCard";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend );

const MAIN_COLORS = ['rgb(255, 99, 132)', 'rgb(99, 132, 255)', 'rgb(99, 200, 132)', 'rgb(180, 15, 180)', 'rgb(240, 220, 0)']
const OFF_COLORS = ['rgba(255, 99, 132, 0.5)', 'rgba(99, 132, 255, 0.5)', 'rgba(99, 200, 132, 0.5)']

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        position: 'right' as const,
    }
  },
};

const chart1_data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Consultations',
      data: [12,15,16,16,18,12,10],
      borderColor: MAIN_COLORS[0],
      backgroundColor: OFF_COLORS[0]
    },
    {
      label: 'Hospitalisations',
      data: [15,12,13,11,10,8,9],
      borderColor: MAIN_COLORS[1],
      backgroundColor: OFF_COLORS[1]
    },
    {
      label: 'Interventions',
      data: [8,3,2,5,1,2,10],
      borderColor: MAIN_COLORS[2],
      backgroundColor: OFF_COLORS[2]
    }
  ],
};

const chart2_data = {
  labels: ['Female', 'Male'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12,15],
      backgroundColor: MAIN_COLORS,
    }
  ],
};

const chart3_data = {
  labels: ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'],
  datasets: [
    {
      label: 'Patients',
      data: [12, 10, 13, 8, 9],
      backgroundColor: MAIN_COLORS[0],
    }
  ],
};

const chart4_data = {
  labels: ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'],
  datasets: [
    {
      label: 'Personnel',
      data: [12, 15, 20, 30, 50],
      backgroundColor: MAIN_COLORS,
    }
  ],
};

function DashboardAdmin(){
    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <StatisticsCard icon="fa fa-user" title="Consultations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">15</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-bed-pulse" title="Hospitalisations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">15</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-heart-pulse" title="Interventions">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">15</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-user-nurse" title="Personnel">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">15</h5>
            </StatisticsCard>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Consultations, Hospitalisations et Interventions" className="col-span-12 md:col-span-7">
                <Line options={options} height={220} data={chart1_data} />
            </Card>
            <Card title="Métrique 2" className="col-span-12 md:col-span-3">
                <Pie options={options} height={220} data={chart2_data} />
            </Card>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Patients par service" className="col-span-12 md:col-span-7">
                <Bar options={options} height={220} data={chart3_data} />
            </Card>
            <Card title="Personnel par service" className="col-span-12 md:col-span-3">
                <Pie options={options} height={220} data={chart4_data} />
            </Card>
        </div>
    </>
}

export default DashboardAdmin;