import React, { useState, useEffect, useRef } from 'react';
import {
  Coffee,
  Unlock,
  Volume2,
  VolumeX,
  SkipForward,
  CheckCircle2,
  Power,
  Sparkles,
  Terminal,
  Cpu,
} from 'lucide-react';

interface DramaticSplashScreenProps {
  onComplete: () => void;
}

export const DramaticSplashScreen: React.FC<DramaticSplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [boyState, setBoyState] = useState<'walking' | 'sitting' | 'booting' | 'typing' | 'cheering'>('walking');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound synthesizer for footsteps, boot beeps, mechanical clicks, and triumph chime
  const playSynthSound = (type: 'footstep' | 'click' | 'boot' | 'keystroke' | 'success') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'footstep') {
        // Soft footstep tap
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'click') {
        // Satisfying mechanical power switch click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.06);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'boot') {
        // Classic retro PC boot beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'keystroke') {
        // Subtle typewriter / key clatter
        osc.type = 'square';
        osc.frequency.setValueAtTime(320 + Math.random() * 220, now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'success') {
        // The beloved triumph chord for ACCESS GRANTED
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.type = 'sine';
          subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
          subGain.gain.setValueAtTime(0.08, now + i * 0.08);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.start(now + i * 0.08);
          subOsc.stop(now + i * 0.08 + 0.6);
        });
      }
    } catch {
      // Audio not permitted or failed silently
    }
  };

  const handleFinish = () => {
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    const totalDuration = 8000; // 8 seconds total
    const intervalTime = 50;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);

        // Sub-phase 1: Boy walks in (0% to 14%)
        if (next < 14) {
          setPhase(1);
          setBoyState('walking');
          if (Math.random() > 0.6) {
            playSynthSound('footstep');
          }
        }
        // Sub-phase 2: Boy reaches desk and sits down (14% to 22%)
        else if (next < 22) {
          setPhase(1);
          setBoyState('sitting');
        }
        // Sub-phase 3: Boy hits the power button on the system! (22% to 28%)
        else if (next < 28) {
          if (!powerOn) {
            setPowerOn(true);
            playSynthSound('click');
            setTimeout(() => {
              playSynthSound('boot');
            }, 120);
          }
          setPhase(1);
          setBoyState('booting');
        }
        // Phase 2: Linux kernel boots on screen & boy types furiously (28% to 58%)
        else if (next < 58) {
          setPhase(2);
          setBoyState('typing');
          if (Math.random() > 0.45) {
            playSynthSound('keystroke');
          }
        }
        // Phase 3: Desktop ready & portfolio script launches (58% to 80%)
        else if (next < 80) {
          setPhase(3);
          setBoyState('cheering');
        }
        // Phase 4: THE BELOVED ACCESS GRANTED CELEBRATION! (80% to 100%)
        else {
          if (phase !== 4) {
            playSynthSound('success');
          }
          setPhase(4);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            handleFinish();
          }, 400);
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [powerOn, phase]);

  // Authentic & humorous Linux boot lines
  const linuxBootLines = [
    { time: '0.000000', type: 'INFO', text: 'Linux kernel 6.12.0-kola-workstation (x86_64) (gcc 14.2)' },
    { time: '0.120401', type: 'OK', text: 'CPU0: Initializing 16x High-Speed Neural Core threads' },
    { time: '0.340192', type: 'OK', text: 'RAM: 64GB DDR5 (12GB reserved for 95 open browser tabs)' },
    { time: '0.581023', type: 'OK', text: 'ACPI: CoffeeDaemon.service loaded (240mg caffeine standby)' },
    { time: '0.892019', type: 'OK', text: 'EXT4-fs: Mounting /home/kola/portfolio... READ/WRITE OK' },
    { time: '1.203912', type: 'OK', text: 'NET: Establishing 10Gbps fiber link to Gabriel Kola Aderonmu' },
    { time: '1.584102', type: 'OK', text: 'SYSTEMD: Loading defense platforms: MCT-RB, AMS & DSCC-App' },
    { time: '1.982012', type: 'OK', text: 'SYSTEMD: Initializing PyTorch & Hands-On LLM Neural Engines' },
    { time: '2.401928', type: 'OK', text: 'CHECK: Linting CSS rules... 0 bugs, 100% responsive magic' },
    { time: '2.849102', type: 'OK', text: 'STATUS: Target visitor classified as VIP Client / Hiring Partner' },
    { time: '3.190284', type: 'OK', text: 'GRAPHICS: Starting KolaWaylandCompositor in 4K 120Hz...' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-slate-950 text-white font-mono select-none overflow-hidden transition-all duration-700 ${
        isClosing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Matrix & Subtle Cyber Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950 to-emerald-950/20 pointer-events-none" />

      {/* Top Header Control Bar (Clean: Boy/Girl switcher removed) */}
      <header className="relative w-full px-6 py-4 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>KOLA'S WORKSTATION // BOOTING UP PORTFOLIO</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-semibold">{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
          </button>

          {/* Skip Button */}
          <button
            onClick={handleFinish}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center text-center z-10">
        
        {/* PHASES 1 to 3: The Setup, Walking Boy, Booting & Linux Screen */}
        {phase < 4 ? (
          <div className="w-full flex flex-col items-center space-y-4 animate-in fade-in duration-300">
            
            {/* Playful Dynamic Speech Bubble following the Boy's actions */}
            <div className="relative px-4 py-2 rounded-2xl bg-slate-900 border border-emerald-500/40 text-xs text-emerald-300 font-bold shadow-lg animate-bounce flex items-center gap-2">
              <span className="text-base">
                {boyState === 'walking' ? '🚶‍♂️' : boyState === 'sitting' ? '💺' : boyState === 'booting' ? '⚡' : boyState === 'typing' ? '👨‍💻' : '🎉'}
              </span>
              {boyState === 'walking' && (
                <span>"Just walked in! Let me take a seat and boot up Kola's system..."</span>
              )}
              {boyState === 'sitting' && (
                <span>"Pulling up my gaming chair... reaching for the power button!"</span>
              )}
              {boyState === 'booting' && (
                <span className="text-amber-300">"*CLACK!* Power switch pressed! System booting up..."</span>
              )}
              {boyState === 'typing' && (
                <span>"Streaming Linux kernel... look at those defense-grade modules compiling!"</span>
              )}
              {boyState === 'cheering' && (
                <span>"Boom! System is 100% ready. Unlocking front door for you!"</span>
              )}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/40 rotate-45" />
            </div>

            {/* The Computer Workstation with Linux Display */}
            <div className="relative w-full max-w-2xl rounded-2xl p-2.5 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl flex flex-col">
              
              {/* Monitor Top Bezel with Webcam */}
              <div className="h-4 flex items-center justify-center relative mb-1">
                <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                  <div className={`w-0.5 h-0.5 rounded-full ${powerOn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
                </div>
              </div>

              {/* Monitor Display Glass */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl bg-black border border-slate-900 overflow-hidden flex flex-col text-left font-mono">
                
                {/* CRT Scanline Filter */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] z-20"
                  style={{ backgroundSize: '100% 4px' }}
                />

                {!powerOn ? (
                  // Screen is Off / Standby waiting for the boy to press the button
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-3">
                    <div className="p-3 rounded-full bg-slate-900/80 border border-slate-800 animate-pulse">
                      <Power className="w-10 h-10 text-slate-600" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Workstation in Sleep Mode • Waiting for Power Switch...
                    </span>
                  </div>
                ) : phase === 1 ? (
                  // Initial Power-On Flash
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-emerald-950/20">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Cpu className="w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      BIOS v4.8 — GABRIEL KOLA ADERONMU RIG
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      CPU: Intel Core i9 • RAM: 64GB DDR5 • PCIe 5.0 NVMe
                    </p>
                    <div className="text-[10px] text-emerald-400 font-bold animate-pulse">
                      &gt;&gt; POWER ON CONFIRMED: BOOTING ARCH LINUX KERNEL...
                    </div>
                  </div>
                ) : phase === 2 ? (
                  // Streaming Linux Boot Pages
                  <div className="flex-1 p-3.5 overflow-hidden flex flex-col justify-end text-[10px] sm:text-[11px] space-y-1">
                    {/* Header info bar */}
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Arch Linux 6.12-kola • Booting...</span>
                      </span>
                      <span className="text-amber-400 font-semibold">TTY1 /dev/pts0</span>
                    </div>

                    {/* Scrolling authentic Linux boot log entries */}
                    {linuxBootLines.slice(0, Math.floor(((progress - 20) / 45) * linuxBootLines.length) + 3).map((line, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 truncate">
                        <span className="text-slate-500 shrink-0">[{line.time}]</span>
                        <span className="font-bold text-emerald-400 shrink-0">[{line.type}]</span>
                        <span className="text-slate-300 truncate">{line.text}</span>
                      </div>
                    ))}
                    <div className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                      <span>_</span>
                    </div>
                  </div>
                ) : (
                  // Phase 3: Desktop Command Script Executing
                  <div className="flex-1 p-4 bg-slate-950 flex flex-col justify-between text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] text-slate-400 ml-1">bash - kola@workstation:~</span>
                      </div>

                      <p className="text-emerald-400 font-bold">
                        kola@workstation:~$ ./launch-portfolio.sh --vip-mode
                      </p>
                      <p className="text-slate-300 text-[11px]">
                        &gt; Bundling defense-grade apps: MCT-RB, AMS, DSCC... [Done]
                      </p>
                      <p className="text-slate-300 text-[11px]">
                        &gt; Activating smooth 60fps React components... [Done]
                      </p>
                      <p className="text-cyan-400 text-[11px] font-bold">
                        &gt; VIP Client detected! Unlocking front door...
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Ready to launch! Welcome aboard.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Monitor Stand */}
              <div className="w-16 h-4 mx-auto bg-slate-700 mt-1 rounded-b" />
              <div className="w-28 h-1.5 mx-auto bg-slate-800 rounded-full" />
            </div>

            {/* The Room Floor: Boy Walking In, Sitting Down, and Powering Up */}
            <div className="relative w-full max-w-2xl h-24 overflow-hidden flex items-end justify-between px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/40 rounded-2xl">
              
              {/* Steaming Espresso on Desk Left */}
              <div className="flex flex-col items-center mb-2 z-10">
                <div className="relative">
                  <Coffee className="w-6 h-6 text-amber-500" />
                  <span className="absolute -top-2.5 left-1 text-[9px] text-slate-400 animate-bounce">~</span>
                </div>
                <span className="text-[9px] font-bold text-amber-400">Coffee</span>
              </div>

              {/* Central Gaming Desk & Chair Setup */}
              <div className="relative flex flex-col items-center justify-end z-10">
                {/* Gaming Chair */}
                <div className="w-16 h-14 rounded-t-2xl bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center relative">
                  <div className="w-12 h-2 rounded-full bg-emerald-500/40 mb-1" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Pro Chair</span>
                </div>
                {/* Chair Wheel Base */}
                <div className="w-12 h-2 bg-slate-700 rounded-full mt-0.5" />
              </div>

              {/* Animated Boy Character Moving Across the Room */}
              <div
                className={`absolute bottom-2 transition-all duration-700 ease-out z-20 flex flex-col items-center ${
                  boyState === 'walking'
                    ? 'left-6 animate-pulse'
                    : 'left-1/2 -translate-x-1/2'
                }`}
              >
                {/* The Character Visual */}
                <div className="relative flex flex-col items-center">
                  {/* Status Indicator */}
                  <span className="px-2 py-0.5 mb-1 rounded-full text-[9px] font-bold bg-slate-900 border border-emerald-500/30 text-emerald-400 shadow-md">
                    {boyState === 'walking' && '🚶‍♂️ Walking to Desk...'}
                    {boyState === 'sitting' && '💺 Sitting Down...'}
                    {boyState === 'booting' && '⚡ Hitting Power Switch!'}
                    {boyState === 'typing' && '👨‍💻 Typing 180 WPM'}
                    {boyState === 'cheering' && '🎉 System Ready!'}
                  </span>

                  {/* Character Avatar Icon with Contextual Gestures */}
                  <div className="relative w-14 h-14 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400/50 shadow-lg flex items-center justify-center text-3xl">
                    {boyState === 'walking' && (
                      <span className="animate-bounce">🚶‍♂️</span>
                    )}
                    {boyState === 'sitting' && (
                      <span className="animate-pulse">🧑‍💻</span>
                    )}
                    {boyState === 'booting' && (
                      <span className="scale-110 animate-ping">🔘</span>
                    )}
                    {boyState === 'typing' && (
                      <span className="animate-bounce">🧑‍💻</span>
                    )}
                    {boyState === 'cheering' && (
                      <span className="animate-bounce">🙌</span>
                    )}

                    {/* Fun sparkles when typing */}
                    {boyState === 'typing' && (
                      <span className="absolute -top-1 -right-1 text-xs animate-ping">⚡</span>
                    )}
                  </div>
                </div>
              </div>

              {/* PC Gaming Tower with Power Button & RGB Fans on Right */}
              <div className="flex flex-col items-center mb-1 z-10">
                <div className="w-12 h-18 rounded-xl bg-slate-900 border-2 border-slate-700 p-1 flex flex-col items-center justify-between shadow-xl">
                  {/* Power Button */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      powerOn
                        ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                        : 'bg-slate-800 border-slate-600'
                    }`}
                  >
                    <Power className={`w-2 h-2 ${powerOn ? 'text-white' : 'text-slate-500'}`} />
                  </div>

                  {/* RGB Cooling Fans */}
                  <div className="space-y-1 w-full flex flex-col items-center">
                    <div className={`w-8 h-4 rounded-md border flex items-center justify-center ${powerOn ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-slate-800'}`}>
                      <span className={`text-[8px] ${powerOn ? 'text-emerald-400 animate-spin' : 'text-slate-700'}`}>⚙</span>
                    </div>
                    <div className={`w-8 h-4 rounded-md border flex items-center justify-center ${powerOn ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800'}`}>
                      <span className={`text-[8px] ${powerOn ? 'text-cyan-400 animate-spin' : 'text-slate-700'}`}>⚙</span>
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">PC Rig</span>
              </div>

            </div>
          </div>
        ) : (
          /* PHASE 4: THE ACCESS GRANTED SCENE (The user's favorite!) */
          <div className="space-y-6 animate-in zoom-in-90 duration-300 flex flex-col items-center">
            {/* Big Glowing Bouncing Access Stamp */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400/80 shadow-[0_0_60px_rgba(16,185,129,0.4)] flex flex-col items-center space-y-2 animate-bounce">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Unlock className="w-8 h-8 sm:w-10 sm:h-10" />
                <span className="text-2xl sm:text-4xl font-black uppercase tracking-widest">
                  ACCESS GRANTED
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-emerald-300 tracking-wider">
                CLEARANCE VERIFIED: V.I.P. CLIENT STATUS
              </span>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                Welcome to Gabriel Kola Aderonmu's Universe
              </h3>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-sans">
                Prepare your eyeballs for high-performance React architectures, defense-grade engineering, and zero CSS compromises.
              </p>
            </div>

            <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Launching Portfolio in 1 second...</span>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Loading Bar (User likes this!) */}
      <footer className="relative w-full max-w-3xl px-6 py-5 z-20 flex flex-col space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2 font-bold text-slate-300">
            <span className="animate-spin inline-block">⚡</span>
            <span>Booting Gabriel Kola's Workstation...</span>
          </span>
          <span className="font-extrabold text-emerald-400 text-sm">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Glow Progress Track */}
        <div className="w-full h-3.5 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Kola Aderonmu • Senior AI/ML & Full-Stack Systems Architect</span>
          <span>Zero templates • 100% genuine code</span>
        </div>
      </footer>
    </div>
  );
};
