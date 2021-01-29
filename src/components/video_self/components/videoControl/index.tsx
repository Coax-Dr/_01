import React, { useRef, useEffect } from 'react'
import './index.css'

interface IProps {
    status: 'progress' | 'control';
    currentTime: number;
    totalTime: number;
}

const VideoControl = (props: IProps) => {
    const { status, currentTime, totalTime } = props
    const boxLine = useRef<HTMLDivElement>(null);
    const controlLine = useRef<HTMLDivElement>(null);
    const formatCurrentTime = Math.floor(currentTime);
    const formatTotalTime = Math.floor(totalTime);
    const progress = `${Math.floor(formatCurrentTime / formatTotalTime * 100)}%`
    useEffect(() => updateProgress(), [progress]);
    const updateProgress = () => {
        const boxLineDom = boxLine.current as HTMLDivElement
        const controlLineDom = controlLine.current as HTMLDivElement
        if (status === 'progress') {
            boxLineDom.style.width = progress;
        } else {
            controlLineDom.style.width = progress;
        }
    }
    return (
        <div className='video_control-box'>
            <div className='box_line' ref={boxLine} style={status === 'progress' ? { opacity: 1 } : { opacity: 0 }} />
            <div className='box_control'>
                <div className='box_control-start'>{formatCurrentTime}</div>
                <div className='box_control-line'>
                    <div className='line_bar' ref={controlLine} style={status === 'control' ? { opacity: 1 } : { opacity: 0 }} />
                </div>
                <div className='box_control-end'>{formatTotalTime}</div>
            </div>
        </div>
    )
}

export default VideoControl;