import Head from "next/head";
import React, { useState } from 'react';
import { Box, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { TextFieldTd } from "../components/atoms/TextFieldTd";

export default function Home() {

  const [state, setState] = useState({
    inputVal: "",
    resultVal: ""
  });

  const createCommand = (val: string): string => {
    const lines = val.split("\n");
    const commands = lines.map(version => {
      return `git tag -d ${ version }; git push origin :${ version };`
    });
    return commands.join(" ");
  }

  return (
    <>
      <Head>
        <title>TD command generator</title>
      </Head>
      <Box textAlign="center">
        <Box mb="200px" />
        <Typography variant="h5">
          TD command generator
        </Typography>
        <Box mb="30px" />
        <Typography variant="caption">
          gitでタグを一気に消したいときに。<br />
          ローカルで消去したあとにリモートも消すコマンドを生成します。
        </Typography>
        <Box mb="30px" />
        <Box display="flex" justifyContent="center">
          <Box>
            <TextFieldTd
              placeholder={ <>v0.0.1<br />v0.0.2</> }
              onChange={ (value) => {
                setState({ ...state, inputVal: value });
              } }
            />
            <Box mb="30px" />
            <Button
              variant="contained"
              color="primary"
              onClick={ () => {
                const isEmpty = !state.inputVal || !state.inputVal.match(/\S/g);
                if (isEmpty) return;
                const resultVal = createCommand(state.inputVal);
                setState({ ...state, resultVal });
              } }
            >
              Export
            </Button>
          </Box>
          <Box width="30px" />
          <Box>
            <TextFieldTd
              defaultValue={ state.resultVal }
            />
            <Box mb="30px" />
            <Button
              variant="contained"
              color="secondary"
              onClick={ () => {
                if(!navigator.clipboard) return;
                navigator.clipboard.writeText(state.resultVal);
              } }
            >
              結果をコピー
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
