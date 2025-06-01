import { Suspense } from 'react';
import { Shell } from '@/components/layout/shell';
import { Timeline, TimelineSkeleton } from '@/components/timeline/timeline';
import { ErrorBoundary } from '@/components/error-boundary';

export default function HomePage() {
  return (
    <Shell>
      <ErrorBoundary>
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline />
        </Suspense>
      </ErrorBoundary>
    </Shell>
  );
}
