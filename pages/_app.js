import { StoreProvider } from '@/Utils/Store';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
