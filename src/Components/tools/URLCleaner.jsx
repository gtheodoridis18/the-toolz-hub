import React, { useState, useEffect } from 'react';
import { Link, Sparkles, Copy, Check } from 'lucide-react';

const TRACKING_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'msclkid', 'mc_cid', 'mc_eid',
  'ref', 'source', '_ga', 'campaign_id', 'ad_id',
  'mkt_tok', 'trk', 'icid', 'igshid', 'sr_share'
];

export default function URLCleaner() {
  const [url, setUrl] = useState('');
  const [cleanUrl, setCleanUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [removedCount, setRemovedCount] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (!url) {
      setCleanUrl('');
      setRemovedCount(0);
      setIsInvalid(false);
      return;
    }

    try {
      const original = new URL(url);
      const params = new URLSearchParams(original.search);
      const originalCount = params.size;

      TRACKING_PARAMS.forEach((param) => {
        params.delete(param);
      });

      original.search = params.toString();
      const cleaned = original.toString().replace(/\?$/, '');

      setCleanUrl(cleaned);
      setRemovedCount(originalCount - params.size);
      setIsInvalid(false);
    } catch {
      setIsInvalid(true);
      setCleanUrl('');
      setRemovedCount(0);
    }
  }, [url]);

  const copyToClipboard = () => {
    if (!cleanUrl) return;
    navigator.clipboard.writeText(cleanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Original URL */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link className="w-5 h-5 text-blue-600" />
          <label className="font-medium text-slate-900">Original URL</label>
        </div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com?utm_source=google&fbclid=123"
          className="w-full h-12 rounded-xl border border-slate-200 px-3 text-sm font-mono bg-white"
        />
      </div>

      {/* Clean URL */}
      {cleanUrl && !isInvalid && (
        <>
          <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <label className="font-medium text-teal-900">Clean URL</label>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="bg-white rounded-xl p-3 border border-teal-200">
              <p className="text-sm font-mono break-all text-slate-900">
                {cleanUrl}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Tracking Parameters Removed
                </p>
                <p className="text-2xl font-light text-slate-900 mt-1">
                  {removedCount}
                </p>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                ✓ Cleaned
              </div>
            </div>
          </div>
        </>
      )}

      {/* Invalid URL */}
      {isInvalid && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 text-sm">Please enter a valid URL</p>
        </div>
      )}
    </div>
  );
}

