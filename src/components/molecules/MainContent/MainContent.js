import React, { useState, useEffect } from "react";
import get from "lodash.get";
import axios from "axios";
import { Chart } from "react-google-charts";

import { getCountryData, getCaseDetails } from "../utils/utils";
// eslint-disable-next-line no-unused-vars
import { toDateShortFormat } from "../utils/dateTimeFunctions";
import { WEEKLY_COUNTRY_DATA_API } from "../../../constants/apis/services";
import StateWiseData from "../IndiaData/StateWise/StateWise";
import DistrictWise from "../IndiaData/DistrictWise/DistrictWise";
import DistrictStatus from "../IndiaData/DistrictStatus/DistrictStatus";
import "./MainContent.css";
import Lockdown3 from "../IndiaData/Lockdown3/Lockdown3";
// import TopHeadlines from "../TopHeadlines/TopHeadlines";

const MainContent = props => {
  const { data } = props;
  const countryData = getCountryData(data);
  const [selectedCountryData, setDropdown] = useState(
    countryData && countryData["india"]
  );
  const [indiaWeeklyData, setIndiaWeeklyData] = useState({});
  const [lastUpdatedTimeFromChild, setLastUpdatedTime] = useState("");

  useEffect(() => {
    axios
      .get(`${WEEKLY_COUNTRY_DATA_API}?region=india`)
      .then(response => {
          setIndiaWeeklyData(response);
      })
      .catch(error => {
        console.log(
          "Error occured while fetching the india weekly country api",
          error
        );
      });
  }, []);


  useEffect(() => {
    axios
      .get(`${WEEKLY_COUNTRY_DATA_API}?region=${selectedCountryData.name}`)
      .then(response => {
        setWeeklyData(response);
      })
      .catch(error => {
        console.log(
          "Error occured while fetching the weekly country api",
          error
        );
      });
  }, [selectedCountryData]);


  const onCountryClick = countryData => {
    setDropdown(countryData);
  };

  const [weeklyData, setWeeklyData] = useState({});

  const getCountryList = () => {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedCountryData.name}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {Object.keys(countryData).length > 0 &&
            Object.keys(countryData).map((key, index) => {
              return (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => onCountryClick(countryData[key])}
                >
                  {key}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const getYesterdaysDataFromDom = () => {
    if(document && document.querySelector('.text-muted') && document.querySelector('.text-muted').childNodes[0]
     && document.querySelector('.text-muted').childNodes[0].wholeText
     && document.querySelector('.text-muted').childNodes[0].wholeText.split(' ')) {
      return Number(document.querySelector('.text-muted').childNodes[0].wholeText.split(' ')[0]);
    }
    return 0;
  }

  const getChartData = () => {
    let chartAPIData = [];
    const weeklyApiData = get(weeklyData, "data.data", {});
    let lastDayData;
    Object.keys(weeklyApiData).length > 0 &&
      Object.keys(weeklyApiData).forEach((date, index) => {
        if(index === 1) {
          getYesterdaysDataFromDom() && chartAPIData.unshift([
            date.toDateShortFormat(),
            getYesterdaysDataFromDom()
          ]);
        }
        if(index > 1 && index !== (Object.keys(weeklyApiData).length -1)) { //as array is in reverse order ignoring the todays date data as we can't compute todays data in last week status
          chartAPIData.unshift([
            date.toDateShortFormat(),
            lastDayData - parseInt(weeklyApiData[date].total_cases)
          ]);
        }
        lastDayData = parseInt(weeklyApiData[date].total_cases);
      });
    chartAPIData.unshift(["Element", "Density"]);
    return chartAPIData;
  };

  const getLastWeekChartData = () => {
    let chartAPIData = [];
    chartAPIData.push(["Case_Type", "No_Of_Cases"]);
    const statsTypesFromAPI = ["total_cases", "deaths", "recovered"];
    const statsTypesToDisplay = ["Total Cases", "Deaths", "Recovered"];
    const weeklyApiData = get(weeklyData, "data.data", {});
    Object.keys(weeklyApiData).length > 0 &&
      statsTypesFromAPI.forEach((statsType, index) => {
        chartAPIData.push([
          statsTypesToDisplay[index],
          parseInt(
            weeklyApiData[Object.keys(weeklyApiData)[0]][statsType] -
              weeklyApiData[Object.keys(weeklyApiData)[7]][statsType]
          )
        ]);
      });
    return chartAPIData;
  };

  const getLastUpdatedTime = lastUpdatedTime => {
    setLastUpdatedTime(lastUpdatedTime);
  };

  return (
    <div className="main-content">
      <div className="sub-main-content d-flex flex-sm-row flex-column">
        <div className="data-numbers">
          <p className="pl-1">
            <b>Last Updated:</b> {lastUpdatedTimeFromChild}
          </p>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="today-country-cases-tab"
                data-toggle="pill"
                href="#today-country-cases"
                role="tab"
                aria-controls="today-country-cases"
                aria-selected="true"
              >
                <h6>India</h6>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="alltime-country-cases-tab"
                data-toggle="pill"
                href="#alltime-country-cases"
                role="tab"
                aria-controls="alltime-country-cases"
                aria-selected="false"
              >
                <h6>World</h6>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="lockdown3-tab"
                data-toggle="pill"
                href="#lockdown3-cases"
                role="tab"
                aria-controls="lockdown3-cases"
                aria-selected="true"
              >
                <h6>Lockdown 3.0</h6>
              </a>
            </li>
            {/* currently hiding the news tab as API stopped working */}
            {/* <li className="nav-item">
              <a
                className="nav-link"
                id="top-headlines-tab"
                data-toggle="pill"
                href="#top-headlines"
                role="tab"
                aria-controls="top-headlines"
                aria-selected="true"
              >
                <h6>News</h6>
              </a>
            </li> */}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="today-country-cases"
              role="tabpanel"
              aria-labelledby="today-country-cases-tab"
            >
              {getCaseDetails(
                "country-specific-info",
                countryData && countryData["india"],
                indiaWeeklyData
              )}
              <div className="chart-wrapper d-flex mb-3">
                <h4 className="text-center">Last week status</h4>
                <div className="data-graph">
                  <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={getLastWeekChartData()}
                    options={{
                      title: "Last week stats",
                      slices: [
                        {
                          color: "#3366cc"
                        },
                        {
                          color: "red"
                        },
                        {
                          color: "green"
                        }
                      ],
                      legend: {
                        position: "bottom",
                        alignment: "center",
                        textStyle: {
                          color: "233238",
                          fontSize: 12
                        }
                      },
                      animation: {
                        duration: 1000,
                        easing: "out",
                        startup: true
                      },
                      tooltip: {
                        showColorCode: true
                      },
                      chartArea: {
                        left: 0,
                        right: 5,
                        top: 0,
                        width: "100%",
                        height: "80%"
                      },
                      // Just add this option
                      is3D: true
                    }}
                    legend_toggle
                    rootProps={{ "data-testid": "2" }}
                  />

                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="100%"
                    data={getChartData()}
                    options={{
                      title: "",
                      hAxis: {
                        title: "Date"
                      },
                      vAxis: { title: "Total Cases" },
                      legend: "none",
                      animation: {
                        duration: 1000,
                        easing: "out",
                        startup: true
                      }
                    }}
                    legendToggle
                  />
                </div>
              </div>

              <StateWiseData getLastUpdatedTime={getLastUpdatedTime} />
              <DistrictWise />
            </div>
            <div
              className="tab-pane fade"
              id="alltime-country-cases"
              role="tabpanel"
              aria-labelledby="alltime-country-cases-tab"
            >
              <div className="d-flex flex-md-row flex-column">
                <div className="flex-sm-1 mr-md-5 border border-danger md-p-5 px-3 pt-3 md-mb-5 mb-3 rounded">
                <h4>Across globe</h4>
                {getCaseDetails("global-info", data)}
                </div>
               
                <div className="flex-sm-3 border border-danger md-p-5 px-3 pt-3 md-mb-5 rounded">
                  <div className="mb-3">
                  <h4>Country specific</h4>
                  {getCountryList()}</div>
                  {getCaseDetails("country-specific-info", selectedCountryData, weeklyData)}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="lockdown3-cases"
              role="tabpanel"
              aria-labelledby="lockdown3-tab"
            >
              <div className="border border-danger p-2 rounded">
                <DistrictStatus />
                <Lockdown3 />
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="top-headlines"
              role="tabpanel"
              aria-labelledby="top-headlines-tab"
            >
              {/* currently hiding the news tab as API stopped working */}
             {/* <TopHeadlines /> */} 
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
