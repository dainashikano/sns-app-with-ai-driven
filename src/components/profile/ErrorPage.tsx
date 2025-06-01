'use client';

interface ErrorPageProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorPage({ title, message, onRetry }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h1 className="text-2xl font-bold text-red-600">{title}</h1>
      <p className="text-muted-foreground text-center">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          再読み込み
        </button>
      )}
    </div>
  );
} 