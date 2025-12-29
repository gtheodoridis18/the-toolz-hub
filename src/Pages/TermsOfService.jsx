import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Helmet>
          <title>Terms of Service | the Toolific Hub</title>
          <meta
            name="description"
            content="Review the Terms of Service for the Toolific Hub. Understand usage rules, limitations, and responsibilities when using our tools."
          />
        </Helmet>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-slate-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Toolific Hub, you agree to be bound by
              these Terms of Service. If you do not agree, please do not use
              this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Use of the Website
            </h2>
            <p>
              the Toolific Hub provides free, browser-based utilities for general
              informational and personal use only. All tools operate entirely
              on the client side.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              No Guarantees
            </h2>
            <p>
              The tools are provided “as is” without warranties of any kind.
              the Toolific Hub does not guarantee accuracy, completeness, or
              suitability of any results generated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Limitation of Liability
            </h2>
            <p>
              the Toolific Hub shall not be held liable for any direct, indirect,
              incidental, or consequential damages arising from the use or
              inability to use this website or its tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              User Responsibility
            </h2>
            <p>
              You are responsible for how you use the tools and for verifying
              any results before relying on them for decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Modifications
            </h2>
            <p>
              the Toolific Hub may update or modify these Terms at any time.
              Continued use of the website constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Governing Law
            </h2>
            <p>
              These Terms shall be governed and interpreted in accordance with
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
