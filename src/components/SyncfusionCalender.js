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

const SyncfusionCalender = () => {
  return (
    <div className="App">
      <ScheduleComponent>
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
