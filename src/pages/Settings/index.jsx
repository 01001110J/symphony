import { useContext } from 'react';
import { Form, Input, Tag, Switch, Divider, Typography, Button, Popconfirm } from 'antd';

import { DarkThemeContext } from '@context/DarkTheme';
import { TokenContext } from '@context/Tokens';

const { Title, Text } = Typography;

const Settings = () => {
  const { isDarkMode, toggleDarkTheme } = useContext(DarkThemeContext);
  const {
    hasHuggingToken,
    huggingInput,
    perplexityInput,
    hasPerplexityToken,
    setHuggingInput,
    saveHuggingFaceToken,
    deleteHuggingFaceToken,
    setPerplexityInput,
    savePerplexityToken,
    deletePerplexityFaceToken,
  } = useContext(TokenContext);

  return (
    <section className="w-full ant-tabs-content">
      <div className="w-full md:w-1/2">
        <Title level={3}>Theme</Title>
        <div className="flex items-center">
          <Text className="mr-3 text-custom">{isDarkMode ? 'Desactivar' : 'Activar'} dark mode</Text>
          <Switch value={isDarkMode} onChange={toggleDarkTheme} />
        </div>
        <Divider />
        <Title level={3}>Hugging face API 🤗</Title>
        <Text className="mb-3 text-custom">
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
        <Form className="w-full mt-3 h-fit">
          <Form.Item
            className="flex items-center w-full h-fit"
            validateStatus={huggingInput.error ? 'error' : ''}
            help={huggingInput.error ? huggingInput.message : ''}
          >
            <Input
              autoFocus
              disabled={hasHuggingToken}
              type="password"
              placeholder="Hugging face token"
              value={huggingInput.value}
              onChange={(e) =>
                setHuggingInput({
                  ...huggingInput,
                  value: e.target.value,
                })
              }
            />
            {!hasHuggingToken ? (
              <Button onClick={saveHuggingFaceToken} disabled={huggingInput.value.length < 10} className="w-full mt-3">
                Guardar
              </Button>
            ) : (
              <Popconfirm
                title="Eliminar HG token."
                description="¿Estas seguro de eliminar este token? No podrás generar canciones él."
                onConfirm={deleteHuggingFaceToken}
                onCancel={() => null}
                okText="Sí"
                cancelText="No"
              >
                <Button danger className="w-full mt-3">
                  Eliminar
                </Button>
              </Popconfirm>
            )}
          </Form.Item>
        </Form>
        <Divider />
        <Title level={3}>Perplexity API</Title>
        <Text className="mb-3 text-custom">
          Este token te servirá para crear los
          <Tag color="orange" className="mx-1">
            títulos
          </Tag>
          de las canciones, no te preocupes, este se guarda{' '}
          <Tag color="orange" className="mx-0">
            localmente
          </Tag>{' '}
          en tu navegador, puedes borrarlo en cualquier momento.
        </Text>
        <Form className="mt-5">
          <Form.Item
            className="flex items-center w-full h-fit"
            validateStatus={perplexityInput.error ? 'error' : ''}
            help={perplexityInput.error ? perplexityInput.message : ''}
          >
            <Input
              autoFocus
              disabled={hasPerplexityToken}
              type="password"
              placeholder="Perplexity token"
              value={perplexityInput.value}
              onChange={(e) =>
                setPerplexityInput({
                  ...perplexityInput,
                  value: e.target.value,
                })
              }
            />
            {!hasPerplexityToken ? (
              <Button
                onClick={savePerplexityToken}
                disabled={perplexityInput.value.length < 10}
                className="w-full mt-3"
              >
                Guardar
              </Button>
            ) : (
              <Popconfirm
                title="Eliminar Perplexity token."
                description="¿Estas seguro de eliminar este token? No podrás generar canciones él."
                onConfirm={deletePerplexityFaceToken}
                onCancel={() => null}
                okText="Sí"
                cancelText="No"
              >
                <Button danger className="w-full mt-3">
                  Eliminar
                </Button>
              </Popconfirm>
            )}
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Settings;
