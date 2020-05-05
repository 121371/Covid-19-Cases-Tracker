import React, { useEffect, useState } from "react";
import axios from "axios";
import get from "lodash/get";
import { TOP_HEADLINES_API } from "../../../constants/apis/services";
import { LOADING } from "../../../constants/app.constant";
import { getTodayDate, getYesterdayDate } from "../utils/dateTimeFunctions";
import './TopHeadLines.css';
const TopHeadlines = () => {
  const [newsData, setNewsData] = useState({});
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${TOP_HEADLINES_API}?country=in&from=${getYesterdayDate()}&to=${getTodayDate()}&language=en&apiKey=eb01341d16ac4324882ed042fad7d734`
      )
      .then(response => {
        setNewsData(response);
        setLoader(false);
      })
      .catch(error => {
        console.log("Error occured while fetching the top news api", error);
      });
  }, []);
  console.log("newsData", newsData);
  return isLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">{LOADING}</span>
      </div>
    </div>
  ) : (
    <div className="top-headlines">
      {get(newsData, "data.articles", []).length > 0 && (
        <div className="mb-4">
          <h3>Top Headlines</h3>
        </div>
      )}
      <ul className="list-unstyled">
        {get(newsData, "data.articles", []).length > 0 &&
          get(newsData, "data.articles", []).map(newsItem => {
            return (
              <li className="media">
                <a href={newsItem.url} target="_blank" className="d-flex">
                  <img src="https://static2.bigstockphoto.com/7/2/3/large1500/327103171.jpg" className="align-self-start mr-3" alt="..." />
                  <div className="media-body">
                    <h5 className="mt-0 mb-1">{newsItem.title}</h5>
                    {newsItem.description}
                  </div>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TopHeadlines;