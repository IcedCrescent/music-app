const background = document.getElementById('background')
const thumbnail = document.getElementById('thumbnail')
const song = document.getElementById('song')

const songArtist = document.getElementsByClassName('song-artist')[0]
const songTitle = document.getElementsByClassName('song-title')[0]
const progressBar = document.getElementById('progress-bar')
const pPause = document.getElementById('play-pause')

let songs = ['./assets/music/Mot Cu Lua - Bich Phuong.mp3',
             './assets/music/Senorita - Shawn Mendes_ Camila Cabello.mp3', 
             './assets/music/Mang Chung - Am Khuyet Thi Thinh_ Trieu.mp3',
             './assets/music/Yeu Thi Yeu Khong Yeu Thi Yeu - AMEE.mp3']

let thumbnails = ['./assets/cover/121626.jpg',
                './assets/cover/106207.jpg',
                './assets/cover/105542.jpg',
                './assets/cover/122486.jpg']

let artists = ['Bích Phương', 'Shawn Mendes, Camila Cabello', 'Âm Khuyết Thi Thính', 'AMEE']

let titles = ['Một cú lừa', 'Señorita', 'Mang chủng', 'Yêu thì yêu không yêu thì yêu']

let playing = true

function playPause() {
    if (playing) {
        pPause.src = './assets/icon/icons8-pause-64.png'

        song.play()
        playing = false
    } else {
        pPause.src = './assets/icon/icons8-play-64.png'

        song.pause()
        playing = true
    }
}

let songIndex = 0

function nextSong() {
    songIndex++
    // If the current index goes beyond the array length, reset to the first song
    if (songIndex >= songs.length)
        songIndex = 0

    song.src = songs[songIndex]
    thumbnail.src = thumbnails[songIndex]
    background.src = thumbnails[songIndex]

    songArtist.innerHTML = artists[songIndex]
    songTitle.innerHTML = titles[songIndex]

    playing = true
    playPause()
}

function previousSong() {
    songIndex--
    // If the current index goes beyond the array length, reset to the first song
    if (songIndex < 0)
        songIndex = songs.length - 1

    song.src = songs[songIndex]
    thumbnail.src = thumbnails[songIndex]
    background.src = thumbnails[songIndex]

    songArtist.innerHTML = artists[songIndex]
    songTitle.innerHTML = titles[songIndex]

    playing = true
    playPause()
}

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds - (min * 60))
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}

function updateProgressValue() {
    progressBar.max = song.duration
    progressBar.value = song.currentTime
    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime));
    if (document.querySelector('.durationTime').innerHTML === 'NaN:NaN') {
        document.querySelector('.durationTime').innerHTML = '0:00';
    } else {
        document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(song.duration));
    }
}

setInterval(updateProgressValue, 500)

function changeProgressBar() {
    song.currentTime = progressBar.value
}