function MyCameraRecord() {
    
    


    return (
        <div>
            <video id="gum" playsinline autoplay muted></video>
            <video id="recorded" playsinline loop></video>

            <div>
                <button id="start">Start camera</button>
                <button id="record" disabled>Start Recording</button>
                <button id="play" disabled>Play</button>
                <button id="download" disabled>Download</button>
            </div>

            <div>
                Recording format: <select id="codecPreferences" disabled></select>
            </div>
            <div>
                <h4>Media Stream Constraints options</h4>
                <p>Echo cancellation: <input type="checkbox" id="echoCancellation" /></p>
            </div>

            <div>
                <span id="errorMsg"></span>
            </div>
        </div>
    )
}


export default MyCameraRecord