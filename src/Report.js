import {Container} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";
import Header from "./components/header";
import axios from "axios";
import {Bar, Line, Pie, Utils} from "react-chartjs-2";


const Report = (props) => {

    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const labels = Utils.months({count: 7});
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 30, 50, 20, 25, 44, -10],
                borderColor: Utils.CHART_COLORS.red,
                backgroundColor: Utils.CHART_COLORS.red,
            },
            {
                label: 'Dataset 2',
                data: [100, 33, 22, 19, 11, 49, 30],
                borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: Utils.CHART_COLORS.blue,
            }
        ]
    };

    // const [chartConfig, setChartConfig] = useState(
    //     {displayTitle:true},
    //     {displayLegend: true},
    //     {legendPosition:'right'},
    //     {location:'City'}
    // )
    //
    // const [saleInYear, setSaleInYear] = useState({
    //     chartData:{
    //         labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    //         datasets:[
    //             {
    //                 label:'Population',
    //                 data:[
    //                     617594,
    //                     181045,
    //                     153060,
    //                     106519,
    //                     105162,
    //                     95072
    //                 ],
    //                 backgroundColor:[
    //                     'rgba(255, 99, 132, 0.6)',
    //                     'rgba(54, 162, 235, 0.6)',
    //                     'rgba(255, 206, 86, 0.6)',
    //                     'rgba(75, 192, 192, 0.6)',
    //                     'rgba(153, 102, 255, 0.6)',
    //                     'rgba(255, 159, 64, 0.6)',
    //                     'rgba(255, 99, 132, 0.6)'
    //                 ]
    //             }
    //         ]
    //     }
    // });
    //
    // const getSaleInYear = () => {
    //     axios.get(props.url + '/api/year/sale/2021')
    //         .then(res => {
    //             setSaleInYear(res.data)
    //             console.log(res.data.one_year_sale)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    // }
    //
    // useEffect(() => {
    //     // console.log(props.url)
    //     // getSaleInYear()
    // }, []);

    return (
        <Fragment>
            <Header/>
            {/*<Container>*/}
            {/*    <h1>Reports</h1>*/}
            {/*    <Bar*/}
            {/*        data={saleInYear.data}*/}
            {/*        options={{*/}
            {/*            title:{*/}
            {/*                display:chartConfig.displayTitle,*/}
            {/*                text:'Largest Cities In '+chartConfig.location,*/}
            {/*                fontSize:25*/}
            {/*            },*/}
            {/*            legend:{*/}
            {/*                display:chartConfig.displayLegend,*/}
            {/*                position:chartConfig.legendPosition*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}

            {/*    <Line*/}
            {/*        data={saleInYear}*/}
            {/*        options={{*/}
            {/*            title:{*/}
            {/*                display:chartConfig.displayTitle,*/}
            {/*                text:'Largest Cities In '+chartConfig.location,*/}
            {/*                fontSize:25*/}
            {/*            },*/}
            {/*            legend:{*/}
            {/*                display:chartConfig.displayLegend,*/}
            {/*                position:chartConfig.legendPosition*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}

            {/*    <Pie*/}
            {/*        data={saleInYear}*/}
            {/*        options={{*/}
            {/*            title:{*/}
            {/*                display:chartConfig.displayTitle,*/}
            {/*                text:'Largest Cities In '+chartConfig.location,*/}
            {/*                fontSize:25*/}
            {/*            },*/}
            {/*            legend:{*/}
            {/*                display:chartConfig.displayLegend,*/}
            {/*                position:chartConfig.legendPosition*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Container>*/}
        </Fragment>
    )
}

export default Report;