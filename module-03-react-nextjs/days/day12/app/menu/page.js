import { Suspense } from 'react';
import DishList from './DishList';

export const revalidate = 3600;

function DishSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Our Menu</h1>

      {/* CodeOps Requirement 7: Suspense boundary */}
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </div>
  );
}
