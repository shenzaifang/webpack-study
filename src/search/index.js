/**
 *
 * Created by shenzaifang on 2019-11-12
 */
import React from "react";
import ReactDom from 'react-dom';
import "./search.less";
import flower from '../images/66.png';
import '../../common';

class Index extends React.Component{
    render() {
        return <div className={'search-text'}>
            search text
            索索问题 内容
            <img src={flower} alt=""/>
        </div>
    }
}


ReactDom.render(
    <Index/>,
    document.getElementById('root')
)
