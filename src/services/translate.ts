import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';
import { type FromLanguage, type Language } from '../types/types';
import { SUPPORTED_LANGUAGES } from '../constants';

// NO PUPLICAR ESTO EN PRODUCCIÓN !!!
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate(
  fromLanguage: FromLanguage,
  toLanguage: Language,
  text: string
) {
  if (fromLanguage === toLanguage) {
    return text;
  }

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'You are talking to a bot that can translate between Languages. You receive a text from the user. Do not answer the user directly. Instead, translate the text into the language specified by the user and send it back to the user. The user will then see the translated text. The original language is surrounded by `{{` and `}}` and the target language is surrounded by `[[` and `]]`. You can also receive {{auto}} wich means that you have to detect the language',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Este é um teste de tradução. {{auto}} [[Español]]',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Esta es una prueba de traducción.',
    },
  ];

  const fromCode =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
    // maxTokens: 100,
    // temperature: 0.5,
    // topP: 1,
    // presencePenalty: 0,
    // frequencyPenalty: 0,
    // bestOf: 1,
    // n: 1,
    // stream: false,
    // stop: ['\n', '{{', '[[', '}}', ']]'],
    // logprobs: null,
    // echo: false,
  });

  return completion.data.choices[0]?.message?.content;
}
