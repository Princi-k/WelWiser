import React from 'react'
import { useState,useContext,createContext,useEffect } from 'react';

const AnalyticsContext = createContext(null);

const Month_Name = [ "Jan" , "Feb" , "Mar" , "Apr" , "May" ,
  "Jun" , "Jul" , "Aug" , "Sep" ," Oct" , "Nov" , "Dec"
 
];

const color = [
     '#86efac',
     '#93c5fd',
     '#c4b5fd',
     '#fcd34d',
     '#fda4af',
     '#14B8A6', // Light Pink
     '#94a3b8'
   ];

export function AnalyticsProvider({children}){
     const  [graphData,setGraphData] = useState([]);
     const [chartData,setChartData] = useState([]);
      const [loading,setLoading] = useState(false);
      const [error,setError] = useState('');
    
      useEffect(()=>{
        const fetchData = async() =>{
           try{
              setLoading(true);
    
            
              const token = localStorage.getItem('token');
              const [ graphRes , chartRes] = await Promise.all([
                fetch("http://localhost:3000/user/monthlybargraph",{
                method:"GET",
                headers:{
                  "Content-Type":"application/json",
                  ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                credentials:"include"
                }),
                fetch("http://localhost:3000/user/piechartdata",{
                method:"GET",
              headers:{
               "Content-Type":"application/json",
               ...(token ? { "Authorization": `Bearer ${token}` } : {})
               },
              credentials:"include"
              })
              ]);
    
              if(!graphRes.ok){
                throw new Error( graphRes.message||"Failed to fetch analytics data.");
              }

              if(!chartRes.ok){
               throw new Error(chartRes.message || "Failed to fetch analytics data.");
           }
    
              const graphResult = await graphRes.json();
              const chartResult = await chartRes.json();

            
    
              if(graphResult.success && graphResult.data && graphResult.data.length > 0){
                   const monthlyData = graphResult.data.map((item,index)=>({
                     year:item._id.year,
                     month:Month_Name[item._id.month-1],
                     amount:item.totalamount,
                     budget: graphResult.monthlyIncome || 30000
                     
                 }));
                 monthlyData.avg = graphResult.avg;
                 monthlyData.budget = graphResult.monthlyIncome;

                 setGraphData(monthlyData);

    
              }else{
                setGraphData([]);
              }


              if(chartResult.success && chartResult.data && chartResult.data.length > 0){
                const pieChartCategoryData  = chartResult.data.map((item,index) =>({
                name:item.category || "Uncatogerised",
                value:item.percentage,
                color:color[index % color.length],
                totalamount:item.totalamount,
                grandTotal:item.grandTotal
            }));

             setChartData(pieChartCategoryData);
            
           }else{
               setChartData([]);
            }

           

          

           }catch(error){
               setError(error.message);
           }finally{
            setLoading(false);
           }
          
        };
    
         fetchData();
      },[]);
    
  return (
    <AnalyticsContext.Provider value={{graphData,chartData,loading,error}}>
        {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics(){
    const context = useContext(AnalyticsContext);
    if (!context) {
      throw new Error("useAnalytics must be used within an AnalyticsProvider");
   }
  return context;
}


