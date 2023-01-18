import Head from "next/head";
import React, { useRef, useState } from "react";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { TextFieldTd } from "../components/atoms/TextFieldTd";
import packageJson from "../package.json";

export default function Home() {
  const [state, setState] = useState({
    inputVal: "",
    resultVal: "",
  });

  // 管理 ローカル消去のみ
  const defaultChecked = false;
  const isOnlyLocal = useRef(defaultChecked);

  const createCommand = (val: string): string => {
    const lines = val.split("\n");
    const commands = lines.map((version) => {
      let command = `git tag -d ${version};`;
      if (!isOnlyLocal.current) command += ` git push origin :${version};`;
      return command;
    });
    return commands.join(" ");
  };

  return (
    <>
      <Head>
        <title>TD command generator</title>
      </Head>
      <Box textAlign="center">
        <Box mb="200px" />
        <Typography variant="h5">TD command generator</Typography>
        <Typography variant="subtitle1">{packageJson.version}</Typography>
        <Box mb="30px" />
        <Typography variant="caption">
          gitでタグを一気に消したいときに。
          <br />
          gitのtagを消去するコマンドを生成します。
        </Typography>
        <Box mb="30px" />
        <Box component="label">
          <Checkbox
            { ...{ defaultChecked } }
            onChange={(e) => {
              isOnlyLocal.current = e.currentTarget.checked;
            }}
          />
          ローカル消去のみ
        </Box>
        <Box mb="30px" />
        <Box display="flex" justifyContent="center">
          <Box>
            <TextFieldTd
              placeholder={
                <>
                  v0.0.1
                  <br />
                  v0.0.2
                </>
              }
              onChange={(value) => {
                setState({ ...state, inputVal: value });
              }}
            />
            <Box mb="30px" />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const isEmpty = !state.inputVal || !state.inputVal.match(/\S/g);
                if (isEmpty) return;
                const resultVal = createCommand(state.inputVal);
                setState({ ...state, resultVal });
              }}
            >
              Export
            </Button>
          </Box>
          <Box width="30px" />
          <Box>
            <TextFieldTd defaultValue={state.resultVal} />
            <Box mb="30px" />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (!navigator.clipboard) return;
                navigator.clipboard.writeText(state.resultVal);
              }}
            >
              結果をコピー
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
