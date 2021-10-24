import {Bar} from "react-chartjs-2";

const BarChart = () => {
    return(
        <div>
            <Bar
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December'],
                    datasets: [
                        {
                            label: 'Post System Sales in 1 Year',
                            data: [12, 19, 3, 5, 2, 3, 5, 3, 6, 2, 9, 8],
                            backgroundColor: 'rgba(54, 162, 235, 0.7)'
                        }
                    ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default BarChart;