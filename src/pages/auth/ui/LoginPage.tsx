import { FC } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/entities/auth';
import styles from './LoginPage.module.scss';

interface LoginForm {
  nickname: string;
  password: string;
}

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: LoginForm) => {
    try {
      // В реальном приложении здесь был бы API запрос
      login({
        id: Date.now().toString(),
        nickname: values.nickname,
        email: 'user@example.com',
        country: 'us',
      });
      messageApi.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      messageApi.error('Failed to login. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card title="Login" className={`${styles.card} auth-modal`}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateTrigger="onBlur"
        >
          <Form.Item
            name="nickname"
            label="Nickname"
            rules={[
              { required: true, message: 'Please input your nickname!' },
              { min: 3, message: 'Nickname must be at least 3 characters!' },
              { max: 20, message: 'Nickname cannot be longer than 20 characters!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <div className={styles.registerLink}>
            Don't have an account?{' '}
            <Button type="link" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}; 