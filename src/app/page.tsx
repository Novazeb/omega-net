"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import AccessDenied from "@/components/AccessDenied";
import DossierModal, { type Subject } from "@/components/DossierModal";

// 15 Dummy Subjects
const INITIAL_DATA: Subject[] = [
  { id: "SUB-001", codename: "Neon Phantom", status: "Active", threatLevel: "High", locked: true, details: "Known for infiltrating secure corporate subnets. Last seen in Sector 4." },
  { id: "SUB-002", codename: "Chrome Basilisk", status: "Terminated", threatLevel: "Critical", locked: false, details: "Cyborg operative. Neutralized during the 2074 Uprising." },
  { id: "SUB-003", codename: "Null Sec", status: "MIA", threatLevel: "Low", locked: true, details: "Rogue AI fragment. Unpredictable but limited hardware access." },
  { id: "SUB-004", codename: "Crimson Viper", status: "Active", threatLevel: "Critical", locked: true, details: "Assassin specializing in nano-toxins. Extremely dangerous." },
  { id: "SUB-005", codename: "Byte Runner", status: "Active", threatLevel: "Low", locked: false, details: "Data smuggler. Operates mainly in the lower levels." },
  { id: "SUB-006", codename: "Ghost Shell", status: "Terminated", threatLevel: "High", locked: true, details: "Former security chief turned rogue. Records expunged." },
  { id: "SUB-007", codename: "Echo Cipher", status: "MIA", threatLevel: "High", locked: true, details: "Encrypted transmission source. Location unknown." },
  { id: "SUB-008", codename: "Glitch Tech", status: "Active", threatLevel: "Low", locked: false, details: "Hardware modification specialist." },
  { id: "SUB-009", codename: "Void Walker", status: "MIA", threatLevel: "Critical", locked: true, details: "Experimental quantum physical anomaly." },
  { id: "SUB-010", codename: "Iron Lotus", status: "Active", threatLevel: "High", locked: false, details: "Mercenary leader. Heavy cybernetic augmentation." },
  { id: "SUB-011", codename: "Data Geist", status: "Terminated", threatLevel: "Low", locked: true, details: "Sentient malware strain. Quarantined." },
  { id: "SUB-012", codename: "Silver Bullet", status: "Active", threatLevel: "High", locked: false, details: "Corporate fixer. Dual loyalties suspected." },
  { id: "SUB-013", codename: "Shadow Broker", status: "MIA", threatLevel: "Critical", locked: true, details: "Information network controller. Deep web presence only." },
  { id: "SUB-014", codename: "Razor Wire", status: "Active", threatLevel: "High", locked: true, details: "Urban combat specialist." },
  { id: "SUB-015", codename: "Pixel Dust", status: "Terminated", threatLevel: "Low", locked: false, details: "Low-level hacker. Caught in the Megacorp dragnet." },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  // Filter logic
  const filteredData = useMemo(() => {
    return INITIAL_DATA.filter(subject =>
      subject.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handle View click
  const handleViewSubject = (subject: Subject) => {
    if (subject.locked) {
      setShowAccessDenied(true);
    } else {
      setSelectedSubject(subject);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-12 lg:p-24 transition-transform ${showAccessDenied ? 'shake-effect' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <Header searchQuery={searchQuery} setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }} />

        <DataTable
          data={filteredData}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onViewSubject={handleViewSubject}
        />

        {showAccessDenied && (
          <AccessDenied onClose={() => setShowAccessDenied(false)} />
        )}

        {selectedSubject && !showAccessDenied && (
          <DossierModal
            subject={selectedSubject}
            onClose={() => setSelectedSubject(null)}
          />
        )}
      </div>

      {/* Decorative corners */}
      <div className="fixed top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-terminal-green pointer-events-none opacity-50 z-[-1]"></div>
      <div className="fixed top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-terminal-green pointer-events-none opacity-50 z-[-1]"></div>
      <div className="fixed bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-terminal-green pointer-events-none opacity-50 z-[-1]"></div>
      <div className="fixed bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-terminal-green pointer-events-none opacity-50 z-[-1]"></div>
    </main>
  );
}
