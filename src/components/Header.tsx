import { ShieldAlert } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
    return (
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-2 border-terminal-green pb-6 mb-8 gap-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-blood-red font-bold text-sm tracking-[0.2em] uppercase">Sector 7G Node</h2>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase glitch-effect cursor-pointer">
                    Omega-Net
                </h1>
                <p className="text-terminal-green text-xs tracking-widest uppercase mt-2 opacity-80">
                    Corporate Threat Database // v2.4.9
                </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto relative group">
                <label htmlFor="search" className="text-xs text-pure-white font-bold tracking-widest uppercase flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-cyber-yellow" />
                    Target Designation
                </label>
                <div className="relative">
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ENTER CODENAME OR ID..."
                        className="w-full md:w-80 bg-deep-black text-cyber-yellow border-2 border-terminal-green px-4 py-3 text-sm focus:outline-none focus:border-pure-white focus:bg-dark-charcoal placeholder:text-terminal-green/40 transition-colors uppercase custom-cursor"
                        aria-label="Search Subjects"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
                        }}
                    />
                    <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-terminal-green/50"></div>
                </div>
            </div>
        </header>
    );
}
