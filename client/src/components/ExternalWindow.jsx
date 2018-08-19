import { Component } from 'react';
import ReactDOM from 'react-dom';

class ExternalWindow extends Component {

    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }

    componentDidMount() {
        this.externalWindow = window.open('', ',', "width=600, height=700, left=0, top=0");
        this.externalWindow.document.body.appendChild(this.containerEl);
        this.externalWindow.document.title = (this.props.title) ? this.props.title : 'blank' ;

        this.externalWindow.addEventListener('beforeunload', () => {
            this.props.closeWindowPortal();
        });
    }

    componentWillUnmount() {
        this.externalWindow.close();
    }
}

export default ExternalWindow;