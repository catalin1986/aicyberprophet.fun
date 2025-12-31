import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6">
        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Shield className="w-6 h-6" />
            <h2>1. Introduction</h2>
          </div>
          <p>
            Welcome to AiCyberProphet ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website aicyberprophet.fun.
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Eye className="w-6 h-6" />
            <h2>2. Information We Collect</h2>
          </div>
          <p>
            We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Wallet addresses and blockchain interactions</li>
            <li>Usage data and analytics</li>
            <li>Device information and IP addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <Lock className="w-6 h-6" />
            <h2>3. How We Use Your Information</h2>
          </div>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To facilitate account creation and logon process</li>
            <li>To post testimonials</li>
            <li>To request feedback</li>
            <li>To enable user-to-user communications</li>
            <li>To manage user accounts</li>
          </ul>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <FileText className="w-6 h-6" />
            <h2>4. Cookie Policy & GDPR Compliance</h2>
          </div>
          <p>
            We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
          </p>
          <p className="mt-4">
            <strong>For EEA, UK, and Swiss Users:</strong> We comply with the GDPR and provide you with options to manage your consent preferences regarding data collection and advertising cookies through our Consent Management Platform (CMP).
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg border space-y-4">
          <h2 className="text-xl font-semibold text-primary">5. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at support@aicyberprophet.fun.
          </p>
        </section>
      </div>
    </div>
  );
};
