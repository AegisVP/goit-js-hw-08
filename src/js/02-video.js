const TIMESTAMP_NAME = 'videoplayer-current-time';

import throttle from 'lodash.throttle';

import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const resetBtnRef = document.querySelector('#reset-time');

resetBtnRef.addEventListener('click', onResetClick);
player.on('timeupdate', throttle(onTimeupdate, 1000));

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

function onResetClick() {
  player.pause();
  player.setCurrentTime(0);
  localStorage.removeItem(TIMESTAMP_NAME);
}