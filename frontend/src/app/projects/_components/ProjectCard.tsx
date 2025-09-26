import { Project } from '@/db/schema';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';
import { StatusBadge } from '@/app/page';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode } from 'react-icons/fa';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  formatDate: (date: Date) => string;
}

export function ProjectCard({ project, formatDate }: ProjectCardProps) {
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

      <CardHeader className=" flex-grow">
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

        <div className="flex flex-wrap gap-1 h-10">
          {project.technologies.slice(0, 4).map((tech: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1 h-6">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs px-2 py-1 h-6">
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

      <CardFooter className="pt-4 grid grid-rows-2 gap-3">

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
          <div className="flex flex-wrap gap-1 w-full h-10">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs h-6">
                #{tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs h-6">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}