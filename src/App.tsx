import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WalletContextProvider } from './context/WalletContextProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateToken } from './pages/CreateToken';
import { CreateMarket } from './pages/CreateMarket';
import { CreateLiquidity } from './pages/CreateLiquidity';
import { Dashboard } from './pages/Dashboard';
import { Airdrop } from './pages/Airdrop';
import { Explore } from './pages/Explore';
import { NFTFundraise } from './pages/NFTFundraise';
import { Affiliate } from './pages/Affiliate';
import { TokenProfile } from './pages/TokenProfile';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import BlogList from './pages/blog/BlogList';
import LaunchToken from './pages/blog/LaunchToken';
import FreezeAuthority from './pages/blog/FreezeAuthority';
import TokenomicsGuide from './pages/blog/TokenomicsGuide';
import AvoidScams from './pages/blog/AvoidScams';
import SplVsErc20 from './pages/blog/SplVsErc20';
import LiquidityPools from './pages/blog/LiquidityPools';
import MarketIDs from './pages/blog/MarketIDs';
import AirdropStrategies from './pages/blog/AirdropStrategies';
import MetadataGuide from './pages/blog/MetadataGuide';
import SupplyManagement from './pages/blog/SupplyManagement';
import ContractAnalysis from './pages/blog/ContractAnalysis';
import BurnLiquidity from './pages/blog/BurnLiquidity';
import DexListing from './pages/blog/DexListing';
import OpenBookGuide from './pages/blog/OpenBookGuide';
import RaydiumPoolFailed from './pages/blog/RaydiumPoolFailed';
import CheapestOpenBook2025 from './pages/blog/CheapestOpenBook2025';
import TickSizeMistakes from './pages/blog/TickSizeMistakes';

function App() {
  return (
    <HelmetProvider>
      <WalletContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateToken />} />
              <Route path="/create-market" element={<CreateMarket />} />
              <Route path="/create-liquidity" element={<CreateLiquidity />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/fundraise" element={<NFTFundraise />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/token/:mintAddress" element={<TokenProfile />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/raydium-pool-failed" element={<RaydiumPoolFailed />} />
              <Route path="/blog/cheapest-openbook-2025" element={<CheapestOpenBook2025 />} />
              <Route path="/blog/tick-size-mistakes" element={<TickSizeMistakes />} />
              <Route path="/blog/how-to-launch-token" element={<LaunchToken />} />
              <Route path="/blog/freeze-authority-explained" element={<FreezeAuthority />} />
              <Route path="/blog/tokenomics-guide" element={<TokenomicsGuide />} />
              <Route path="/blog/avoid-crypto-scams" element={<AvoidScams />} />
              <Route path="/blog/spl-vs-erc20" element={<SplVsErc20 />} />
              <Route path="/blog/liquidity-pool-guide" element={<LiquidityPools />} />
              <Route path="/blog/openbook-market-guide" element={<OpenBookGuide />} />
              <Route path="/blog/market-id-guide" element={<MarketIDs />} />
              <Route path="/blog/airdrop-strategies" element={<AirdropStrategies />} />
              <Route path="/blog/metadata-guide" element={<MetadataGuide />} />
              <Route path="/blog/supply-management" element={<SupplyManagement />} />
              <Route path="/blog/contract-analysis" element={<ContractAnalysis />} />
              <Route path="/blog/burn-liquidity-guide" element={<BurnLiquidity />} />
              <Route path="/blog/dex-listing-guide" element={<DexListing />} />
            </Routes>
          </Layout>
        </Router>
      </WalletContextProvider>
    </HelmetProvider>
  );
}

export default App;
