
import PropTypes from "prop-types";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";


 const Chart = ({chartData}) => {
 /*  const myData = {
    date:'11/06/2025',
    quantity: 2400,
    price:1500,
    order:5
  } */
    return (
        <ComposedChart width={730} height={250} data={chartData}>
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="order" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="price" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="quantity" stroke="#ff7300" />
</ComposedChart>
    );
};

export default Chart;
Chart.propTypes={
  chartData:PropTypes.array
}