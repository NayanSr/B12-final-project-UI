import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Legend, Pie, PieChart, Tooltip } from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

const AdminDashboard = () => {
    const axiosSecure= useAxiosSecure();
    const {data:deliveryStats=[]}= useQuery({
        queryKey:['delivery-status-stats'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/parcels/delivery-status/stats');
            return result.data;
        }
    })
    console.log(deliveryStats);
    const getPiChartData=data=>{
       return data.map(item=>{
        return {name: item.status, value: item.count}
      })
    }
  return (
    <div>
        <h4 className="text-lg mb-4">Admin Dashboard</h4>
      
      <div className="stats shadow ml-4">
       {
        deliveryStats.map(stat=> <div key={stat._id} className="stat">
          <div className="stat-figure text-secondary ">
         
          </div>
          <div className="stat-title text-teal-800 text-lg font-semibold">{stat._id}</div>
          <div className="stat-value text-center">{stat.count}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>)
       }

        
      </div>

      {/* // Pi Chart */}
      <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={getPiChartData(deliveryStats)}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        fill="#8884d8"
        label
        isAnimationActive={true}
      />
      <RechartsDevtools />
      <Legend/>
      <Tooltip/>
    </PieChart>
    </div>
  );
};

export default AdminDashboard;
