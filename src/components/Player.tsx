import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx';
import { IoPause, IoPlay } from 'react-icons/io5';
import { IoMdShuffle, IoMdRepeat } from 'react-icons/io';
import { RiVolumeUpLine, RiVolumeMuteLine } from 'react-icons/ri';
import { useAtom } from 'jotai';
import stateAtom from './../atoms/state';
import { useEffect, useRef, useState } from 'react';
import formatDuration from './../utils/formatDuration.js';
import getStringDetails from '../utils/getStringDetails';

export default function Player() {
  const [isChangingSong, setChagingSong] = useState(false);
  const [atomState, setAtomState] = useAtom(stateAtom);
  const [isLooping, setLooping] = useState(false);
  const [isPaused, setPause] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [isAudioLoaded, setAudioLoading] = useState(false);
  const [songTime, setSongTime] = useState<{
    currentTime: number;
    duration: number;
  }>({
    currentTime: 0,
    duration: 0,
  });
  const baseUrl = 'http://localhost:8080/songs/';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setAudioLoading(false);
    console.log(atomState.elementProps.index);
  }, [atomState.elementProps.source]);

  function changeAudioTime(audioElement: HTMLAudioElement, value: number) {
    let time = value * (audioElement.duration / 100);
    audioElement.currentTime = time;
  }

  function updateInputValue(audioElement: HTMLAudioElement, inputElement: any) {
    let value = (audioElement.currentTime / audioElement.duration) * 100;
    inputElement.value = value;
  }

  function handleFillSlider(audioElement: HTMLAudioElement, inputElement: any) {
    let percent = (audioElement.currentTime / audioElement.duration) * 100;
    inputElement.style.background = `linear-gradient(to right, #E1316D 0%, #E91E4A ${percent}%, #644A54 ${percent}%, #bbbbbb8c 100%)`;
  }

  function handleFillVolumeSlider(
    audioElement: HTMLAudioElement,
    inputElement: any,
    inverse: Boolean
  ) {
    if (inverse) {
      let percent = audioElement.volume * 100;
      inputElement.style.background = `linear-gradient(to right, #C25EAD 0%, #F9206E ${percent}%, #644A54 ${percent}%, #bbbbbb8c 100%)`;
    } else {
      let inputValue = inputElement.value / 100;
      let percent = inputValue * 100;
      audioElement.volume = inputValue;
      inputElement.style.background = `linear-gradient(to right, #C25EAD 0%, #F9206E ${percent}%, #644A54 ${percent}%, #bbbbbb8c 100%)`;
    }
  }

  function handleAudioLoop(audioElement: HTMLAudioElement) {
    setLooping(!isLooping);
    audioElement.loop = isLooping;
  }

  function handleAudioPlayPause(audioElement: HTMLAudioElement) {
    if (isPaused) {
      setPause(!isPaused);
      audioElement.play();
      return;
    }
    setPause(!isPaused);
    audioElement.pause();
  }

  function getRandit(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function handleChangeAudio(index: number, option: string) {
    if (index >= 0) {
      console.log(index);
      setAudioLoading(false);
      interface IOptionsSchema {
        [key: string]: number;
        next: number;
        prev: number;
        random: number;
      }

      let options: IOptionsSchema = {
        next: index + 1,
        prev: index - 1,
        random: getRandit(0, atomState.newData.length),
      };

      console.log({ index, newIndex: options[option] });

      setAtomState((stateAtom) => ({
        ...stateAtom,
        elementProps: {
          source: atomState.newData[options[option]],
          index: options[option],
        },
      }));
    }
  }

  function handleAudioVolume(
    audioElement: HTMLAudioElement,
    inputElement: any
  ) {
    audioElement.volume = Number(inputElement) / 100;
  }

  function getSongTime(audioElement: HTMLAudioElement) {
    if (audioElement.currentTime && audioElement.duration) {
      setSongTime({
        ...songTime,
        currentTime: audioElement.currentTime,
        duration: audioElement.duration,
      });
    }
  }

  function limitString(str: string | undefined, num: number) {
    if (str && str.length > num) {
      return str.slice(0, num) + '...';
    }
    return str;
  }

  return (
    <div className='Player'>
      <div className='thumbnail'>
        <span>
          {atomState.newData[atomState.elementProps.index]
            ? limitString(
                getStringDetails(
                  atomState.newData[atomState.elementProps.index]
                )?.title,
                20
              )
            : ''}
        </span>
        <span>
          {atomState.newData[atomState.elementProps.index]
            ? limitString(
                getStringDetails(
                  atomState.newData[atomState.elementProps.index]
                )?.artist,
                15
              )
            : ''}
        </span>
      </div>
      <div className='controls'>
        <i>
          {audioRef.current && audioRef.current.volume > 0 ? (
            <RiVolumeUpLine />
          ) : (
            <RiVolumeMuteLine />
          )}
        </i>
        <input
          ref={volumeSliderRef}
          className='volumeRef'
          step={0.1}
          type='range'
          defaultValue={audioRef.current?.volume}
          onChange={(e: any) => {
            if (audioRef.current) {
              handleAudioVolume(audioRef.current, e.target.value);
              handleFillVolumeSlider(audioRef.current, e.target, false);
            }
          }}
        />
      </div>
      <div className='tracker'>
        <div className='icons'>
          <i
            style={isRandom ? { color: '#e91e63' } : { color: '#fff' }}
            onClick={() => {
              setRandom(!isRandom);
            }}
          >
            <IoMdShuffle />
          </i>

          <i
            onClick={() => {
              handleChangeAudio(atomState.elementProps.index, 'prev');
            }}
          >
            <RxTrackPrevious />
          </i>

          <i
            onClick={() => {
              if (audioRef.current) handleAudioPlayPause(audioRef.current);
            }}
          >
            {isPaused ? <IoPlay /> : <IoPause />}
          </i>

          <i
            onClick={() => {
              if (isRandom) {
                handleChangeAudio(atomState.elementProps.index, 'random');
                return;
              }
              handleChangeAudio(atomState.elementProps.index, 'next');
            }}
          >
            <RxTrackNext />
          </i>

          <i
            style={isLooping ? { color: '#fff' } : { color: '#e91e63' }}
            onClick={() => {
              if (audioRef.current) {
                handleAudioLoop(audioRef.current);
              }
            }}
          >
            <IoMdRepeat />
          </i>
        </div>
        <div className='range'>
          <audio
            autoPlay
            onLoadedData={() => {
              setAudioLoading(true);
            }}
            onEnded={() => {
              if (isRandom) {
                handleChangeAudio(atomState.elementProps.index, 'random');
                return;
              }
              handleChangeAudio(atomState.elementProps.index, 'next');
            }}
            onTimeUpdate={(e: any) => {
              if (isAudioLoaded) {
                updateInputValue(e.target, sliderRef.current);
                getSongTime(e.target);
                handleFillSlider(e.target, sliderRef.current);
                handleFillVolumeSlider(e.target, volumeSliderRef.current, true);
              }
            }}
            ref={audioRef}
            src={baseUrl + atomState.elementProps.source ?? ''}
          ></audio>
          <input
            className='sliderRef'
            defaultValue={'0'}
            ref={sliderRef}
            onChange={(e) => {
              if (audioRef.current) {
                changeAudioTime(audioRef.current, Number(e.target.value));
                handleFillSlider(audioRef.current, e.target);
              }
            }}
            type='range'
            step={0.1}
          />
          <div className='time'>
            <span>{formatDuration(songTime.currentTime)}</span>
            <span>{formatDuration(songTime.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
