import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  LayoutGrid,
  Sparkles,
  Sliders,
  CheckCircle2,
  Download,
  Plus,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Printer,
  Upload,
} from 'lucide-react';

export const CollageStudioView: React.FC = () => {
  const { activeProject, sendImageToTool, setCurrentView, settings } = useStudio();
  const isAr = settings.language === 'ar';

  const [canvasWidthCm, setCanvasWidthCm] = useState(30);
  const [canvasHeightCm, setCanvasHeightCm] = useState(40);
  const [numPhotos, setNumPhotos] = useState(7);
  const [isApplyingSmartLayout, setIsApplyingSmartLayout] = useState(false);
  const [layoutSeed, setLayoutSeed] = useState(1);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  // Apply Smart Layout
  const handleSmartLayout = () => {
    setIsApplyingSmartLayout(true);
    setTimeout(() => {
      setLayoutSeed((s) => s + 1);
      setIsApplyingSmartLayout(false);
    }, 500);
  };

  const handleDownloadCollage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createRadialGradient(600, 600, 100, 600, 800, 900);
    grad.addColorStop(0, '#16382c');
    grad.addColorStop(0.6, '#091c15');
    grad.addColorStop(1, '#020906');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1600);

    // Golden Borders
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1120, 1520);
    ctx.lineWidth = 2;
    ctx.strokeRect(65, 65, 1070, 1470);

    // Calligraphy Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 54px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('مبروك التخرج ٢٠٢٦', 600, 170);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    ctx.fillText('CLASS OF 2026 • 30×40 CM PREMIUM COLLAGE', 600, 220);

    // Central Frame
    ctx.fillStyle = '#08140f';
    ctx.fillRect(350, 300, 500, 650);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 8;
    ctx.strokeRect(350, 300, 500, 650);

    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(600, 560, 130, 0, Math.PI * 2);
    ctx.fill();

    // 6 Auxiliary Photo Frames
    const auxFrames = [
      { x: 100, y: 340, w: 180, h: 220, label: 'صورة ٢' },
      { x: 100, y: 600, w: 180, h: 220, label: 'صورة ٣' },
      { x: 920, y: 340, w: 180, h: 220, label: 'صورة ٤' },
      { x: 920, y: 600, w: 180, h: 220, label: 'صورة ٥' },
      { x: 220, y: 1020, w: 320, h: 240, label: 'صورة ٦ (عائلية)' },
      { x: 660, y: 1020, w: 320, h: 240, label: 'صورة ٧ (الأصدقاء)' },
    ];

    auxFrames.forEach((f) => {
      ctx.fillStyle = '#071610';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 4;
      ctx.strokeRect(f.x, f.y, f.w, f.h);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px Cairo, sans-serif';
      ctx.fillText(f.label, f.x + f.w / 2, f.y + f.h / 2);
    });

    // Student Badge
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 36px Cairo, sans-serif';
    ctx.fillText('المهندس / أحمد النجار', 600, 1360);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px Cairo, sans-serif';
    ctx.fillText('جامعة القاهرة • كلية الهندسة • مرتبة الشرف', 600, 1410);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `NAGAR_COLLAGE_${canvasWidthCm}x${canvasHeightCm}cm_${Date.now()}.png`;
    link.click();

    setDownloadMsg(
      isAr
        ? 'تم تحميل تصميم الكولاج بنجاح وجاهز للمطبعة والقص!'
        : 'Collage design exported and downloaded successfully!'
    );
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black text-slate-100">
              {isAr ? 'استوديو الكولاج الذكي (Collage Studio & Smart Layout)' : 'AI Smart Collage Studio'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              {canvasWidthCm} × {canvasHeightCm} cm • {numPhotos} Photos
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'توزيع ذكي للعناصر بمراعاة التوازن والوزن البصري وعدم تكرار الإطارات (Graduation 30x40 - 7 Photos)'
              : 'AI auto-arranges multi-photo layouts with balance, visual hierarchy, and diverse frames.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSmartLayout}
            disabled={isApplyingSmartLayout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isApplyingSmartLayout ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'إعادة التوزيع الذكي' : 'Re-Arrange'}</span>
          </button>

          <button
            onClick={handleDownloadCollage}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? 'تحميل الكولاج' : 'Download Collage'}</span>
          </button>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadMsg}</span>
          </div>
          <button onClick={() => setDownloadMsg(null)} className="text-emerald-400 font-bold">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas Visualization (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-2xl aspect-[3/4] rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-[#11271f] via-[#091712] to-[#030906] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Outer Luxury Golden Border */}
            <div className="absolute inset-3 border-2 border-amber-400/80 rounded-xl pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-amber-400/40 rounded-lg pointer-events-none" />

            {/* Top Heading */}
            <div className="text-center z-10 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300 font-sans tracking-wide">
                مبروك التخرج ٢٠٢٦
              </h2>
              <p className="text-[11px] text-slate-300 tracking-widest font-mono">
                CLASS OF 2026 • 30×40 CM PREMIUM COLLAGE
              </p>
            </div>

            {/* Smart Layout Photo Slots Grid (7 Photos with hierarchy) */}
            <div className="flex-1 my-4 grid grid-cols-6 grid-rows-6 gap-2.5 z-10">
              {/* Photo 1: Big Center Portrait (Main Subject - Locked) */}
              <div className="col-span-4 row-span-4 col-start-2 row-start-1 rounded-xl border-2 border-amber-400 bg-slate-900/90 shadow-xl overflow-hidden relative group">
                <img
                  src={activeProject.prompts?.[0]?.references?.[0]?.url}
                  alt="Main Portrait"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[9px] shadow">
                  🔒 {isAr ? 'الخريج الأساسي' : 'Main Subject'}
                </span>
              </div>

              {/* Photo 2: Top Left Auxiliary */}
              <div className="col-span-2 row-span-2 col-start-1 row-start-1 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 2
                </div>
              </div>

              {/* Photo 3: Middle Left Auxiliary */}
              <div className="col-span-2 row-span-2 col-start-1 row-start-3 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 3
                </div>
              </div>

              {/* Photo 4: Top Right Auxiliary */}
              <div className="col-span-2 row-span-2 col-start-5 row-start-1 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 4
                </div>
              </div>

              {/* Photo 5: Middle Right Auxiliary */}
              <div className="col-span-2 row-span-2 col-start-5 row-start-3 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 5
                </div>
              </div>

              {/* Photo 6: Bottom Left Auxiliary */}
              <div className="col-span-3 row-span-2 col-start-1 row-start-5 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 6 (عائلية)
                </div>
              </div>

              {/* Photo 7: Bottom Right Auxiliary */}
              <div className="col-span-3 row-span-2 col-start-4 row-start-5 rounded-lg border border-amber-400/60 bg-emerald-950/40 overflow-hidden relative p-1">
                <div className="w-full h-full border border-amber-400/30 rounded flex items-center justify-center text-[10px] text-amber-200 font-bold">
                  صورة 7 (الأصدقاء)
                </div>
              </div>
            </div>

            {/* Bottom Caption & Ribbon */}
            <div className="text-center z-10 space-y-0.5">
              <div className="inline-block px-6 py-1 rounded-full border border-amber-400/60 bg-amber-500/20 text-amber-300 font-bold text-xs">
                المهندس / أحمد النجار
              </div>
              <p className="text-[10px] text-slate-400">جامعة القاهرة • كلية الهندسة • مرتبة الشرف</p>
            </div>
          </div>
        </div>

        {/* Right: Parameters & Layout Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'إعدادات الكولاج' : 'Collage Settings'}</span>
            </h3>

            {/* Canvas Dimensions */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">{isAr ? 'العرض (cm)' : 'Width cm'}</label>
                <input
                  type="number"
                  value={canvasWidthCm}
                  onChange={(e) => setCanvasWidthCm(Number(e.target.value))}
                  className="w-full bg-[#090e17] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">{isAr ? 'الارتفاع (cm)' : 'Height cm'}</label>
                <input
                  type="number"
                  value={canvasHeightCm}
                  onChange={(e) => setCanvasHeightCm(Number(e.target.value))}
                  className="w-full bg-[#090e17] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>

            {/* Number of Photos */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>{isAr ? 'عدد الصور (Photos Count)' : 'Photos Count'}</span>
                <span className="font-mono text-amber-400 font-bold">{numPhotos} Photos</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[3, 5, 7, 9, 12].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setNumPhotos(cnt)}
                    className={`py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      numPhotos === cnt
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                        : 'border-slate-800 bg-[#090e17] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Layout Principles Verification */}
            <div className="p-3 rounded-xl bg-[#090e17] border border-slate-800 space-y-2 text-[11px]">
              <span className="text-amber-400 font-bold block">{isAr ? 'معايير التوزيع الذكي المطبقة:' : 'Smart Rules Applied:'}</span>
              <div className="space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{isAr ? 'إطارات بأحجام متفاوتة غير متطابقة' : 'Diverse non-repeating frames'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{isAr ? 'الإطارات واضحة ولا توجد صور متناهية الصغر' : 'No tiny unrecognizable frames'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{isAr ? 'صورة الشخص الرئيسي تحتل الوزن الأكبر 🔒' : 'Main subject gets visual priority'}</span>
                </div>
              </div>
            </div>

            {/* Export or Send to Print */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  sendImageToTool(activeProject.originalImages?.[0] || '', 'print-prep');
                  setCurrentView('print-prep');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'تجهيز الكولاج للطباعة' : 'Prepare for Printing'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
