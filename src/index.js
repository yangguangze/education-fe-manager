import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import PCHeader from './js/components/header';

export default class Root extends Component {
    render() {
        return (
            <div>
                <PCHeader />
            </div>

        );
    }
}


ReactDOM.render(<Root />, document.getElementById('root'));

