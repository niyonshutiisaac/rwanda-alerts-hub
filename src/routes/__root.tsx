import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Page not found.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Back to Dashboard</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Quick Pollination™ — Rwanda Early Warning System" },
      { name: "description", content: "Real-time flood and landslide early warning dashboard for Rwanda. GLOC 2026 concept." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="md:hidden font-semibold">Quick Pollination™</div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-2 rounded-full bg-[var(--risk-low)] pulse-dot" />
                Live telemetry · Rwanda Space Agency Geo-Hub (concept)
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-[var(--rwanda-blue)]" /> Blue
                <span className="size-1.5 rounded-full bg-[var(--rwanda-yellow)] ml-2" /> Yellow
                <span className="size-1.5 rounded-full bg-[var(--rwanda-green)] ml-2" /> Green
              </div>
              <div className="rounded-md bg-primary/15 text-primary border border-primary/30 px-2.5 py-1.5">v0.9 · concept</div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 min-w-0">
            <Outlet />
          </main>
          <footer className="border-t border-border px-4 md:px-6 py-3 text-xs text-muted-foreground text-center">
            Data simulated for GLOC 2026 | Powered by Rwanda Space Agency Geo-Hub (concept) | Quick Pollination™ system.
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}
