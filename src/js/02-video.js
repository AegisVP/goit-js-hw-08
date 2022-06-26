import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIMESTAMP_NAME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeupdate,1000));
onPageLoad();

function onTimeupdate(data) {
  localStorage.setItem(TIMESTAMP_NAME, data.seconds);
}

function onPageLoad() {
  const savedVideoTime = localStorage.getItem(TIMESTAMP_NAME);
  if (savedVideoTime) {
    player.setCurrentTime(savedVideoTime);
  }
}