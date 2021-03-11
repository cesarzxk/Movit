import { GlobalProvider } from '../contexts/GlobalContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return( 
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
    );
}

export default MyApp
