import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Helmet>
          <title>About the Toolific Hub | Free Online Tools</title>
          <meta
            name="description"
            content="Learn more about the Toolific Hub, a platform offering fast, free, browser-based online tools with no sign-up required."
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
          About the Toolific Hub
        </h1>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              What is the Toolific Hub?
            </h2>
            <p>
              the Toolific Hub is a collection of fast, simple, and free
              browser-based utilities designed to solve everyday problems.
              All tools work instantly without sign-ups, downloads, or accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Who is it for?
            </h2>
            <p>
              the Toolific Hub is built for anyone who needs quick answers or
              calculations — students, professionals, creators, developers,
              and everyday users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              How it works
            </h2>
            <p>
              All tools run entirely in your browser. No data is sent to a
              server, and no personal information is required to use any
              feature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Privacy & Simplicity
            </h2>
            <p>
              the Toolific Hub does not require accounts or collect personal
              data. Some preferences, such as favorited tools, may be stored
              locally in your browser for convenience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Contact
            </h2>
            <p>
              For questions, feedback, or suggestions, you can reach us at:
            </p>
            <p className="mt-2 font-medium text-slate-900">
              contact@thetoolifichub.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
