import React from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import NavBar from '@/components/custom/NavBar';
import { FaRobot, FaNetworkWired, FaLaptopCode, FaPalette } from 'react-icons/fa';

const Page: NextPage = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <NavBar />
      <main className="flex-1 pt-24 px-4 max-w-4xl mx-auto w-full">
        <MeSection />
        <InterestSection />
        <CredSection />
      </main>
      <footer className="bg-muted/10 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Jean Luc Gaffud. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

function MeSection() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-b from-background via-background to-muted/50 rounded-xl shadow-md p-8 mb-12">
      <div className="flex-shrink-0">
        <Image
          src="/JL.jpg"
          width={180}
          height={180}
          alt="Jean Luc Gaffud profile picture"
          className="rounded-full border-4 border-muted shadow-lg"
          priority
        />
      </div>
      <aside className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">Jean Luc Gaffud</h1>
        <h2 className="text-lg text-muted-foreground mb-4">Aspiring Full-Stack Developer</h2>
        <p className="max-w-xl text-base">
          Hi! I&apos;m currently studying Computer Science, majoring in Software Technology. I love building modern web applications and exploring new technologies.
        </p>
      </aside>
    </section>
  );
}

function InterestSection() {
  const interests = [
    { label: 'Machine Learning', icon: <FaRobot className="text-3xl mb-2" /> },
    { label: 'Distributed Systems', icon: <FaNetworkWired className="text-3xl mb-2" /> },
    { label: 'Software Engineering', icon: <FaLaptopCode className="text-3xl mb-2" /> },
    { label: 'UI/UX Design', icon: <FaPalette className="text-3xl mb-2" /> },
  ];
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Interests</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {interests.map((interest) => (
          <div
            key={interest.label}
            className="flex flex-col items-center bg-muted/30 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {interest.icon}
            <span className="font-medium text-base text-center">{interest.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CredSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <div className="flex items-center gap-4 bg-muted/30 rounded-lg p-4 shadow-sm">
        <Image
          src="/De_La_Salle_University_Seal.svg"
          width={48}
          height={48}
          alt="De La Salle University Logo"
          className="rounded"
        />
        <div>
          <h3 className="font-bold">De La Salle University</h3>
          <p className="text-muted-foreground text-sm">B.S. Computer Science, Major in Software Technology</p>
        </div>
      </div>
    </section>
  );
}

export default Page;
