import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { CalendarIcon } from "../svg";
import { ToastContainer, toast } from "react-toastify";
export default function CustomDateRangeInputs({ setValue, value }) {
  return (
    <div
      className="mui-date-ranger flex aic jc"
      style={{
        backgroundColor: "white",
        height: "40px",
        padding: "0px 12px",
        borderRadius: "7px",
        border: "1px solid #fff",
      }}
    >
      <div className="icon">
        <CalendarIcon />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          label="Advanced keyboard"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <input
                className="cleanbtn s14 font"
                style={{ width: "110px", marginLeft: "20px" }}
                inputFormat="dd/MM/yyyy"
                ref={startProps.inputRef}
                {...startProps.inputProps}
              />
              <Box sx={{ mx: 1 }}> - </Box>
              <input
                className="cleanbtn s14 font"
                style={{ width: "110px", marginLeft: "20px" }}
                // views={["year", "month", "day"]}
                // format="DD-MM-YYYY"
                inputFormat="E MMM dd yyyy"
                ref={endProps.inputRef}
                {...endProps.inputProps}
              />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
