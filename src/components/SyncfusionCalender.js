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

const SyncfusionCalender = ({setsyncfusionselected,syncfusionselected}) => {
  let result = new DataManager()
  let data = syncfusionselected
console.log("syncfusionselectedtttt",syncfusionselected)
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
