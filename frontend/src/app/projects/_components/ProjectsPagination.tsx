import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectsPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  query?: string;
}

export function ProjectsPagination({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPreviousPage, 
  query 
}: ProjectsPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page !== 1) params.set('page', page.toString());
    if (query) params.set('query', query);
    return params.toString() ? `/projects?${params.toString()}` : '/projects';
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrentPage = page === currentPage;
          const shouldShow = 
            page === 1 || 
            page === totalPages || 
            (page >= currentPage - 1 && page <= currentPage + 1);

          if (!shouldShow) {
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink href={createPageUrl(page)} isActive={isCurrentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}