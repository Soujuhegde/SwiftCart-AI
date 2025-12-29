import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900">AI-Frontend Starter</h1>
        <Dashboard />
      </div>
    </main>
  );
}
