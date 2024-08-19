import React,{useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export const DashBoardCalendar = () => {
    const [value,onChange] = useState(new Date())
    
  return (
    <>
    <div className="calendar-container">
            <style>
                {`
                .has-event {
                    background-color: #f0f0f0;
                    border-radius: 50%;
                }
                .event-marker {
                    width: 6px;
                    height: 6px;
                    background-color: #ff0000; /* Red color for event markers */
                    border-radius: 50%;
                }
                .tooltip {
                    position: absolute;
                    background-color: #333;
                    color: #fff;
                    padding: 5px;
                    border-radius: 5px;
                    z-index: 9999;
                }
                .react-calendar {
                    width: 100%;
                    flex: 1; 
                    border-radius: 15px;
                    padding: 15px;
                    height: 100%; 
                }
                .react-calendar:hover{
                    border: 1px solid rgba(159, 159, 159, 0.497);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                }
                .today-marker {
                    background-color: red; 
                    border-radius: 50%;
                }
             
                .react-calendar__tile--active {
                    background-color: #e0e0e0;
                    border-radius: 5px;
                }
                .react-calendar__month-view__weekdays__weekday abbr {
                    color: var(--icon-color); 
                }

                .react-calendar__month-view__weekdays__weekday abbr {
                    color: #2196f3; 
                }

                .react-calendar__month-view__days__day {
                
                    font-size: 14px;
                }

        `}
            </style>
          </div>  

          <div>
              <Calendar className="custom-calendar" onChange={onChange} value={value}/>
          </div>
    </>
  )
}
