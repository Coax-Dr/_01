import React, { useRef, useState, useEffect } from 'react';
import VideoControl from './components/videoControl';
import './index.css'
const VideoSelf = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoBth = useRef<HTMLDivElement>(null);
    const videoBox = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const videoLink = 'https://dev-oss.gramaker.com/developer/free/material%E8%88%9E%E5%8F%B0-1611817500732.mp4'
    let timer: NodeJS.Timeout;

    const setTimeToHide = (time: number, node: HTMLDivElement) => {
        return new Promise(() => {
            timer = setTimeout(() => {
                node.style.display = 'none'
                clearTimeout(timer)
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
        }, false);
        VideoDom.addEventListener('pause', () => {
            setCurrentTime(VideoDom.currentTime);
        }, false);
        VideoDom.addEventListener('ended', () => {
            VideoBtnDom.style.display = 'flex'
            VideoBtnDom.innerText = '播放'
        }, false);
        return () => {
            // VideoDom.removeEventListener();
        }
    }, [])
    /**
     * 播放视频
     */
    const playVideo = async (e: any) => {
        // 点击播放按钮
        e.stopPropagation();
        const VideoDom = videoRef.current as HTMLVideoElement
        const VideoBtnDom = videoBth.current as HTMLDivElement
        if (VideoDom.ended) {
            // 视频播放完毕
            VideoDom.play();
            VideoBtnDom.innerText = '暂停'
        } else if (VideoDom.paused) {
            // 视频暂停
            VideoDom.play()
            VideoBtnDom.innerText = '暂停'
        } else {
            // 视频播放中
            VideoDom.pause()
            VideoBtnDom.innerText = '播放'
        }
        if (!VideoDom.paused && !VideoDom.ended) {
            const res = await setTimeToHide(1500, VideoBtnDom);
            if (res === 'ok') {
                setStatus(false);
                clearTimeout(timer);
            }

        }
    }
    const changeStatus = () => {
        // 点击视频区域
        const VideoBtnDom = videoBth.current as HTMLDivElement;
        const isRendered = VideoBtnDom.style.display === 'flex';
        console.log('定时器', timer);
        if(isRendered){
            // 播放按钮已经渲染
            VideoBtnDom.style.display = 'none'; // 消失
            clearTimeout(timer);
        } else {
            // 播放按钮未渲染
            VideoBtnDom.style.display = 'flex'; // 显示
            setTimeToHide(1500, VideoBtnDom);
        }
        // if (timer) {
        //     clearTimeout(timer);
        //     VideoBtnDom.style.display = 'none'
        //     setStatus(false);
        // } else {
        //     setStatus(!status);
        //     if (!status) {
        //         VideoBtnDom.style.display = 'none'
        //     } else {
        //         VideoBtnDom.style.display = 'flex'
        //         const res = await setTimeToHide(1500, VideoBtnDom);
        //         if(res === 'ok'){
        //             clearTimeout(timer);
        //         }
        //     }
        // }
    }
    return (
        <div id='video_box' ref={videoBox} onClick={changeStatus}>
            <video
                ref={videoRef}
                width='100%'
                height='auto'
                object-fill='fill'
            >
                <source src={videoLink} type='video/mp4' />
            </video>
            <div className='video_play' ref={videoBth} onClick={(e: any) => playVideo(e)}>播放</div>
            <VideoControl status={status ? 'control' : 'progress'} currentTime={currentTime} totalTime={videoRef.current?.duration} />
        </div>
    )
}

export default VideoSelf;