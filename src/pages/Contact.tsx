import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl text-zinc-400">
          Have questions or suggestions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <a href="mailto:support@aicyberprophet.fun" className="text-zinc-400 hover:text-blue-400 transition-colors">
                    support@aicyberprophet.fun
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Social Media</p>
                  <p className="text-zinc-400">Follow us on Twitter for updates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-zinc-400">Decentralized / Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="bg-zinc-900/30 p-8 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
              <textarea 
                id="message"
                rows={4}
                className="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
