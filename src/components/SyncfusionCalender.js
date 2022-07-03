import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
  DragAndDrop,
  Resize,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, Query } from '@syncfusion/ej2-data';

const SyncfusionCalender = ({setsyncfusionselected}) => {
  let result = new DataManager()
  let data = [
    // {
    //     "Subject": "aSa",
    //     "Id": 1,
    //     "StartTime": "2022-06-28T22:00:00.000Z",
    //     "EndTime": "2022-06-28T22:30:00.000Z",
    //     "IsAllDay": false
    // }
]
  return (
    <div className="App">
      <ScheduleComponent dataBinding={(e) => 
        {
          console.log(e)
          setsyncfusionselected(e.result)
        }}  
        eventSettings={{ dataSource: data }}>
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            Agenda,
            MonthAgenda,
            TimelineViews,
            TimelineMonth,
            TimelineYear,
            DragAndDrop,
            Resize,
          ]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default SyncfusionCalender;
