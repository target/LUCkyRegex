"use client";
import * as React from "react";
import { Grid, LinearProgress, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Script from "next/script";
import Tester from "../components/tester";

export default function LuckyRegex() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.luckyRegexReady) {
      setReady(true);
    }
    const luckyRegexReadyListener = () => {
      setReady(true);
    };
    document.addEventListener("luckyRegexReady", luckyRegexReadyListener);
    return () => {
      document.removeEventListener("luckyRegexReady", luckyRegexReadyListener);
    };
  }, []);

  return (
    <>
      {/* <Script /> pulls in the .net WASM service.
      This prevents the built .net WASM assets from going through another build process,
      which unfortunately causes issues. */}
      <Script type="module" src="./main.js" strategy="lazyOnload" />
      <Header>
        <Logo>LUCkyRegex</Logo>
        <LogoSubtext>Lucene regular expression tester</LogoSubtext>
      </Header>
      <Contents>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            {ready ? <Tester /> : <LinearProgress />}
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              What is LUCkyRegex?
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
              This tool allows you to test your Lucene regular expressions using
              Lucene&apos;s engine. While there are similarities, Lucene does{" "}
              <strong>not</strong> use the Perl Compatible Regular Expressions
              (PCRE) library. You may find this tool helpful when testing
              regular expressions used within Elasticsearch or Kibana, as they
              utilize Lucene&apos;s regular expression engine.
              <br />
              <br />A useful regular expression reference is available{" "}
              <Link href="https://www.elastic.co/guide/en/elasticsearch/reference/current/regexp-syntax.html">
                here
              </Link>
              .
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
              How are Lucene regular expressions different?
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
              There are numerous differences, but the biggest are:
            </Typography>
            <ul>
              <li>
                Your regular expression must cover the <strong>entire</strong>{" "}
                text.
              </li>
              <li>
                Start and end-of line operators (<Code>$</Code> and{" "}
                <Code>^</Code>) are not supported.
              </li>
              <li>
                Certain character classes are not supported. Examples are{" "}
                <Code>\d</Code>, <Code>\w</Code>, <Code>\s</Code> for digit,
                word character, and whitespace, respectively.
              </li>
              <li>
                Lucene regex does not support flags such as <Code>/g</Code>,{" "}
                <Code>/i</Code>, etc.
              </li>
            </ul>
            <Typography variant="h6" component="h3" gutterBottom>
              How does it work?
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
              LUCkyRegex is built with .NET, WASM, and{" "}
              <Link href="https://lucenenet.apache.org/">Lucene.net</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Contents>
    </>
  );
}

const Header = styled.div`
  padding: 15px 30px 30px 30px;
`;

const Logo = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
  padding-bottom: 0;
  font-size: 25px;
`;

const LogoSubtext = styled.h2`
  font-size: 13px;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Contents = styled.main`
  padding: 0 30px 30px 30px;
`;

const Code = styled.span`
  font-family: Monospace;
  background: #222;
  padding: 5px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
`;
