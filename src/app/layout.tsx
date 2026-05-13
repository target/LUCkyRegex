import {Metadata} from "next";
import {PageContainer} from "../components/PageContainer";
import {FunctionComponent, PropsWithChildren} from "react";
import Script from "next/script";

export const metadata: Metadata = {
    title: "LUCkyRegex - Lucene regular expression tester",
    description:
        "Use this regular expression tester to test your Lucene regular expressions.",
    icons: ["./favicon.ico"],
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <html>
            <body>
                <PageContainer>{children}</PageContainer>
                <Script type="module" src="/main.js" strategy="afterInteractive" />
            </body>
        </html>
    )
}

export default RootLayout