import ContentView from './components/ContentView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import './components/styleSchema.scss';

export const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <ContentView />
        </JotaiProvider>
      </QueryClientProvider>
    </div>
  );
}
