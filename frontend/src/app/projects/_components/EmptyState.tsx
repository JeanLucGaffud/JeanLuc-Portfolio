import { FaSearch } from 'react-icons/fa';

export function EmptyState() {
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