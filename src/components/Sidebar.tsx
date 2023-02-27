import Button from './Button';
import { FcMusic } from 'react-icons/fc';

export default function Sidebar() {
  return (
    <div className='Sidebar'>
      <Button svg={<FcMusic />} text={'Songs'}></Button>
    </div>
  );
}
