import React, { useEffect } from 'react'
import {Chart as ChartJS, ArcElement} from 'chart.js'
import { fetchStudentData,getStudents } from '../features/AddStudentSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, 
);
export const HomeChart = () => {
          const Courses = ["Mernstack","Fullstack","Frontend","Backend"]
          const studentCourse = useSelector(state=> fetchStudentData(state))
          const barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9"
          ];
          console.log(studentCourse);
          const dispatch = useDispatch()
          useEffect(()=>{
             dispatch(getStudents())
          },[dispatch])
        //   dispatch(getStudents())
          let course = []
          for(let i=0; i< studentCourse.length; i++){
             course[i] = studentCourse[i].course
          }
          console.log(course);
          let result = course.reduce((acc,curr)=> {
             if(acc[curr])
                acc[curr]++
             
             else
                acc[curr]=1
               return acc 
             
            }    
            ,{})
            console.log(result);
           const selectedCoursesvalues = Object.values(result)
           console.log(Courses);
         
           let pieData;let pieOptions;
           if(studentCourse.length > 0){
             pieData = {
            
              labels: Courses,
              datasets: [{
                backgroundColor: barColors,
                data: selectedCoursesvalues
              }],
            options: {
              title: {
                display: true,
                text: "No of Students per Courses"
              }
            }
          };
           pieOptions = {
            options: {
                title: {
                  display: true,
                  text: "No of Students per Courses"
                }
              },
            radius: '40%',
        };
      }
      else{ pieData = {
        labels: Courses,
              datasets: [{
                backgroundColor: barColors,
                data: selectedCoursesvalues
              }],
            options: {
              title: {
                display: true,
                text: "No of Students Data available"
              }
            }
      }}
          
  return (
    <><Pie data={pieData} options={pieOptions} /></>
  )
}
