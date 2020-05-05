import React, { useEffect, useState } from "react";
import axios from "axios";
import { INDIA_DISTRICTWISE_DATA_API } from "../../../../constants/apis/services";
import { LOADING } from "../../../../constants/app.constant";

import './DistrictWise.css';

const DistrictWise = () => {
  const [apiData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setState] = useState("Uttar Pradesh");
  const [selectedDistrict, setDistrict] = useState("Balrampur");

  useEffect(() => {
    axios
      .get(`${INDIA_DISTRICTWISE_DATA_API}`)
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(
          "Error while fetching INDIA_DISTRICTWISE_DATA_API data",
          error
        );
      });
  }, []);

  const getStateList = () => {
    return (
      <div className="dropdown pr-3">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-flip="false"
        >
          {selectedState}
        </button>
        <div className="dropdown-menu" data-flip="false" aria-labelledby="dropdownMenuButton">
          {Object.keys(apiData).length > 0 &&
            Object.keys(apiData.data).map((state, index) => {
              return (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    setState(state);
                    setDistrict("Select District");
                  }}
                >
                  {state}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const getDistrictList = () => {
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedDistrict}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {apiData &&
            apiData.data &&
            Object.keys(apiData.data[selectedState]["districtData"]).map(
              (district, index) => {
                return (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => setDistrict(district)}
                  >
                    {district}
                  </div>
                );
              }
            )}
        </div>
      </div>
    );
  };

  const showCaseDetails = () => {
      const districtCaseInfo = apiData &&
      apiData.data &&
      apiData.data[selectedState]["districtData"][selectedDistrict];
    return districtCaseInfo && (
      <div>
        <div className="alert alert-success" role="alert">
          <b>Total Cases: </b>
          {districtCaseInfo[
              "confirmed"
            ]}
          <br />
        </div>
        {selectedState !== 'Delhi' &&
        <><div className="alert alert-warning" role="alert">
          <b>Active Cases: </b>
          {districtCaseInfo[
              "active"
            ]}
          <br />
        </div>
        <div className="alert alert-info" role="alert">
          <b>Recovered: </b>
          {districtCaseInfo[
              "recovered"
            ]}
          <br />
        </div>
        <div className="alert alert-danger" role="alert">
          <b>Deaths: </b>
          {districtCaseInfo[
              "confirmed"
            ] - districtCaseInfo[
                "active"
              ] - districtCaseInfo[
                "recovered"
              ]}
          <br />
        </div>
        </>}
      </div>
    );
  };

  return isLoading &&
    Object.keys(apiData).length > 0 &&
    Object.keys(apiData.data).length > 0 ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">{LOADING}</span>
      </div>
    </div>
  ) : (
    <div className="district-wise mb-3">
      <h4>District wise status</h4>
      <div className="state-district-wise d-flex mb-3">
        {getStateList()}
        {getDistrictList()}
      </div>
      <div>
        {selectedDistrict !== "Select District" && showCaseDetails()}
      </div>
    </div>
  );
};

export default DistrictWise;
