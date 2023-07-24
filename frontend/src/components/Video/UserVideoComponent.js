import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo'
import styles from './UserVideo.module.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                <div>
                    <p className={styles.nickname}>{this.getNicknameTag()}</p>
                </div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                    </div>
                ) : null}
            </div>
        );
    }
}
