import { useQuery } from '@tanstack/react-query';
import stateAtom from './../atoms/state';
import { useAtom } from 'jotai';
import axios from 'axios'

export default () => {
  const [atomState, setAtomState] = useAtom(stateAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ['songlist'],
    queryFn: () =>
      axios.get('http://localhost:8080/songs').then((res) => res.data),
    onSuccess: (data) => {
      setAtomState((stateAtom) => ({
        ...stateAtom,
        data,
        newData: data
      }));
    },
  });
};
