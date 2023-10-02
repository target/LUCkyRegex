import { Metadata } from "next";
import PageContainer from "@/components/page-container";

export const metadata: Metadata = {
  title: "LUCkyRegex - Lucene regular expression tester",
  description:
    "Use this regular expression tester to test your Lucene regular expressions.",
  icons: ["./favicon.ico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PageContainer>{children}</PageContainer>
      </body>
    </html>
  );
}
