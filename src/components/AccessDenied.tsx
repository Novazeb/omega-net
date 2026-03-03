import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface AccessDeniedProps {
    onClose: () => void;
}

export default function AccessDenied({ onClose }: AccessDeniedProps) {
    // Auto-close or require escape to close (we'll provide a brutalist button)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blood-red/90 backdrop-blur-sm custom-cursor">
            <div className="bg-deep-black border-4 border-pure-white p-12 max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(255,0,60,0.8)] flex flex-col items-center text-center">
                <AlertTriangle className="w-32 h-32 text-pure-white mb-8 animate-pulse" strokeWidth={1} />

                <h2 className="text-4xl md:text-6xl font-black text-pure-white mb-4 tracking-tighter uppercase glitch-effect break-words">
                    Access Denied
                </h2>

                <p className="text-cyber-yellow text-xl md:text-2xl font-bold tracking-widest uppercase mb-12">
                    Clearance Level Insufficient
                </p>

                <div className="w-full bg-pure-white h-1 mb-8 opacity-20"></div>

                <button
                    onClick={onClose}
                    className="text-pure-white text-lg font-bold border-2 border-pure-white px-12 py-4 hover:bg-pure-white hover:text-blood-red transition-all uppercase tracking-[0.3em] custom-cursor"
                >
                    Acknowledge
                </button>
            </div>
        </div>
    );
}
