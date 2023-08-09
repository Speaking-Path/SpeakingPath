import MyCamera from "../../profile/MyCamera"

function PronStart() {
    return (
        <div>
            <h1>PronStart</h1>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
                <MyCamera></MyCamera>
            </div>
        </div>
    )
}

export default PronStart