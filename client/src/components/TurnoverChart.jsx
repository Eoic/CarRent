import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

class TurnoverChart extends Component {

    constructor() {
        super();
        this.state = {
            chartData: [
                { name: "Jan", uv: 0, pv: 0 },
                { name: "Feb", uv: 0, pv: 0 },
                { name: "Mar", uv: 0, pv: 0 },
                { name: "Apr", uv: 0, pv: 0 },
                { name: "May", uv: 0, pv: 0 },
                { name: "Jun", uv: 0, pv: 0 },
                { name: "Jul", uv: 0, pv: 0 },
                { name: "Aug", uv: 0, pv: 0 },
                { name: "Sep", uv: 0, pv: 0 },
                { name: "Oct", uv: 0, pv: 0 },
                { name: "Nov", uv: 0, pv: 0 },
                { name: "Dec", uv: 0, pv: 0 }
            ]
        }
    }

    componentDidMount() {
        axios.get('/api/turnover/months').then(response => {
            const incomeData = response.data.incomeMonthly;
            const expensesData = response.data.expensesMonthly;

            // Get state ref for update.
            let data = this.state.chartData;

            for (let i = 0; i < incomeData.length; i++)
                data[incomeData[i]._id.month - 1].uv = incomeData[i].total;

            for (let i = 0; i < expensesData.length; i++)
                data[expensesData[i]._id.month - 1].pv = expensesData[i].total;

            // Pass updated data as new array.
            this.setState({ chartData: data.slice() });
        });
    }

    render() {
        return (
                <ResponsiveContainer>
                    <BarChart width={900} height={450} data={this.state.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" name="Income" fill="#379634" />
                        <Bar dataKey="pv" name="Expenses" fill="#db3a34" />
                    </BarChart>
                </ResponsiveContainer>
        );
    }
}

export default TurnoverChart;