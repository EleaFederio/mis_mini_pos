import {Bar} from "react-chartjs-2";

const BarChart = (props) => {
    return(
        <div>
            <Bar
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December'],
                    datasets: [
                        {
                            label: props.branchName + ' Branch',
                            data: props.data,
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
            {
                console.log(props.data)
            }
        </div>
    )
}

export default BarChart;