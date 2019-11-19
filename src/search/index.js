/**
 *
 * Created by shenzaifang on 2019-11-12
 */
import React from "react";
import ReactDom from 'react-dom';
import "./search.less";
import flower from '../images/66.png';
import '../../common';
// import Text from './text';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: null
        }
    }

    loadImport() {
        import("./text.js").then(Text => {
            this.setState({
                Text: Text.default
            })
        });
        this.setState({
            Text
        })
    };

    render() {
        const { Text } = this.state;
        return <div className={'search-text'}>
            search text
            索索问题 内容
            <img src={flower} onClick={this.loadImport.bind(this)} alt=""/>
            {Text ? <Text/> : null}
        </div>
    }
}


ReactDom.render(
    <Index/>,
    document.getElementById('root')
)
