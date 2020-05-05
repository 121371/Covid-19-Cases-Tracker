import React, { useEffect, useState } from "react";
import axios from "axios";
import get from "lodash/get";
import { INDIA_STATEWISE_DATA_API } from "../../../../constants/apis/services";
import { LOADING } from "../../../../constants/app.constant";

import './StateWise.css';

const StateWise = ({getLastUpdatedTime}) => {
  const [apiData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${INDIA_STATEWISE_DATA_API}`)
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(
          "Error while fetching INDIA_STATEWISE_DATA_API data",
          error
        );
      });
  }, []);
  const statewiseData = get(apiData, "data.statewise", {});

  return isLoading && Object.keys(statewiseData).length > 1 && getLastUpdatedTime(statewiseData[0].lastupdatedtime) ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">{LOADING}</span>
      </div>
    </div>
  ) : (
    <div className="state-wise mb-4">
      <h4>State wise status</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Active</th>
            <th scope="col">Deaths</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(statewiseData).map((state, index) => {
            return index > 0 && (
              <tr key={index}>
                <td>{statewiseData[state].state}</td>
                <td>{statewiseData[state].confirmed}</td>
                <td>{statewiseData[state].active}</td>
                <td>{statewiseData[state].deaths}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StateWise;
