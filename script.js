const music = document.querySelector('.music-container');
const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");


//Song titles

const songs = ['jamayka','little_green_bag','naimononedari','one_dance'
,'one_more_night','paranoid','promises','uma_thurman','youngblood']

// Tracking the songs

let index = 8;

// Loading songs into DOM

loadSong(songs[index]);

//Update song details

function loadSong(song){
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
//Play song
function playSong(){
  music.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
//Pause song
function pauseSong(){
  music.classList.remove("play");
  play.querySelector("i.fas").classList.add("fa-play");
  play.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}
//Previous Song
function prevSong(){
  index--;
  if(index<0)
  {
    index = songs.length-1;
  }
  loadSong(songs[index]);

  playSong();
}

//Next song
function nextSong(){
  index++;
  if(index>songs.length-1)
  {
    index = 0;
  }
  loadSong(songs[index]);

  playSong();
}

//Updating Progress
function updateProgress(e){
  const {duration,currentTime} = e.srcElement;
  const progressPercent = (currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;
}
// Set Progress Bar
function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX/width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	}

	get_sec (currentTime,sec);

	// change currentTime DOM
	currentTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	}

	// define seconds duration

	get_sec_d (duration);

	// change duration DOM
	DurTime.innerHTML = min_d +':'+ sec_d;

};

//Event Listeners
play.addEventListener("click",function(){
  const isPlaying = music.classList.contains("play");

  if(isPlaying){
      pauseSong();
  }
  else{
    playSong();
  }
});

//Change song events

prev.addEventListener("click",prevSong);
next.addEventListener("click",nextSong);

audio.addEventListener("timeupdate",updateProgress);

//clicking on progress bar to go there

progressContainer.addEventListener('click', setProgress);


audio.addEventListener("ended",nextSong);
audio.addEventListener('timeupdate',DurTime);
