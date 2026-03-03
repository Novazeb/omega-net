import { type Subject } from './DossierModal';
import { ChevronRight, ChevronLeft, Lock, Unlock } from 'lucide-react';

interface DataTableProps {
    data: Subject[];
    currentPage: number;
    onPageChange: (page: number) => void;
    onViewSubject: (subject: Subject) => void;
}

const ITEMS_PER_PAGE = 8;

export default function DataTable({ data, currentPage, onPageChange, onViewSubject }: DataTableProps) {
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Table Header / Container */}
            <div className="border-2 border-terminal-green bg-dark-charcoal overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="border-b-2 border-terminal-green text-pure-white tracking-widest uppercase bg-terminal-green/10">
                        <tr>
                            <th className="px-6 py-4 font-black">ID</th>
                            <th className="px-6 py-4 font-black">Codename</th>
                            <th className="px-6 py-4 font-black">Status</th>
                            <th className="px-6 py-4 font-black">Threat Level</th>
                            <th className="px-6 py-4 font-black text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-terminal-green divide-y divide-terminal-green/30">
                        {currentData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center uppercase tracking-widest opacity-50 before:content-['>_']">
                                    No records found in current segment.
                                </td>
                            </tr>
                        ) : (
                            currentData.map((subject) => (
                                <tr key={subject.id} className="hover:bg-terminal-green/5 transition-colors group">
                                    <td className="px-6 py-4 font-bold border-r border-terminal-green/10">{subject.id}</td>
                                    <td className="px-6 py-4 text-pure-white">{subject.codename}</td>
                                    <td className="px-6 py-4 uppercase text-xs font-bold border-l border-terminal-green/10">
                                        {subject.status}
                                    </td>
                                    <td className="px-6 py-4 border-l border-terminal-green/10">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase inline-block
                      ${subject.threatLevel === 'Critical' ? 'bg-blood-red text-pure-white' : ''}
                      ${subject.threatLevel === 'High' ? 'bg-cyber-yellow text-deep-black' : ''}
                      ${subject.threatLevel === 'Low' ? 'bg-terminal-green text-deep-black' : ''}
                    `}>
                                            {subject.threatLevel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right border-l border-terminal-green/10">
                                        <button
                                            onClick={() => onViewSubject(subject)}
                                            className="inline-flex items-center gap-2 border border-terminal-green px-4 py-2 hover:bg-terminal-green hover:text-deep-black transition-colors uppercase font-bold text-xs group-hover:animate-pulse"
                                        >
                                            {subject.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-2 p-2 border border-terminal-green/30 bg-deep-black">
                    <p className="text-xs uppercase text-terminal-green/60 tracking-widest pl-2">
                        Page 0{currentPage} / 0{totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-terminal-green disabled:opacity-30 hover:bg-terminal-green hover:text-deep-black transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-terminal-green disabled:opacity-30 hover:bg-terminal-green hover:text-deep-black transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
