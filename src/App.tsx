import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types/types.d';

function App() {
  const { fromLanguage, toLanguage, fromText, loading, result, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()
  console.log({ fromLanguage, toLanguage, fromText, loading, result })
  return (
    <Container fluid >
      <h1>Google translate</h1>
      <Row>
        <Col>
          <h2>From: {fromLanguage}</h2>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
          <textarea name="" id="" cols={30} rows={10}></textarea>
        </Col>
        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => { interchangeLanguages() }}>
            <ArrowsIcon />
          </Button>

        </Col>
        <Col>
          <h2>To: {toLanguage}</h2>
          <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />

          <textarea name="" id="" cols={30} rows={10}></textarea>
        </Col>
      </Row>
      <button>Translate</button>
      <p>{fromLanguage}</p>
    </Container>
  );
}

export default App;
