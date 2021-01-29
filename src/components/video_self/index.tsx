import React, { useRef, useState, useEffect, useMemo } from 'react';
import VideoControl from './components/videoControl';
import './index.css'
const VideoSelf = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoBth = useRef<HTMLDivElement>(null);
    const videoBox = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const videoLink = 'https://dev-oss.gramaker.com/developer/free/material%E8%88%9E%E5%8F%B0-1611817500732.mp4'
    let timer;

    const setTimeToHide = (time: number, node: HTMLDivElement) => {
        return new Promise((resolve) => {
            timer = setTimeout(() => {
                node.style.display = 'none'
                resolve('ok')
            }, time)
        })
    }
    useEffect(() => {
        const VideoDom = videoRef.current as HTMLVideoElement
        const VideoBtnDom = videoBth.current as HTMLDivElement
        VideoDom.addEventListener('play', () => {
            setCurrentTime(VideoDom.currentTime);
        }, false);
        VideoDom.addEventListener('timeupdate', () => {
            setCurrentTime(VideoDom.currentTime);
        },false);
        VideoDom.addEventListener('pause', () => {
            setCurrentTime(VideoDom.currentTime);
        },false);
        VideoDom.addEventListener('ended', () => {
            VideoBtnDom.style.display = 'flex'
            VideoBtnDom.innerText = '播放'
        }, false);
    }, [])
    useMemo(() => {
        const VideoBtnDom = videoBth.current as HTMLDivElement
        if (status && VideoBtnDom) {
            VideoBtnDom.style.display = 'flex'
            setTimeToHide(5000, VideoBtnDom).then(res => {
                if (res === 'ok') {
                    setStatus(false)
                    clearTimeout(timer);
                }
            })
        }
        // eslint-disable-next-line 
    }, [status])

    /**
     * 播放视频
     */
    const playVideo = async () => {
        const VideoDom = videoRef.current as HTMLVideoElement
        const VideoBtnDom = videoBth.current as HTMLDivElement
        if (VideoDom.ended) {
            VideoDom.play();
            VideoBtnDom.innerText = '暂停'
        } else if (VideoDom.paused || VideoDom.ended) {
            VideoDom.play()
            VideoBtnDom.innerText = '暂停'
        } else {
            VideoDom.pause()
            VideoBtnDom.innerText = '播放'
        }
        if (!VideoDom.paused || !VideoDom.ended) {
            const res = await setTimeToHide(1500, VideoBtnDom);
            if (res === 'ok') {
                setStatus(false);
                clearTimeout(timer);
            }

        }
    }
    return (
        <div id='video_box' ref={videoBox} onClick={() => setStatus(true)}>
            <video
                ref={videoRef}
                width='100%'
                height='auto'
                object-fill='fill'
            >
                <source src={videoLink} type='video/mp4' />
            </video>
            <div className='video_play' ref={videoBth} onClick={playVideo}>播放</div>
            <VideoControl status={status ? 'control' : 'progress'} currentTime={currentTime} totalTime={videoRef.current?.duration} />
        </div>
    )
}

export default VideoSelf;