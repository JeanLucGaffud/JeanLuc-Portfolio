import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import  NavBar  from "@/components/custom/NavBar"
import { cn } from "@/lib/utils"
import { FaReact, FaNodeJs, FaPython, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { getFeaturedProjects } from '@/db/db';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  status: string;
}

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <NavBar />
      <main className="pt-20">
        <HeroSection />
        <Suspense fallback={<ArticleSectionSkeleton />}>
          <ArticleSection />
        </Suspense>
      </main>
      <footer className="bg-muted/10 py-8 px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Jean Luc Gaffud. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-background via-background to-muted/50 overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-muted rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent rounded-full animate-bounce" style={{ animationDelay: "2s", animationDuration: "5s" }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
      

        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Jean Luc Gaffud
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground font-medium mb-6">
            <span className="inline-block animate-pulse">Computer Science Student & Aspiring Developer</span>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          Hi, I&apos;m Jean Luc! I&apos;m a Computer Science major from De La Salle University, 
          passionate about building modern web applications and exploring new technologies.
        </p>

        
        <div className="flex justify-center items-center gap-6 mb-8">
          <TechIcon icon={<FaReact />} name="React" delay="0s" />
          <TechIcon icon={<SiNextdotjs />} name="Next.js" delay="0.2s" />
          <TechIcon icon={<SiTypescript />} name="TypeScript" delay="0.4s" />
          <TechIcon icon={<SiTailwindcss />} name="Tailwind" delay="0.6s" />
          <TechIcon icon={<FaNodeJs />} name="Node.js" delay="0.8s" />
          <TechIcon icon={<FaPython />} name="Python" delay="1s" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all hover:scale-105">
            <Link href="/about">About Me</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="transition-all hover:scale-105">
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>

        
        <div className="flex justify-center gap-4">
          <SocialLink href="https://github.com/JeanLucGaffud" icon={<FaGithub />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/jean-luc-gaffud-a52b1130a/" icon={<FaLinkedin />} label="LinkedIn" />
        </div>
      </div>
    </section>
  );
}

export async function ArticleSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/50 via-background to-background ">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work in web development and software engineering, 
            demonstrating my skills and passion for creating meaningful solutions.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              title={project.title}
              description={project.description}
              tech={project.technologies}
              link={`/projects/${project.slug}`}
              github={project.githubUrl || undefined}
              status={project.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ title, description, tech, link, github, status }: ProjectCardProps) {
  return (
    <Card className="group h-full flex flex-col hover:scale-105 transition-all duration-300 border border-border bg-card relative">
      <CardHeader className="flex-1">
        <CardTitle className="text-xl w-3/4 font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
          <StatusBadge status={status} />
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((technology, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
            >
              {technology}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 gap-2">
        <Button asChild size="sm" className="flex-1 hover:scale-105">
          <Link href={link}>View Project</Link>
        </Button>
        {github && github !== "#" && (
          <Button asChild variant="outline" size="sm" className="flex-1 hover:scale-105">
            <Link href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isComplete = status.toLowerCase() === 'complete';
  const isInProgress = status.toLowerCase() === 'in progress';
  
  return (
    <div className={cn(
      "w-fit rounded-full px-3 py-1 absolute top-4 right-4 text-xs font-medium z-10",
      {
        "bg-primary/20 text-primary": isComplete,
        "bg-secondary text-secondary-foreground": isInProgress,
        "bg-muted text-muted-foreground": !isComplete && !isInProgress
      }
    )}>
      {status}
    </div>
  );
}

// Tech Icon Component
function TechIcon({ icon, name, delay }: { icon: ReactNode; name: string; delay: string }) {
  return (
    <div 
      className="group relative"
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 bg-muted/50 hover:bg-muted rounded-lg flex items-center justify-center text-2xl text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 animate-bounce">
        {icon}
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {name}
      </div>
    </div>
  );
}

// Social Link Component
function SocialLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-muted/50 hover:bg-muted rounded-lg flex items-center justify-center text-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

// Loading skeleton for ArticleSection
function ArticleSectionSkeleton() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/50 via-background to-background">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({ length: 3 }).map((_, techIndex) => (
                    <Skeleton key={techIndex} className="h-6 w-16" />
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

