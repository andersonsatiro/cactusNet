import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CityInternetStatus {
  name: string,
  desconhecido: number;
  ativo: number;
  desativado: number;
  'bloqueio manual': number;
  'bloqueio automático': number;
  'financeiro em atraso': number;
  'aguardando assinatura': number;
}

interface StackedBarChartProps {
  data: CityInternetStatus[] | undefined
}
export function StackedBarChart({data}:StackedBarChartProps) {
  return(
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
          <CartesianGrid strokeDasharray="3 3" className='' />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="desconhecido" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="ativo" stackId="a" fill="#f43f5e" />
          <Bar dataKey="desativado" stackId="a" fill="#059669" />
          <Bar dataKey="bloqueio manual" stackId="a" fill="#fb923c" />
          <Bar dataKey="bloqueio automático" stackId="a" fill="#3b82f6" />
          <Bar dataKey="financeiro em atraso" stackId="a" fill="#52525b" />
          <Bar dataKey="aguardando assinatura" stackId="a" fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
  )
}