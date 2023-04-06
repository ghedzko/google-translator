import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';
import { Row, Container, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types/types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';

function App() {
  const { fromLanguage, toLanguage, fromText, loading, result, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore()
  // console.log({ fromLanguage, toLanguage, fromText, loading, result, setFromLanguage, setToLanguage, })
  useEffect(() => {
    if (fromText === '') {
      return;
    }

    const timer = setTimeout(() => {
      translate(fromLanguage, toLanguage, fromText)
        .then((text) => {
          console.log(text);
          if (text == null) return;
          setResult(text);
        })
        .catch(() => {
          setResult('error');
        });
    }, 1000); // Retraso de 1 segundo

    // Limpieza al desmontar el componente o cuando las dependencias cambien
    return () => { clearTimeout(timer) };
  }, [fromLanguage, toLanguage, fromText]);
  return (
    <Container fluid >
      <h1>Google translate</h1>
      <Row>
        <Col >
          <Stack gap={3} >
            <h2>From: {fromLanguage}</h2>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => { interchangeLanguages() }}>
            <ArrowsIcon />
          </Button>

        </Col>
        <Col>
          <Stack gap={3} >
            <h2>To: {toLanguage}</h2>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />

            <TextArea
              type={SectionType.To}
              value={result}
              loading={loading}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
      <button>Translate</button>
      <p>{fromLanguage}</p>
    </Container>
  );
}

export default App;
