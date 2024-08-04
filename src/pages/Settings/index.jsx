import { useState, useEffect, useContext } from 'react';
import { Form, Input, Tag, Switch, Divider, Typography } from 'antd';

import { DarkThemeContext } from '@context/DarkTheme';
// import { isValidHFToken } from '@helpers';
import { HUGGING_FACE_LOCAL_STORAGE_TOKEN } from '@constants';

const { Title, Text } = Typography;

const Settings = () => {
  const { isDarkMode, toggleDarkTheme } = useContext(DarkThemeContext);
  const [, setHasHuggingToken] = useState(false);
  const [huggingInput, setHuggingInput] = useState({
    value: '',
    error: false,
    message: '',
  });

  /* const saveHuggingFaceToken = () => {
    const isTokenValid = isValidHFToken(huggingInput.value)

    if (!isTokenValid) {
      return setHuggingInput({
        ...huggingInput,
        error: true,
        message: 'El token proporcionado no es valido, por favor verifícalo he intenta nuevamente.'
      })
    }

    localStorage.setItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN, huggingInput);
    setHasHuggingToken(true)
  } */

  useEffect(() => {
    const hasHuggingFaceToken = localStorage.getItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN);

    if (hasHuggingFaceToken) {
      setHasHuggingToken(true);
    }
  }, []);

  return (
    <section className="w-full ant-tabs-content">
      <div className="w-full md:w-1/2">
        <Title level={3}>Theme</Title>
        <div className="flex items-center">
          <Text className="mr-3">{isDarkMode ? 'Desactivar' : 'Activar'} dark mode</Text>
          <Switch value={isDarkMode} onChange={toggleDarkTheme} />
        </div>
        <Divider />
        <Title level={3}>Hugging face API 🤗</Title>
        <Text className="mb-3">
          Este token te servirá para crear
          <Tag color="orange" className="mx-1">
            canciones
          </Tag>
          no te preocupes, este se guarda{' '}
          <Tag color="orange" className="mx-0">
            localmente
          </Tag>{' '}
          en tu navegador, puedes borrarlo en cualquier momento.
        </Text>
        <Form className="max-w-[400px] w-full mt-3">
          <Form.Item
            validateStatus={huggingInput.error ? 'error' : ''}
            help={huggingInput.error ? huggingInput.message : ''}
          >
            <Input
              autoFocus
              type="text"
              placeholder="Hugging face token"
              value={huggingInput.value}
              onChange={(e) =>
                setHuggingInput({
                  ...huggingInput,
                  value: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Settings;
