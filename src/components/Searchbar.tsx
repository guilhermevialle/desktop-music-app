import { IoMdSearch } from 'react-icons/io';
import { useAtom } from 'jotai';
import stateAtom from './../atoms/state';

export default function Searchbar() {
  const [atomState, setAtomState] = useAtom(stateAtom);

  return (
    <div className='Searchbar'>
      <div className='group'>
        <i>
          <IoMdSearch />
        </i>
        <input
          type='text'
          placeholder='Find yours songs!'
          onKeyDown={(e: any) => {
            if (e.keyCode == 13) {
              setAtomState((atomState) => ({
                ...atomState,
                inputQuery: e.target.value,
              }));
            }
          }}
        />
      </div>
    </div>
  );
}
