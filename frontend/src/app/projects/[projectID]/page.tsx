import { AppSidebar } from "@/components/custom/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ExternalLink,  ArrowLeft, Clock, Tag } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { getProjectBySlug } from '@/db/db';
import { projectsTable } from '@/db/schema'
import { createSelectSchema } from 'drizzle-zod';
import { getCommentsForProject } from '@/server/comments';

const projectSelectSchema = createSelectSchema(projectsTable)

interface ProjectPageProps {
  params: Promise<{
    projectID: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { projectID } = await params;
    
    if (!projectID || typeof projectID !== 'string' || projectID.trim().length === 0) {
      notFound();
    }
    
    const rawProject = await getProjectBySlug(projectID);
    
    if (!rawProject) {
      notFound();
    }
  
    const result = projectSelectSchema.safeParse(rawProject);
  
    if (!result.success) {
      console.error('Project validation failed:', result.error);
      notFound();
    }
  
    const project = result.data;
  
    // Fetch comments for this project
    const comments = await getCommentsForProject(projectID);
  
    // Format dates
    const formatDate = (date: Date | null) => {
      if (!date) return null;
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));
    };
  
    const startDate = formatDate(project.startDate);
    const endDate = formatDate(project.endDate);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "600px",
        } as React.CSSProperties
      }
      
    >
      
      <SidebarInset >
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b pl-10 p-4 py-3 justify-between ">
          
        
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="">
                <Link href="/projects" >
                  
                  <Button variant="outline" className="hover:scale-105">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <p className="hidden md:block">Back to Projects</p>
                  </Button>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 " />
        </header>

      <div className="container mx-auto px-4 py-6">

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            {project.imageUrl && (
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">{project.category}</Badge>
              <Badge variant={project.status === 'Complete' ? 'default' : 'outline'}>
                {project.status}
              </Badge>
              {project.featured && (
                <Badge variant="destructive">Featured</Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.demoUrl && (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                   <FaGithub className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </div>

          

          <div className="grid md:grid-cols-3 gap-8">
                      {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Timeline</p>
                      <p className="text-sm text-muted-foreground">
                        {startDate} {endDate ? `- ${endDate}` : '- Present'}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-muted-foreground">{project.status}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">{project.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {project.demoUrl && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="mr-2 h-4 w-4" />
                        Source Code
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              {project.longDescription && (
                <Card>
                  <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.longDescription}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Challenges */}
              {project.challenges && (
                <Card>
                  <CardHeader>
                    <CardTitle>Challenges & Solutions</CardTitle>
                    <CardDescription>
                      Key technical and design challenges encountered during development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.challenges}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Learnings */}
              {project.learnings && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Learnings</CardTitle>
                    <CardDescription>
                      Skills and knowledge gained from this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.learnings}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Screenshots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

  
          </div>
        </div>
      </div>
      </SidebarInset>
      <AppSidebar comments={comments} />
    </SidebarProvider>
  )
}
