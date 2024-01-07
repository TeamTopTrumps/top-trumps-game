import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

function MockQueryProvider({ children }: PropsWithChildren) {
  const mockClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={mockClient}>{children}</QueryClientProvider>
  );
}

export { MockQueryProvider };
