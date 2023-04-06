import { Form } from 'react-bootstrap';
import { SectionType } from '../types/types.d';

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = { border: 0, height: '150px', width: '400px', resize: 'none' }
const TextArea = ({ type, loading, value, onChange }: Props) => {

    const styles = type === SectionType.From ?
        commonStyles : { ...commonStyles, borderRight: '1px solid #ccc', backgroundColor: '#f5f5f5' };
    const placeholder = type === SectionType.From ? 'Ingresar un texto ...' : loading ? 'cargando...' : 'Traduccion';

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as="textarea"
            rows={10}
            disabled={type === SectionType.To}
            placeholder={placeholder}
            style={styles}
            onChange={handleChange} />
    );
};

export { TextArea };