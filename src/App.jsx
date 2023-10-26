import { Box, Button, Flex, Select } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



function App() {
  const inputRef = useRef(null);
  const [code, setCode] = useState('// Enter Your Code Here');
  const [convertedCode, setConvertedCode] = useState('Your Output Will Be Shown Here');
  const [language, setLanguage] = useState('');

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.editor.focus();
    }
  };
  useEffect(()=>{
    inputFocus()
  })

  const handleDebug = () => {
    
    axios.post(`https://code-converter-api-n1mc.onrender.com/debug`,{code:code},{headers:{
      "Content-Type":"application/json"
    }}).then((res)=>{
      setConvertedCode(res.data)
    }).catch((error)=>{
      console.log(error)
      setConvertedCode("A network error occured, please try again!")
    })
  };

  const handleConvert = (code, language) => {
  
    axios.post(`https://code-converter-api-n1mc.onrender.com/convert`,{code:code,language:language},{headers:{
      "Content-Type":"application/json"
    }}).then((res)=>{
      setConvertedCode(res.data)

    }).catch((error)=>{
      console.log(error)
      setConvertedCode("A network error occured, please try again!")
     
    })
  };
  
  

  const handleQuality = () => {
    axios.post(`https://code-converter-api-n1mc.onrender.com/quality`,code,{headers:{
      "Content-Type":"application/json"
    }}).then((res)=>{
      setConvertedCode(res.data)
    }).catch((error)=>{
      console.log(error.message)
      setConvertedCode("A network error occured, please try again!")
     
    })
  };
  const handleInput=(val)=>{
    setCode(val)
  }


  return (
      <Box w="100vw" margin="auto">
      <Flex bg="gray.600" justifyContent="space-around" p={5} boxShadow="md">
        <Select
          width="30%"
          color={"gray.900"}
          fontWeight={700}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">SELECT LANGUAGE</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
        </Select>
        <Button
          colorScheme="telegram"
          variant="solid"
          isDisabled={!language}
          onClick={handleConvert}
        >
          CONVERT
        </Button>
        <Button
          colorScheme="telegram"
          variant="solid"
          onClick={handleDebug}
        >
          DEBUG
        </Button>
        <Button
          colorScheme="telegram"
          variant="solid"
          onClick={handleQuality}
        >
          QUALITY CHECK
        </Button>
      </Flex>
      <Flex bg="gray.200">
        <Box width="50%" bg={'blackAlpha.600'} p={1.5}>
          <Editor
            ref={inputRef}
            value={code}
            height="90vh"
            width="100%"
            mode="javascript"
            theme="vs-dark"
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            editorProps={{ $blockScrolling: true }}
            onChange={handleInput}
          />
        </Box>
        <Box  width="50%" color={"#fff"} bg={"blackAlpha.700"} p={5}>
          <h2 style={{ color: "white", fontWeight: "600" }}>Output</h2>
          <ReactMarkdown>{convertedCode}</ReactMarkdown>
        </Box>
      </Flex>
      </Box>
  );
}



export default App;
