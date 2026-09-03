import React, { useState } from 'react';
import { TripPlan } from '../types';
import { 
  generateFlutterDartCode, 
  generateGithubWorkflowYaml, 
  generatePubspecYaml 
} from '../utils/flutterGenerator';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Smartphone, 
  Terminal, 
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

interface FlutterExportModalProps {
  plan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'github_apk' | 'main_dart' | 'workflow' | 'pubspec';

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({
  plan,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('github_apk');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dartCode = generateFlutterDartCode(plan);
  const workflowYaml = generateGithubWorkflowYaml();
  const pubspecYaml = generatePubspecYaml();

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'workflow':
        return workflowYaml;
      case 'pubspec':
        return pubspecYaml;
      case 'main_dart':
      default:
        return dartCode;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleDownload = () => {
    let content = dartCode;
    let filename = `main.dart`;

    if (activeTab === 'workflow') {
      content = workflowYaml;
      filename = 'build-apk.yml';
    } else if (activeTab === 'pubspec') {
      content = pubspecYaml;
      filename = 'pubspec.yaml';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 text-stone-100 rounded-[32px] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border-2 border-[#FF6B6B]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 flex items-center justify-center text-[#FF6B6B] shadow-xs">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black uppercase tracking-tight text-white">
                  Flutter & GitHub APK Hub
                </h3>
                <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  GitHub Actions Configured
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                Full Flutter project code with automated GitHub Actions CI/CD to build APK
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-900 border-b border-stone-800 px-5 pt-3 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('github_apk')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'github_apk'
                ? 'bg-stone-950 text-[#FF6B6B] border-t-2 border-x border-[#FF6B6B]'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>How to Build APK on GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('main_dart')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'main_dart'
                ? 'bg-stone-950 text-[#FF6B6B] border-t-2 border-x border-[#FF6B6B]'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>lib/main.dart</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'workflow'
                ? 'bg-stone-950 text-[#FF6B6B] border-t-2 border-x border-[#FF6B6B]'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>.github/workflows/build-apk.yml</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pubspec')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pubspec'
                ? 'bg-stone-950 text-[#FF6B6B] border-t-2 border-x border-[#FF6B6B]'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>pubspec.yaml</span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'github_apk' ? (
          <div className="flex-1 p-6 overflow-y-auto bg-stone-950 text-stone-300 space-y-5">
            <div className="bg-gradient-to-r from-stone-900 to-stone-850 p-5 rounded-2xl border border-stone-800">
              <h4 className="text-white font-black text-sm uppercase tracking-wide flex items-center gap-2">
                <Github className="w-4 h-4 text-[#FF6B6B]" />
                Automated Cloud APK Build via GitHub Actions
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                The repository already contains the complete Flutter code and the official GitHub Actions workflow file at <code className="bg-stone-800 text-[#4ECDC4] px-1.5 py-0.5 rounded font-mono">.github/workflows/build-apk.yml</code>. You don't need Android Studio or Flutter installed on your PC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center font-black text-xs mb-3">
                    1
                  </div>
                  <h5 className="text-white font-bold text-sm">Push Code to GitHub</h5>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    Use Google AI Studio's <strong>Settings &gt; Export to GitHub</strong> button or push this repository directly with git:
                  </p>
                  <code className="block mt-2 bg-black/60 p-2 rounded text-[11px] font-mono text-[#4ECDC4]">
                    git push origin main
                  </code>
                </div>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-full bg-[#4ECDC4] text-stone-900 flex items-center justify-center font-black text-xs mb-3">
                    2
                  </div>
                  <h5 className="text-white font-bold text-sm">Open Actions Tab</h5>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    In your GitHub repository, click on the <strong>Actions</strong> tab. You will see <em>"Build Flutter APK"</em> automatically running or click <strong>Run workflow</strong>.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-[#4ECDC4] font-bold">
                  <Play className="w-3 h-3" /> Automatic on every push
                </div>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-full bg-[#FFD93D] text-stone-900 flex items-center justify-center font-black text-xs mb-3">
                    3
                  </div>
                  <h5 className="text-white font-bold text-sm">Download APK</h5>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    Once the workflow completes with a green checkmark (~2 mins), scroll to <strong>Artifacts</strong> and click:
                  </p>
                  <div className="mt-2 bg-black/60 p-2 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> TripPlanner-release-apk
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
              <h5 className="text-white font-bold text-xs flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-[#FFD93D]" />
                Building Locally (Optional)
              </h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                If you prefer building on your local machine with Flutter installed:
              </p>
              <pre className="bg-black/60 p-3 rounded-xl mt-2 font-mono text-xs text-[#4ECDC4] overflow-x-auto">
{`flutter pub get
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk`}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 bg-stone-950">
            <div className="p-3 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between px-5 text-xs text-stone-400">
              <span className="font-mono text-[11px]">
                {activeTab === 'main_dart' && 'lib/main.dart (Material 3 + 3 Pinterest Photos Carousel)'}
                {activeTab === 'workflow' && '.github/workflows/build-apk.yml (GitHub Actions CI/CD)'}
                {activeTab === 'pubspec' && 'pubspec.yaml (Flutter dependencies & specs)'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B6B] hover:bg-[#EE5253] text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-auto font-mono text-xs leading-relaxed text-stone-300 select-all">
              <pre className="whitespace-pre">{getCurrentCode()}</pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Target: Android 5.0+ (API 21+) to Android 15 (API 35)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
