
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { FaUser, FaHome, FaFolderOpen } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto h-full flex items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="hover:scale-105 transition-transform">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </Button>

        <Button asChild variant="ghost" className="hover:scale-105 transition-transform">
          <Link href="/about" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <FaUser />
            <span className="hidden sm:inline">About</span>
          </Link>
        </Button>

        <Button asChild variant="ghost" className="hover:scale-105 transition-transform">
          <Link href="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <FaFolderOpen />
            <span className="hidden sm:inline">Projects</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}
