import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    offline: 4000,
    online: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    offline: 3000,
    online: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    offline: 2000,
    online: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    offline: 2780,
    online: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    offline: 1890,
    online: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    offline: 2390,
    online: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    offline: 3490,
    online: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/stacked-bar-chart-7fwfgj';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="online" stackId="a" fill="black" />
          <Bar dataKey="offline" stackId="a" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
