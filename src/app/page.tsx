"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import { Code } from "@/components/Code";
import Tester from "@/components/Tester";
import { FunctionComponent, Suspense } from "react";

const RootPage: FunctionComponent = () => (
  <>
    <Box component="header" sx={{ padding: "15px 30px 30px 30px" }}>
      <Typography
        component="h1"
        sx={{ mt: 0, mb: "5px", pb: 0, fontSize: "25px" }}
      >
        LUCkyRegex
      </Typography>
      <Typography
        component="h2"
        sx={{ fontSize: "13px", fontWeight: "normal", m: 0, p: 0 }}
      >
        Lucene regular expression tester
      </Typography>
    </Box>

    <Box component="main" sx={{ p: "0 30px 30px 30px" }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <Suspense fallback={<Box>Loading...</Box>}>
            <Tester />
          </Suspense>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            What is LUCkyRegex?
          </Typography>
          <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
            This tool allows you to test your Lucene regular expressions using
            Lucene&apos;s engine. While there are similarities, Lucene does{" "}
            <strong>not</strong> use the Perl Compatible Regular Expressions
            (PCRE) library. You may find this tool helpful when testing regular
            expressions used within Elasticsearch or Kibana, as they utilize
            Lucene&apos;s regular expression engine.
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
              Start and end-of line operators (<Code>$</Code> and <Code>^</Code>
              ) are not supported.
            </li>
            <li>
              Certain character classes are not supported. Examples are{" "}
              <Code>\d</Code>, <Code>\w</Code>, <Code>\s</Code> for digit, word
              character, and whitespace, respectively.
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
    </Box>
  </>
);

export default RootPage;
