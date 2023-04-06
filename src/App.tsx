import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';
import { Row, Container, Col, Button, Form, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types/types.d';
import { TextArea } from './components/TextArea';

function App() {
  const { fromLanguage, toLanguage, fromText, loading, result, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()
  console.log({ fromLanguage, toLanguage, fromText, loading, result, setFromLanguage, setToLanguage })
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
              onChange={setFromLanguage}
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
              onChange={setToLanguage}
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
