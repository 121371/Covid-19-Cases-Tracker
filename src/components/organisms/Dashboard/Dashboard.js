import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LATEST_DATA_API } from '../../../constants/apis/services';
import Header from '../../molecules/Header/Header';
import Main from '../Main/Main';
import Footer from '../../molecules/Footer/Footer';
import { LOADING } from '../../../constants/app.constant';
import './Dashboard.css';

const Dashboard = () => {
    const [isLoading, setLoader] = useState(true);
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get(LATEST_DATA_API).then(response => {
            setApiData(response)
            setLoader(false);
        }).catch((error) => {
            console.log("Error occured while fetching the api", error);
        })
    }, []);

    return(
        isLoading  ? 
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{LOADING}</span>
          </div>
        </div>  :
        <div className="dashboard">
            <Header />
            <Main data={apiData} />
            <Footer />

        </div>
    )
}

export default Dashboard;