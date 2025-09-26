import { getPaginatedProjects } from '@/lib/db';
import NavBar from '@/components/custom/NavBar';
import { SearchForm, ProjectsPagination, ProjectCard, EmptyState } from './_components';
import type { Project } from '@/db/schema';

interface ProjectsListProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

interface PaginationData {
  projects: Project[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default async function ProjectsListPage(props: ProjectsListProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  
  const paginationData: PaginationData = await getPaginatedProjects({ 
    page: currentPage, 
    limit: 6, 
    query 
  });
  
  const activeProjects = paginationData.projects;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(new Date(date));
  };

  return (
    <div className='min-h-screen w-full bg-background'>
      <NavBar />

      <main className="pt-30 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">My Projects</h1>
            <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
              Explore my portfolio of projects showcasing various technologies and skills.
            </p>
            <SearchForm initialQuery={query} />
            
            {query && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {paginationData.totalCount > 0 
                    ? `Found ${paginationData.totalCount} project${paginationData.totalCount === 1 ? '' : 's'} matching "${query}"`
                    : `No projects found matching "${query}"`
                  }
                </p>
              </div>
            )}
          </div>
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
        
        <div className="mt-8 flex justify-center">
          <ProjectsPagination 
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            hasNextPage={paginationData.hasNextPage}
            hasPreviousPage={paginationData.hasPreviousPage}
            query={query}
          />
        </div>
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

