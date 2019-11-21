/**
 *
 * Created by shenzaifang on 2019-11-21
 */

const React = require('react');
const flower = require('../images/66.png');
require('./search.less');
// import Text from './text';

class Search extends React.Component {
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

module.exports = <Search/>
