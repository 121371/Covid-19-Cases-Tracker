import { useEffect, useState } from 'react';
import get from 'lodash/get';
import axios from 'axios';

import { GLOBAL_SUMMARY_API } from '../../../constants/apis/services';

const YesterdayDayCases = (regionType, caseTypes, indiaWeeklyData) => {
    const [globalSummaryData, setData] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        axios
          .get(`${GLOBAL_SUMMARY_API}`)
          .then(response => {
            setData(response);
            setIsFetching(false);
          })
          .catch(error => {
            console.log(
              "Error occured while fetching the globalSummaryData",
              error
            );
          });
      }, []);

      const getLastDayGlobalCases = () => {
        let IndiaOrGlobalData = globalSummaryData;
        if(regionType === 'country-specific-info') {
          IndiaOrGlobalData = indiaWeeklyData;
        }

          const  responseData =  get(IndiaOrGlobalData, 'data.data', {});
          const dataList = Object.keys(responseData);
          let yesterdaysData = '';
          if(dataList.length > 2) {
            yesterdaysData =  responseData[dataList[1]][caseTypes] - responseData[dataList[2]][caseTypes];
          }
          return yesterdaysData;  
      }


    return !isFetching ?  getLastDayGlobalCases() : ''
}

export default YesterdayDayCases;