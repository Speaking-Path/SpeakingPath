import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            streamCreated :false
        }
        this.videoRef = React.createRef();
    }
    // 컴포넌트 업데이트되었을때
    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }
    // 컴포넌트가 처음으로 렌더링된후에 호출
    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }
    
    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}
