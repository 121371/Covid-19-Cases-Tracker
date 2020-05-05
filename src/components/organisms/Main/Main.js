import React from 'react';
import MainContent from '../../molecules/MainContent/MainContent';
// import TopHeadlines from '../../molecules/TopHeadlines/TopHeadlines';

import './Main.css';

const Main = props => {
    const { data } = props;
   
    return(
        <div className="main">
            <div className="sub-main">
            <MainContent data={data} />
            </div>
        </div>
    )
}

export default Main;
