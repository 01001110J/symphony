import { Form, Input, Button } from 'antd';
import { RESET, SET_LOGIN_STATE } from '@context/reducers/authReducer.js';

const LoginForm = ({ authState, handleInputChange, signIn, dispatch }) => (
  <Form className="max-w-[400px] w-full">
    <h2 className="mb-2 text-2xl font-bold">Login</h2>
    <Form.Item
      validateStatus={authState.request.error ? 'error' : ''}
      help={authState.request.error ? authState.request.message : ''}
    >
      <Input type="email" placeholder="Email" value={authState.user.email} onChange={handleInputChange('email')} />
    </Form.Item>
    <Form.Item>
      <Input
        type="password"
        placeholder="Password"
        value={authState.user.password}
        onChange={handleInputChange('password')}
      />
    </Form.Item>
    <Button type="primary" className="w-full mt-5 text-white bg-[#11181C]" onClick={signIn}>
      Entrar
    </Button>
    <p className="mt-3">
      ¿No tienes cuenta?
      <span
        className="ml-2 text-indigo-500 cursor-pointer"
        onClick={() => {
          dispatch({ type: RESET });
          dispatch({ type: SET_LOGIN_STATE, payload: false });
        }}
      >
        Regístrate
      </span>
    </p>
  </Form>
);

export default LoginForm;
