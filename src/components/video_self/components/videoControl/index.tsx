import React from 'react'
import './index.css'

interface IProps {
    status: 'show' | 'control';
    currentTime: number;
    totalTime: number;
}

const VideoControl = (props: IProps) => {
    const { status, currentTime, totalTime } = props
    const formatCurrentTime = currentTime ? Math.floor(currentTime) : 0;
    const formatTotalTime = totalTime ? Math.floor(totalTime) : 0;
    const progress = formatCurrentTime && formatTotalTime ? `${Math.floor(formatCurrentTime / formatTotalTime * 100)}%` : '0%';

    const showProgress = (width: string) => {
        return (
            <div className='show_progress'>
                <div className='show_progress_line' style={{ width }} />
            </div>
        )
    }
    const controlProgress = (width: string) => {
        return (
            <div className='control_progress_box'>
                <span className='box_start'>{ formatCurrentTime }</span>
                <span className='box_line'>
                    <div className='box_line_progress' style={{ width }}/>
                </span>
                <span className='box_end'>{ formatTotalTime }</span>
            </div>
        )
    }
    return (
        <div className='video_control-box'>
            { status === 'show' && showProgress(progress) }
            { status === 'control' && controlProgress(progress) }
        </div>
    )
}

export default VideoControl;