import React, { useState } from 'react';
import { TripPlan } from '../types';
import { generateFlutterDartCode } from '../utils/flutterGenerator';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Smartphone, 
  Terminal, 
  ExternalLink 
} from 'lucide-react';

interface FlutterExportModalProps {
  plan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({
  plan,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dartCode = generateFlutterDartCode(plan);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dartCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([dartCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `trip_planner_${plan.destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.dart`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-stone-900 text-stone-100 rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border-2 border-[#FF6B6B]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 flex items-center justify-center text-[#FF6B6B] shadow-xs">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                Flutter (Dart) App Code
                <span className="text-[11px] font-black bg-[#FFD93D] text-[#2D2D2D] px-2.5 py-0.5 rounded-full border border-[#E5B80B]">
                  Material 3 Ready
                </span>
              </h3>
              <p className="text-xs text-stone-400 font-medium">
                Pure Dart code with models and UI widgets ready for your Flutter project
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-stone-950 px-5 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
          <div className="flex items-center gap-2 font-medium">
            <Terminal className="w-4 h-4 text-[#4ECDC4]" />
            <span>To run: <code className="bg-stone-800 px-2 py-0.5 rounded text-[#4ECDC4] font-bold">flutter create trip_app</code>, paste into <code className="bg-stone-800 px-2 py-0.5 rounded text-[#4ECDC4] font-bold">lib/main.dart</code>, and run <code className="bg-stone-800 px-2 py-0.5 rounded text-[#4ECDC4] font-bold">flutter run</code></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-copy-flutter-code"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl font-black transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4ECDC4]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              id="btn-download-flutter-code"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FF6B6B] hover:bg-[#EE5253] border-b-2 border-[#EE5253] text-white rounded-xl font-black transition-all shadow-xs active:translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .dart</span>
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="flex-1 p-5 overflow-auto bg-stone-950 font-mono text-xs leading-relaxed text-stone-300 select-all">
          <pre className="whitespace-pre">{dartCode}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900 flex items-center justify-between text-xs text-stone-400">
          <span>Target: Flutter 3.x+ with Material 3</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
