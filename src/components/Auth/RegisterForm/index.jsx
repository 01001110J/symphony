import { Form, Input, Button } from 'antd';
import { SET_LOGIN_STATE } from '@context/reducers/authReducer.js';

const RegisterForm = ({ authState, handleInputChange, signUp, signInWithGoogle, dispatch }) => (
  <Form className="max-w-[400px] w-full">
    <h2 className="mb-2 text-2xl font-bold">Registro</h2>
    <Form.Item
      validateStatus={authState.request.error ? 'error' : ''}
      help={authState.request.error ? authState.request.message : ''}
    >
      <Input
        type="text"
        placeholder="Username"
        value={authState.user.userName}
        onChange={handleInputChange('userName')}
      />
    </Form.Item>
    <Form.Item>
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
    <Button className="w-full mt-5 text-white bg-[#11181C]" onClick={signUp}>
      Regístrate
    </Button>
    <Button className="w-full mt-5 text-white bg-[#11181C]" onClick={signInWithGoogle}>
      Regístrate con google
    </Button>
    <p className="mt-3">
      ¿Ya tienes cuenta?
      <span
        className="text-indigo-500 cursor-pointer"
        onClick={() => dispatch({ type: SET_LOGIN_STATE, payload: true })}
      >
        Ingresa
      </span>
    </p>
  </Form>
);

export default RegisterForm;
