"use client";

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
import {useEffect, useState, type SyntheticEvent, FunctionComponent} from "react";
import { CheckCircle, Error } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

const LUCENE_FLAGS = [
  "COMPLEMENT",
  "EMPTY",
  "INTERVAL",
  "INTERSECTION",
  "ANYSTRING",
];

const Tester:FunctionComponent = () => {
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

    const parsedSampleString = lowercase
      ? sampleString.toLowerCase()
      : sampleString;

    const timeout = setTimeout(() => {
      if (!window.testRegex) {
        setPassing(false);
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
    const sampleStringParam = searchParams.get("sampleString");
    if (sampleStringParam) {
      setSampleString(sampleStringParam);
    }
  }, [searchParams]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Your input</Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <TextField
                data-testid="regex-input"
                variant="outlined"
                fullWidth
                label="/Your regular expression/"
                placeholder="/ab./"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                data-testid="sample-string-input"
                variant="outlined"
                fullWidth
                label="Your test string"
                placeholder="abc"
                value={sampleString}
                multiline
                rows={10}
                onChange={(e) => setSampleString(e.target.value)}
              />
            </Box>
            <Box sx={{ minHeight: 24 }}>
              {regex && sampleString && (
                <>
                  {passing ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#00d406",
                        "& svg": { mr: "10px" },
                      }}
                    >
                      <CheckCircle /> Match found
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#ff9f9f",
                        "& svg": { mr: "10px" },
                      }}
                    >
                      <Error /> No match found
                    </Box>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mb: 2 }}>
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
            <Box sx={{ mt: 1, mr: 2, mb: 2 }}>
              <Autocomplete
                id="autocomplete"
                fullWidth
                sx={{ width: "100%" }}
                value={flags}
                options={LUCENE_FLAGS}
                onChange={(
                  _event: SyntheticEvent,
                  newFlags: string[]
                ) => {
                  setFlags(newFlags);
                }}
                multiple
                // https://stackoverflow.com/questions/75818761/material-ui-autocomplete-warning-a-props-object-containing-a-key-prop-is-be
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Lucene Flags" />
                )}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;

                  return (
                    <li {...optionProps} key={key}>
                      {option}
                    </li>
                  );
                }}
                renderValue={(value, getItemProps) =>
                    value.map((option, index) => {
                      const itemProps = getItemProps({ index });
                      const { key, ...chipProps } = itemProps;

                      return (
                          <Chip
                              {...chipProps}
                              key={key ?? option}
                              label={option}
                          />
                      );
                    })
                }
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Tester;
