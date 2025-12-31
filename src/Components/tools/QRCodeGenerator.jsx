import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download } from 'lucide-react';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (!input) {
      setQrUrl('');
      return;
    }

    QRCode.toDataURL(input, {
      width: 300,
      margin: 2,
    })
      .then(setQrUrl)
      .catch(() => setQrUrl(''));
  }, [input]);

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">

      {/* Input */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <QrCode className="w-5 h-5 text-teal-600" />
          <label className="font-medium text-slate-900">
            Enter Text or URL
          </label>
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com"
          className="w-full h-12 rounded-xl border border-slate-200 px-4 text-base bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />

        <p className="text-xs text-slate-400 mt-2">
          Enter any text, URL, phone number, or message
        </p>
      </div>

      {/* Output */}
      {qrUrl && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex flex-col items-center">

            <div className="bg-white p-4 rounded-xl border-2 border-slate-100 mb-4">
              <img
                src={qrUrl}
                alt="Generated QR Code"
                className="w-64 h-64 max-w-full"
              />
            </div>

            <button
              onClick={downloadQR}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

