import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Maximize2,
  Minimize2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  FileCheck2,
  Layers,
} from 'lucide-react';

import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Configure PDF.js worker with Vite asset URL or verified cdnjs fallback
pdfjsLib.GlobalWorkerOptions.workerSrc =
  pdfjsWorker ||
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFCanvasViewerProps {
  pdfUrl: string;
  fileName?: string;
  accentClass?: string;
  onOpenAdminUpload?: () => void;
}

export const PDFCanvasViewer: React.FC<PDFCanvasViewerProps> = ({
  pdfUrl,
  fileName = 'Resume_CV.pdf',
  accentClass = 'bg-emerald-500',
  onOpenAdminUpload,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('all');
  const [renderedAllCanvases, setRenderedAllCanvases] = useState<boolean>(false);
  const allPagesContainerRef = useRef<HTMLDivElement>(null);

  // Helper to convert base64 data URI to Uint8Array for guaranteed cross-origin & sandboxed loading
  const parsePdfData = useCallback((urlOrData: string) => {
    if (urlOrData.startsWith('data:')) {
      const base64Index = urlOrData.indexOf(';base64,');
      if (base64Index !== -1) {
        const base64 = urlOrData.substring(base64Index + 8);
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return { data: bytes };
      }
    }
    return { url: urlOrData };
  }, []);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadDoc = async () => {
      try {
        const source = parsePdfData(pdfUrl);
        const loadingTask = pdfjsLib.getDocument({
          ...source,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/`,
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (!isCancelled) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setCurrentPage(1);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to parse and load PDF:', err);
        if (!isCancelled) {
          setError(
            err?.message ||
              'Unable to load the PDF document. Please verify the file or re-upload.'
          );
          setLoading(false);
        }
      }
    };

    if (pdfUrl) {
      loadDoc();
    } else {
      setLoading(false);
      setError('No PDF document URL provided.');
    }

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, parsePdfData]);

  // Render single page onto main canvas
  const renderSinglePage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current || viewMode !== 'single') return;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale, rotation });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
    },
    [pdfDoc, scale, rotation, viewMode]
  );

  // Render all pages in continuous view
  const renderAllPages = useCallback(async () => {
    if (!pdfDoc || !allPagesContainerRef.current || viewMode !== 'all') return;

    try {
      const container = allPagesContainerRef.current;
      container.innerHTML = ''; // Clear existing rendered pages

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const pageWrapper = document.createElement('div');
        pageWrapper.className =
          'relative mb-8 bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all';

        // Page number tag
        const tag = document.createElement('div');
        tag.className =
          'px-3 py-1 bg-slate-800/80 text-white text-[10px] font-bold rounded-br-lg absolute top-0 left-0 z-10 backdrop-blur-xs';
        tag.textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
        pageWrapper.appendChild(tag);

        const canvas = document.createElement('canvas');
        pageWrapper.appendChild(canvas);
        container.appendChild(pageWrapper);

        const context = canvas.getContext('2d');
        if (!context) continue;

        const viewport = page.getViewport({ scale, rotation });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      }

      setRenderedAllCanvases(true);
    } catch (err) {
      console.error('Error rendering all PDF pages:', err);
    }
  }, [pdfDoc, scale, rotation, viewMode]);

  useEffect(() => {
    if (viewMode === 'single') {
      renderSinglePage(currentPage);
    } else {
      renderAllPages();
    }
  }, [currentPage, scale, rotation, viewMode, renderSinglePage, renderAllPages]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleFitWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48; // padding
      // Standard A4 width in 72 DPI is 595.28 points
      const idealScale = Math.min(Math.max(containerWidth / 620, 0.7), 1.6);
      setScale(Number(idealScale.toFixed(2)));
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    if (pdfUrl.startsWith('data:')) {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print ${fileName}</title>
              <style>body { margin: 0; display: flex; justify-content: center; } iframe { border: none; width: 100vw; height: 100vh; }</style>
            </head>
            <body>
              <iframe src="${pdfUrl}"></iframe>
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
          </html>
        `);
        win.document.close();
      }
    } else {
      window.print();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Top Professional Toolbar */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-slate-200 z-20">
        {/* Document Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span className="truncate max-w-[180px] sm:max-w-xs">{fileName}</span>
              {totalPages > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Inline Canvas Engine (Verified PDF.js)</span>
            </p>
          </div>
        </div>

        {/* View Mode & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle: All Pages vs Single Page */}
          {totalPages > 1 && (
            <div className="flex rounded-xl p-0.5 bg-slate-800/90 border border-slate-700 text-xs">
              <button
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'all'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Continuous All-Pages View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Pages</span>
              </button>
              <button
                onClick={() => setViewMode('single')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'single'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Single Page with Pagination"
              >
                <span>Single</span>
              </button>
            </div>
          )}

          {/* Pagination (for single page view) */}
          {viewMode === 'single' && totalPages > 1 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/90 border border-slate-700 rounded-xl text-xs">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-1 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-semibold text-slate-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="p-1 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Zoom & Rotate Controls */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-1.5 font-bold text-slate-300 min-w-[42px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleFitWidth}
              className="hidden sm:inline-block px-2 py-1 rounded-lg hover:bg-slate-700 text-[11px] font-semibold text-slate-300"
              title="Fit to Width"
            >
              Fit Width
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Rotate 90 degrees"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Actions: Download, Print, Fullscreen, Open in Tab */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all ${accentClass}`}
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Open Raw in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="relative w-full flex-1 min-h-[650px] max-h-[900px] overflow-auto bg-slate-950 p-4 sm:p-8 flex flex-col items-center justify-start">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs z-30 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-300">
              Rendering PDF Document...
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="max-w-md my-auto p-6 rounded-2xl bg-slate-900 border border-rose-500/30 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Preview Rendering Error</h4>
              <p className="text-xs text-slate-400 mt-1">{error}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <a
                href={pdfUrl}
                download={fileName}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Directly</span>
              </a>
              {onOpenAdminUpload && (
                <button
                  onClick={onOpenAdminUpload}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                >
                  Upload Updated PDF
                </button>
              )}
            </div>
          </div>
        )}

        {/* All Pages Continuous View Container */}
        <div
          ref={allPagesContainerRef}
          className={`flex flex-col items-center w-full ${
            viewMode === 'all' && !error ? 'block' : 'hidden'
          }`}
        />

        {/* Single Page Canvas View */}
        <div
          className={`relative bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all ${
            viewMode === 'single' && !error ? 'block' : 'hidden'
          }`}
        >
          <canvas ref={canvasRef} className="block max-w-full h-auto mx-auto" />
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Verified CV Document • Gabriel Kola Aderonmu</span>
        <div className="flex items-center gap-3">
          <span>Scale: {Math.round(scale * 100)}%</span>
          <span>•</span>
          <span>Rotation: {rotation}°</span>
        </div>
      </div>
    </div>
  );
};
