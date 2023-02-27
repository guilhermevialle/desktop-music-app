import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import stateAtom from './../atoms/state';
import getStringDetails from '../utils/getStringDetails';
import filterTracksByInput from './../utils/filterTracksByInput';
import StyledString from './StyledString';

interface SonglistProps {}

export default function Songlist(props: SonglistProps) {
  const [atomState, setAtomState] = useAtom(stateAtom);
  const tracksRef = useRef<(HTMLLIElement | null)[]>([]);

  function handleUpdateElementProps(index: number, array: []) {
    console.log('Updating props');
    setAtomState((stateAtom) => ({
      ...stateAtom,
      newData: array,
      elementProps: {
        source: array[index],
        index,
      },
    }));
  }

  function handleFilterTracks(arr: string[]) {
    if (atomState.inputQuery === '') {
      return atomState.data;
    }

    return arr.filter((e) => {
      return filterTracksByInput(e, atomState.inputQuery).length > 0;
    });
  }

  useEffect(() => {
    makeTrackFocus(tracksRef.current[atomState.elementProps.index]);
  }, [atomState, makeTrackFocus]);

  function makeTrackFocus(focused: HTMLElement | null) {
    if (!focused) {
      return;
    }

    document
      .querySelectorAll('.btnFocus')
      .forEach((element: any) => element.classList.remove('btnFocus'));
    focused.classList.add('btnFocus');
  }

  return (
    <div className='songlist'>
      <h3>Playlist</h3>
      <ul>
        {atomState.newData?.length > 0
          ? handleFilterTracks(atomState.newData).map(
              (e, index, array: any) => {
                return (
                  <li
                    ref={(el) => (tracksRef.current[index] = el)}
                    key={index}
                    onClick={() => {
                      if (atomState.inputElement) {
                        atomState.inputElement.value = '0';
                      }

                      handleUpdateElementProps(index, array);
                    }}
                  >
                    {index}. &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    <StyledString
                      indexArr={filterTracksByInput(e, atomState.inputQuery)}
                      str={`${getStringDetails(e)?.artist} - ${
                        getStringDetails(e)?.title
                      } `}
                    />
                    {atomState.elementProps.index === index ? (
                      <div className='trackPlayingAnimation'>
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                  </li>
                );
              }
            )
          : null}
      </ul>
    </div>
  );
}
