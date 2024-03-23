import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import MainContent from "../components/MainContent";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-moment";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useSelector } from "react-redux";
import { apis } from "../apis";
import "./Dashboard.scss";
import LoadingButton from "@mui/lab/LoadingButton";

const Daily = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    let rawData = data.daily_raw;
    let predictData = data.daily_predict;
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.daily_labels,
        datasets: [
          {
            label: "Daily Raw Data",
            data: rawData,
            borderColor: "blue",
            backgroundColor: "blue",
            pointBackgroundColor: "rgba(0,0,255,0.5)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Daily Predict Data",
            data: predictData,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "YYYY-MM-DD",
              },
            },
            position: "bottom",
          },
          y: {
            type: "linear",
            position: "left",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <div className="dashboard-block">
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

const Monthly = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    let rawData = data.monthly_raw;
    let predictData = data.monthly_predict;
    let labels = data.monthly_labels;
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Monthly Raw Data",
            data: rawData,
            borderColor: "blue",
            backgroundColor: "blue",
            pointBackgroundColor: "rgba(0,0,255,0.5)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Monthly Predict Data",
            data: predictData,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "month",
              // displayFormats:{
              //   month:'YYYY-MM'
              // }
            },
            position: "bottom",
          },
          y: {
            type: "linear",
            position: "left",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <div className="dashboard-block">
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

const DashBoardBlock = () => {
  const [data, setData] = useState({});
  const [value, setValue] = useState(50);
  const [loading, setLoading] = useState(false);
  const { account } = useSelector((state) => state.auth);

  const get_data = async () => {
    try {
      const response = await apis.getPrediction(account);
      setData(response.prediction);
    } catch (err) {
      console.log(err);
    }
  };

  const predict = async () => {
    try {
      if (value < 0) {
        alert("Monthly budget can not be 0.");
      } else {
        setLoading(true);
        const response = await apis.predict(account, { budget: value });
        if (response.success) {
          setData(response.prediction);
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      get_data();
    }
  }, [account]);

  return (
    <>
      <Box sx={{ width: 500, marginLeft: "120px", marginBottom: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-amount">
              Monthly Budget
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              size="small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => predict()}
          >
            Predict
          </LoadingButton>
        </Box>
      </Box>
      <Monthly data={data} />
      <Daily data={data} />
    </>
  );
};

const DashBoard = () => {
  useEffect(() => {
    $("#nav-dashboard").addClass("active");
  }, []);
  return (
    <>
      <MainContent
        content={
          <DashBoardBlock style={{ width: "1000px", height: "500px" }} />
        }
      />
    </>
  );
};

export default DashBoard;
