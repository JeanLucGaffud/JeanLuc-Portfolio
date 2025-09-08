
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUser, FaHome, FaFolderOpen } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed h-20 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="w-full h-full flex items-center gap-2 px-16">
        <Button asChild variant="ghost" className="bg-background hover:scale-105">
          <span className="flex items-center gap-2">
            <FaHome className="text-muted-foreground" />
            <Link href="/" className="text-muted-foreground text-md">Home</Link>
          </span>
        </Button>

        <Button asChild variant="ghost" className="bg-background hover:scale-105">
          <span className="flex items-center gap-2">
            <FaUser className="text-muted-foreground" />
            <Link href="/about" className="text-muted-foreground text-md">About Me</Link>
          </span>
        </Button>

        <Button asChild variant="ghost" className="bg-background hover:scale-105">
          <span className="flex items-center gap-2">
            <FaFolderOpen className="text-muted-foreground" />
            <Link href="/projects" className="text-muted-foreground text-md">Projects</Link>
          </span>
        </Button>
      </div>
    </nav>
  );
}
