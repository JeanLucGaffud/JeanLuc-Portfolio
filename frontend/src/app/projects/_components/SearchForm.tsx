'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

interface SearchFormProps {
  initialQuery: string;
}

export function SearchForm({ initialQuery }: SearchFormProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <form method="GET" className="flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            name="query"
            placeholder="Search projects..."
            defaultValue={initialQuery}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="outline">
          Search
        </Button>
        {initialQuery && (
          <Button asChild variant="ghost">
            <Link href="/projects">Clear</Link>
          </Button>
        )}
      </form>
    </div>
  );
}