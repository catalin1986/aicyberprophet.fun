import { FC } from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy: FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6">
        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Shield className="w-6 h-6" />
            <h2>1. Introduction</h2>
          </div>
          <p className="text-muted-foreground">
            Welcome to AiCyberProphet ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Eye className="w-6 h-6" />
            <h2>2. Data We Collect</h2>
          </div>
          <p className="text-muted-foreground">
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> Includes information about how you use our website, products, and services.</li>
            <li><strong>Blockchain Data:</strong> Public wallet addresses and transaction data interactions with the Solana blockchain.</li>
          </ul>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Lock className="w-6 h-6" />
            <h2>3. Cookies and Advertising</h2>
          </div>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
          </p>
          <div className="mt-4 p-4 bg-secondary/20 rounded-md">
            <h3 className="font-semibold text-foreground mb-2">Google AdSense</h3>
            <p className="text-sm text-muted-foreground">
              We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. 
              Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. 
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Ad Settings</a>.
            </p>
          </div>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <FileText className="w-6 h-6" />
            <h2>4. Third-Party Links</h2>
          </div>
          <p className="text-muted-foreground">
            This website may include links to third-party websites, plug-ins, and applications (such as Solana wallets). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
            We do not control these third-party websites and are not responsible for their privacy statements.
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <h2 className="text-xl font-semibold text-primary">5. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this privacy policy or our privacy practices, please contact us via our social media channels or check our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
};
