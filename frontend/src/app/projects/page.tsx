import { getProjects } from '@/lib/db';
import { Project } from '@/db/schema';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from '@/components/custom/NavBar';
import Link from 'next/link';
import Image from 'next/image';
import { StatusBadge } from '@/app/page';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaSearch } from 'react-icons/fa';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}


export default async function ProjectsListPage() {
  const projectsList: Project[] = await getProjects();
  
  // Filter out soft-deleted projects
  const activeProjects = projectsList.filter(project => !project.deletedAt);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(new Date(date));
  };

  return (
    <div className='min-h-screen w-full bg-background'>
      <NavBar />
    
      
      <div className="pt-28 pb-6 px-4 sm:px-4 lg:px-8 bg-red-500">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            A collection of applications, tools, and experiments showcasing my development journey
          </p>
          <div className="text-sm text-muted-foreground">
            {activeProjects.length} project{activeProjects.length !== 1 ? 's' : ''} available
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} formatDate={formatDate} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
        <PaginationDemo></PaginationDemo>
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Jean-Luc Gaffud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  formatDate: (date: Date) => string;
}

function ProjectCard({ project, formatDate }: ProjectCardProps) {
  const hasImage = project.imageUrl && project.imageUrl.trim() !== '';
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">

      {hasImage ? (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.imageUrl!}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <StatusBadge status={project.status} />
        </div>
      ) : (
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <FaCode className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>
          <StatusBadge status={project.status} />
        </div>
      )}

      <CardHeader className="pb-3 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
            {project.title}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-3 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs px-2 py-1">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>


        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span>{formatDate(project.startDate)}</span>
          </div>
          {!hasImage && (
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4 flex flex-col gap-3">

        <div className="flex gap-2 w-full">
          <Button asChild size="sm" className="flex-1 hover:scale-105 duration-300">
            <Link href={`/projects/${project.slug}`}>
              View Details 
            </Link>
          </Button>
          
          <div className="flex gap-1">
            {project.demoUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="w-3 h-3" />
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-3 h-3" />
                </Link>
              </Button>
            )}
          </div>
        </div>


        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 w-full">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
        <FaSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Projects will appear here once they are added to the portfolio. Check back soon for exciting new developments!
      </p>
    </div>
  );
}