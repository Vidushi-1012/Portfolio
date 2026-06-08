import { motion } from 'motion/react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
}

interface CertificationSectionProps {
  title: string;
  certificates: Certificate[];
}

export default function CertificationDashboard() {
  const programmingCerts: Certificate[] = [
    { title: 'GfG 160 Days of Problem Solving', issuer: 'GeeksforGeeks', date: '2025' },
    { title: 'Problem-Solving Basics', issuer: 'HackerRank', date: 'May 2025' },
    { title: 'Python Basics', issuer: 'HackerRank', date: 'Sep 2025' },
    { title: 'Basics of C++', issuer: 'Coding Ninjas', date: 'Mar 2026' },
  ];

  const webDevCerts: Certificate[] = [
    { title: 'Full Stack Development', issuer: 'Udemy', date: 'Nov 2025' },
  ];

  const aiCloudCerts: Certificate[] = [
    { title: 'Introduction to Generative AI', issuer: 'Google Cloud / Simplilearn', date: 'Sep 2025' },
    { title: 'Prompt Engineering for Everyone', issuer: 'IBM / Cognitive Class', date: 'Feb 2026' },
  ];

  const industryCerts: Certificate[] = [
    { title: 'AWS Solutions Architecture Job Simulation', issuer: 'Forage', date: 'Sep 2025' },
    { title: 'Deloitte Technology Job Simulation', issuer: 'Forage', date: 'Jul 2025' },
    { title: 'Goldman Sachs Risk Job Simulation', issuer: 'Forage', date: 'Apr 2026' },
  ];

  return (
    <div className="min-h-screen bg-[#11111b]/50 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center gap-3 text-[#7c6aff] text-sm font-bold uppercase tracking-wider mb-3 justify-center">
            <div className="w-8 h-0.5 bg-[#7c6aff]" />
            Credentials
            <div className="w-8 h-0.5 bg-[#7c6aff]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            Certifications & Professional Development
          </h1>
          <p className="text-lg text-slate-400 font-light">
            Technical Skills, Industry Experience, and Continuous Learning
          </p>
        </div>

        {/* Grid Layout: three equal-width domain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DomainCard title="Software Engineering">
            <DomainItem label="Full Stack Development" />
            <DomainItem label="GfG 160 Days of Problem Solving" />
            <DomainItem label="Python Basics" />
            <DomainItem label="Basics of C++" />
          </DomainCard>

          <DomainCard title="Cloud & Architecture">
            <DomainItem label="AWS Solutions Architecture Job Simulation" />
            <DomainItem label="Deloitte Technology Job Simulation" />
          </DomainCard>

          <DomainCard title="Artificial Intelligence">
            <DomainItem label="Introduction to Generative AI" />
          </DomainCard>
        </div>
      </div>
    </div>
  );
}
function DomainCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all shadow-sm hover:shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DomainItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-base text-white font-medium">{label}</p>
      </div>
    </div>
  );
}
