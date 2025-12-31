import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './context/WalletContextProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateToken } from './pages/CreateToken';
import { Dashboard } from './pages/Dashboard';
import { Airdrop } from './pages/Airdrop';
import { Explore } from './pages/Explore';
import { NFTFundraise } from './pages/NFTFundraise';
import { Affiliate } from './pages/Affiliate';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateToken />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/fundraise" element={<NFTFundraise />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
