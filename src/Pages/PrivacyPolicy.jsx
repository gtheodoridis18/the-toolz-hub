import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Helmet>
          <title>Privacy Policy | the Toolific Hub</title>
          <meta
            name="description"
            content="Read the Privacy Policy of the Toolific Hub. Learn how we handle data, cookies, local storage, and user privacy."
          />
        </Helmet>
  
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          ← Back to Home
        </Link>  
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-slate-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Introduction
            </h2>
            <p>
              the Toolific Hub provides free, browser-based utilities that can be
              used without creating an account or providing personal
              information. Your privacy is important, and this page explains
              how data is handled when you use this website.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Data Collection
            </h2>
            <p>
              the Toolific Hub does not collect, store, or process personal data.
              There are no user accounts, registrations, or login systems.
              All tools run directly in your browser.
            </p>
          </section>

          {/* Local Storage */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Local Storage
            </h2>
            <p>
              The website uses browser localStorage only to save user preferences,
              such as favorited tools. This data remains on your device and is
              never transmitted to any server or shared with third parties.
            </p>
          </section>

          {/* Cookies & Ads */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Cookies & Advertising
            </h2>
            <p>
              the Toolific Hub may display third-party advertisements, such as
              Google AdSense. These advertising providers may use cookies or
              similar technologies to display relevant ads.
            </p>
            <p className="mt-2">
              the Toolific Hub does not control or have access to these cookies.
            </p>
          </section>

          {/* Analytics */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Analytics
            </h2>
            <p>
              the Toolific Hub does not use custom analytics systems to track
              individual users or personal behavior.
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              External Links
            </h2>
            <p>
              This website may contain links to external websites. the Toolz
              Hub is not responsible for the privacy practices or content of
              those third-party sites.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Changes to This Policy
            </h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes
              will be posted on this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Contact
            </h2>
            <p>
              If you have any questions about this Privacy Policy, you can
              contact us at:
            </p>
            <p className="mt-2 font-medium text-slate-900">
              contact@thetoolzhub.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
