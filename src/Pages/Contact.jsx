import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Helmet>
          <title>Contact the Toolific Hub</title>
          <meta
            name="description"
            content="Contact the Toolific Hub for questions, feedback, or support related to our free online tools."
          />
        </Helmet>

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Contact
        </h1>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Get in Touch
            </h2>
            <p>
              If you have questions, feedback, suggestions, or notice any issues
              with the tools, feel free to reach out.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Email
            </h2>
            <p>
              You can contact the Toolific Hub directly at:
            </p>
            <p className="mt-2 font-medium text-slate-900">
              contact@thetoolzhub.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Response Time
            </h2>
            <p>
              We aim to respond to legitimate inquiries as soon as possible.
              Please note that the Toolific Hub does not offer user accounts or
              personalized support.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
