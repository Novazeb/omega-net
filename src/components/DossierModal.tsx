import { User, ShieldAlert, Cpu, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type Subject = {
    id: string;
    codename: string;
    status: "Active" | "Terminated" | "MIA";
    threatLevel: "Low" | "High" | "Critical";
    locked: boolean;
    details?: string;
};

interface DossierModalProps {
    subject: Subject | null;
    onClose: () => void;
}

export default function DossierModal({ subject, onClose }: DossierModalProps) {
    if (!subject) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-deep-black/80 backdrop-blur-sm flex items-end md:items-center justify-end md:justify-center p-0 md:p-8 custom-cursor"
            >
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="bg-dark-charcoal w-full md:w-[600px] h-[80vh] md:h-auto border-t-2 md:border-2 border-terminal-green shadow-[-10px_10px_0_rgba(0,255,65,0.2)] flex flex-col relative"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b-2 border-terminal-green p-4 bg-terminal-green/10">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-pure-white flex items-center gap-3">
                            <Fingerprint className="text-terminal-green" />
                            Dossier: {subject.id}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-pure-white text-2xl hover:text-blood-red font-black leading-none px-4"
                        >
                            X
                        </button>
                    </div>

                    <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                        {/* Subject Identity Block */}
                        <div className="flex gap-6 mb-8 items-start">
                            <div className="w-32 h-32 border-2 border-terminal-green bg-deep-black flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                                <User className="w-16 h-16 text-terminal-green/50" />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.1)_50%)] bg-[length:100%_4px] group-hover:animate-pulse"></div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h4 className="text-3xl font-black text-pure-white uppercase tracking-tighter">
                                    {subject.codename}
                                </h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-cyber-yellow border border-cyber-yellow px-2 py-1 uppercase font-bold">
                                        Status: {subject.status}
                                    </span>
                                    <span className={`text-xs border px-2 py-1 uppercase font-bold flex items-center gap-1 ${subject.threatLevel === 'Critical' ? 'text-blood-red border-blood-red' :
                                            subject.threatLevel === 'High' ? 'text-cyber-yellow border-cyber-yellow' :
                                                'text-terminal-green border-terminal-green'
                                        }`}>
                                        <ShieldAlert className="w-3 h-3" />
                                        Threat: {subject.threatLevel}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Terminal Feed */}
                        <div className="border border-terminal-green/30 bg-deep-black p-4 relative">
                            <div className="absolute top-0 right-0 p-1 bg-terminal-green text-deep-black uppercase text-[10px] font-black">
                                Terminal Feed
                            </div>
                            <p className="text-sm leading-relaxed text-pure-white mb-4 mt-2 font-mono before:content-['>_'] before:mr-2 before:text-terminal-green before:animate-pulse">
                                {subject.details || "RESTRICTED DOCUMENTATION. NO FURTHER DATA RECOVERED."}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-terminal-green/60 uppercase tracking-widest mt-6">
                                <Cpu className="w-4 h-4" />
                                SYS_NET_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
