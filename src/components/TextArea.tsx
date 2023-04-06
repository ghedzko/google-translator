import { Form } from 'react-bootstrap';
import { SectionType } from '../types/types.d';

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = { border: 0, height: '150px', width: '400px' }
const TextArea = ({ type, loading, value, onChange }: Props) => {

    const styles = type === SectionType.From ?
        commonStyles : { ...commonStyles, borderRight: '1px solid #ccc', backgroundColor: 'f5f5f5' };
    const placeholder = type === SectionType.From ? 'Ingresar un texto ...' : 'Traduccion';

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as="textarea"
            rows={10}
            placeholder={placeholder}
            style={styles} />
    );
};

export { TextArea };