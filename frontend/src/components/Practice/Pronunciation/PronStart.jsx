import MyCamera from "../../profile/MyCamera"
import React, { useRef } from 'react';

function PronStart() {
    const myVideoRef = useRef(null);

    return (
        <div>
            <h1>PronStart</h1>
            <div>
                <MyCamera
                myVideoRef={myVideoRef}
                >
                </MyCamera>
            </div>
        </div>
    )
}

export default PronStart