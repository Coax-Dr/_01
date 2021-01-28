import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const VideoSelf = () => {
    const [showControl, setShowControl] = useState(false);
    const videoRef = useRef(null);
    const Img = 'https://dev-oss.gramaker.com/developer/free/material%E8%88%9E%E5%8F%B0-1611817500732.mp4'

    const div = document.createElement('div');
    div.className = 'video_control-box'
    const Node = document.getElementById('video_box-node');
    Node?.appendChild(div);
    /**
     * 视频控件组件
    */
    const videoControl = () => {
        return (
            <React.Fragment>
                <div className='video_control-start'>00:00</div>
                <div className='video_control-progress'></div>
                <div className='video_control-end'>02:56</div>
            </React.Fragment>
        );
    }
    const showVideoControl = () => {
        if (!showControl) {
            ReactDOM.render(videoControl(), div)
        } else {
            ReactDOM.unmountComponentAtNode(div)
        }
        setShowControl(!showControl)
    }
    return (
        <div id='video_box'>
            <video
                className='video_box-content' src={Img}
                ref={videoRef}
                onClick={() => showVideoControl()}
            />
            <div id='video_box-node'></div>
        </div>
    )
}

export default VideoSelf;