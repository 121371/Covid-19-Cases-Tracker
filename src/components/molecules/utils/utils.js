import get from "lodash.get";
import React from "react";

import YesterdayDayCases from '../utils/YesterdayDayCases';
import { CASE_TYPES } from '../../../constants/app.constant'; 

export const getGlobalInfo = (regionType, data, name) => {
  if (regionType === "global-info") {
    return get(data, `data.data.summary.${name}`, "");
  } else if (regionType === "global-change-info") {
    return get(data, `data.data.change.${name}`, "");
  } else if (regionType === "country-specific-info") {
    return get(data, `${name}`, "");
  }
};

export const getCountryData = data => {
  return get(data, `data.data.regions`, {});
};

export const getCaseDetails = (regionType, caseDetails, indiaWeeklyData = '') => {
  return (
    <>
      <div className="alert alert-success" role="alert">
        <b>Total Cases: </b>
        {getGlobalInfo(regionType, caseDetails, "total_cases")}
        <br/>
        <em className="text-muted">{YesterdayDayCases(regionType, CASE_TYPES[0], indiaWeeklyData)} Yesterday</em>
      </div>
      <div className="alert alert-warning" role="alert">
        <b>Active Cases: </b>
        {getGlobalInfo(regionType, caseDetails, "active_cases")}
        <br/>
        {regionType !== 'country-specific-info' && <em className="text-muted">{YesterdayDayCases(regionType, CASE_TYPES[1], indiaWeeklyData)} Yesterday</em>}
      </div>

      <div className="alert alert-info" role="alert">
        <b>Recovered: </b>
        {getGlobalInfo(regionType, caseDetails, "recovered")}
        <br/>
       <em className="text-muted">{YesterdayDayCases(regionType, CASE_TYPES[2], indiaWeeklyData)} Yesterday</em>
      </div>
      {!!getGlobalInfo(regionType, caseDetails, "tested") && (
        <div className="alert alert-primary" role="alert">
          <b>Tested: </b>
          {getGlobalInfo(regionType, caseDetails, "tested")}
          <br/>
          <em className="text-muted">{YesterdayDayCases(regionType, CASE_TYPES[3], indiaWeeklyData)} Yesterday</em>
        </div>
      )}
      <div className="alert alert-danger " role="alert">
        <b>Deaths: </b>
        {getGlobalInfo(regionType, caseDetails, "deaths")}
        <br/>
        <em className="text-muted">{YesterdayDayCases(regionType, CASE_TYPES[4], indiaWeeklyData)} Yesterday</em>
      </div>
    </>
  );
};
