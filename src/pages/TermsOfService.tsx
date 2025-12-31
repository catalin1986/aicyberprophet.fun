import { FC } from 'react';
import { SEO } from '@/components/SEO';
import { Shield, Scale, AlertTriangle, ScrollText, DollarSign, Users } from 'lucide-react';

export const TermsOfService: FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black/50">
      <SEO 
        title="Terms of Service | AiCyberProphet"
        description="Read the Terms and Conditions for using AiCyberProphet tools, services, and affiliate program."
        keywords="terms of service, legal, disclaimer, crypto risks, user agreement"
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-border/50 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
             <Scale className="w-4 h-4" />
             Legal Agreement
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">Conditions</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By accessing AiCyberProphet, you agree to be bound by these conditions.
          </p>
          <p className="text-sm text-zinc-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-zinc-300">
          
          {/* Section 1: Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-primary" />
              1. Acceptance of Terms
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <p>
                By accessing or using the AiCyberProphet platform ("Service"), including our token creator, marketplace, affiliate program, and liquidity tools, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.
              </p>
            </div>
          </section>

          {/* Section 2: Services & Blockchain Nature */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              2. Nature of Services & Risk Disclosure
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <p className="font-semibold text-white">2.1 Non-Custodial Service</p>
              <p>
                AiCyberProphet is a non-custodial interface. We do not hold, store, or manage your private keys or assets. You maintain full control and responsibility for your Solana wallet at all times.
              </p>

              <p className="font-semibold text-white mt-4">2.2 Blockchain Risks</p>
              <p>
                You acknowledge that blockchain transactions are irreversible. AiCyberProphet cannot reverse, refund, or restore any transaction once signed by your wallet. You accept all risks associated with the Solana network, including congestion, failed transactions, and smart contract vulnerabilities.
              </p>

              <p className="font-semibold text-white mt-4">2.3 No Financial Advice</p>
              <p>
                Nothing on this platform constitutes financial, investment, or legal advice. Token creation and trading involve high risk. Do not invest money you cannot afford to lose.
              </p>
            </div>
          </section>

          {/* Section 3: Credits & Payments */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              3. Credits, Payments & Refunds
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Credits System:</strong> "Credits" purchased on AiCyberProphet are utility tokens internal to the platform. They are non-refundable and have no monetary value outside our ecosystem.
                </li>
                <li>
                  <strong className="text-white">No Refunds:</strong> Due to the immutable nature of blockchain transactions, all sales (Token Launches, Market IDs, NFT purchases) are final. No refunds will be issued for "accidental" purchases or user errors.
                </li>
                <li>
                  <strong className="text-white">Fees:</strong> The platform charges service fees in SOL or AICP for various tools. These fees are displayed clearly before transaction signing.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Affiliate Program */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              4. Affiliate Program
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <p>
                Users participating in the Affiliate Program agree to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Commissions (40%) are paid automatically or manually based on the specific tool used.</li>
                <li>Self-referrals (using your own link to get a discount) are prohibited and may result in a ban.</li>
                <li>We reserve the right to modify commission rates or terminate the program at any time.</li>
                <li>Affiliates must not use spam or deceptive marketing practices to promote their links.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Prohibited Activities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              5. Prohibited Activities
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <p>You agree NOT to use AiCyberProphet for:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Illegal activities, including money laundering or financing terrorism.</li>
                <li>Creating "Rug Pulls" or deceptive tokens intended to defraud investors.</li>
                <li>Uploading illegal or malicious content to the NFT marketplace.</li>
                <li>Exploiting bugs or vulnerabilities in the platform (please report them instead).</li>
              </ul>
              <p className="text-red-400 mt-2 font-medium">
                Violation of these rules may result in the blacklisting of your wallet address from our services.
              </p>
            </div>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, AICYBERPROPHET SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-zinc-500 pt-12 border-t border-border/50">
          <p>For legal inquiries, please contact: legal@aicyberprophet.fun</p>
        </div>
      </div>
    </div>
  );
};
