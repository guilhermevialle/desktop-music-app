import './ContentView.css';
import Sidebar from './Sidebar';
import Player from './Player';
import Songlist from './Songlist';
import Searchbar from './Searchbar';
import GetAllLocalSongs from './GetAllLocalSongs';

export default function ContentView() {
  GetAllLocalSongs();

  return (
    <div className='ContentView'>
      <div className='Sidebar'>
        <Sidebar />
      </div>
      <div className='Searchbar'>
        <Searchbar />
      </div>
      <div className='Playerbar'>
        <Player />
      </div>
      <div className='Contents'>
        <Songlist />
      </div>
    </div>
  );
}
