"use client";
import * as React from "react";
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CheckCircle, Error } from "@mui/icons-material";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

const LUCENE_FLAGS = [
  "COMPLEMENT",
  "EMPTY",
  "INTERVAL",
  "INTERSECTION",
  "ANYSTRING",
];

export default function Tester() {
  const [regex, setRegex] = useState("");
  const [sampleString, setSampleString] = useState("");
  const [passing, setPassing] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [flags, setFlags] = useState(LUCENE_FLAGS);

  useEffect(() => {
    let parsedRegex = lowercase ? regex.toLowerCase() : regex;
    if (parsedRegex[0] === "/" && parsedRegex[parsedRegex.length - 1] === "/") {
      parsedRegex = parsedRegex.substring(1, parsedRegex.length - 1);
    }

    let parsedSampleString = lowercase
      ? sampleString.toLowerCase()
      : sampleString;

    const timeout = setTimeout(async () => {
      if (!window.testRegex) {
        return;
      }
      try {
        const res = window.testRegex(
          parsedRegex,
          parsedSampleString,
          flags.length ? flags.join(",") : "NONE"
        );
        setPassing(res);
      } catch (_err) {
        setPassing(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [regex, sampleString, lowercase, flags]);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams) {
      return;
    }
    const regexParam = searchParams.get("regex");
    if (regexParam) {
      setRegex(regexParam);
    }
    const sampleString = searchParams.get("sampleString");
    if (sampleString) {
      setSampleString(sampleString);
    }
  }, [searchParams, setSampleString]);

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography variant="h6">Your input</Typography>
            <Box mt={2} mb={2}>
              <TextField
                data-testid="regex-input"
                variant="outlined"
                fullWidth={true}
                label="/Your regular expression/"
                placeholder="/ab./"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                data-testid="sample-string-input"
                variant="outlined"
                fullWidth={true}
                label="Your test string"
                placeholder="abc"
                value={sampleString}
                multiline={true}
                rows={10}
                onChange={(e) => setSampleString(e.target.value)}
              />
            </Box>
            <MatchContainer>
              {regex && sampleString && (
                <>
                  {passing ? (
                    <MatchFound>
                      <CheckCircle /> Match found
                    </MatchFound>
                  ) : (
                    <MatchNotFound>
                      <Error /> No match found
                    </MatchNotFound>
                  )}
                </>
              )}
            </MatchContainer>
          </CardContent>
        </Card>
      </Box>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography variant="h6">Advanced Settings</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                />
              }
              label="Lowercase regex and text"
            />
            <Box mt={1} sx={{ m: 2, ml: 0 }}>
              <Autocomplete
                id="autocomplete"
                fullWidth={true}
                sx={{ width: "100%" }}
                value={flags}
                options={LUCENE_FLAGS}
                onChange={(
                  _event: React.SyntheticEvent,
                  newFlags: string[]
                ) => {
                  setFlags(newFlags);
                }}
                multiple
                // https://stackoverflow.com/questions/75818761/material-ui-autocomplete-warning-a-props-object-containing-a-key-prop-is-be
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth={true}
                    label="Lucene Flags"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                    />
                  ));
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

const MatchFound = styled.div`
  display: flex;
  align-items: center;
  color: #00d406;
  svg {
    margin-right: 10px;
  }
`;

const MatchNotFound = styled.div`
  display: flex;
  align-items: center;
  color: #ff9f9f;
  svg {
    margin-right: 10px;
  }
`;

const MatchContainer = styled.div`
  min-height: 24px;
`;
