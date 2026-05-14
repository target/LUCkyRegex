"use client";

import { FunctionComponent } from "react";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalErrorPage: FunctionComponent<GlobalErrorPageProps> = ({
  reset,
}) => (
  <html lang="en">
    <body>
      <h2>Something went wrong.</h2>
      <button onClick={() => reset()}>Try again</button>
    </body>
  </html>
);

export default GlobalErrorPage;
