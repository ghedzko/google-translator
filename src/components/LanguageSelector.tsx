import { type FC } from "react";
import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { type Language, type FromLanguage, SectionType } from "../types/types.d";

// interface Props { onChange: (language: Language) => void }
type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }
export const LanguageSelector: FC<Props> = (
    { onChange, value, type }
) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value as Language)
    }

    return (
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}