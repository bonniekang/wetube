const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const volumeRange = document.getElementById("volume")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")

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

const handleLoadedMetadata = () => {
    totalTime.innerText = Math.floor(video.duration);
}

const handleTimeUpdate = () => {
    currentTime.innerText = Math.floor(video.currentTime);
}

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
video.addEventListener("pause", handlePause)
video.addEventListener("play", handlePlay)
volumeRange.addEventListener("input", handleVolumeChange)
video.addEventListener("loadedmetadata", handleLoadedMetadata)
video.addEventListener("timeupdate", handleTimeUpdate)