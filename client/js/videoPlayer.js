const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const volumeRange = document.getElementById("volume")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const timeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen")
const videoContainer = document.getElementById("videoContainer")
const videoControls = document.getElementById("videoControls")

let controlsTimeout = null;
let controlsMovement = null
let volumeValue = 0.5
video.volume = volumeValue

const handlePlayClick = (e) => {
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

const handleMute = (e) => {
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute"
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handlePlay = () => playBtn.innerText = "Pause"
const handlePause = () => playBtn.innerText = "Play"
const handleVolumeChange = (e) => {
    const {target: {value}} = e;
    if(video.muted){
        video.muted = false
        muteBtn.innerText = "Mute"
    }
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11,8)

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration)
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime)
}

const handleTimelineChange = (e) => {
    const {target: {value}} = e;
    video.currentTime = value
}

const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement
    if(fullscreen){
        document.exitFullscreen()
        fullScreenBtn.innerText = "Enter full screen"
    }else{
        videoContainer.requestFullscreen()
        fullScreenBtn.innerText = "Exit full screen"
    }
}

const hideControls = () => videoControls.classList.remove("showing")

const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout)
        controlsTimeout = null;
    }
    if(controlsMovement){
        clearTimeout(controlsMovement)
        controlsMovement = null
    }
    videoControls.classList.add("showing")
    controlsMovement = setTimeout(hideControls, 3000)
}

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000)
    

}

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
video.addEventListener("pause", handlePause)
video.addEventListener("play", handlePlay)
volumeRange.addEventListener("input", handleVolumeChange)
video.addEventListener("loadedmetadata", handleLoadedMetadata)
video.addEventListener("timeupdate", handleTimeUpdate)
timeline.addEventListener("input", handleTimelineChange)
fullScreenBtn.addEventListener("click", handleFullScreen)
video.addEventListener("mousemove", handleMouseMove)
video.addEventListener("mouseleave", handleMouseLeave)