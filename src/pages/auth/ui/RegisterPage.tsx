import { FC } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/entities/auth';
import styles from './RegisterPage.module.scss';

interface RegisterForm {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: RegisterForm) => {
    try {
      // В реальном приложении здесь был бы API запрос
      login({
        id: Date.now().toString(),
        nickname: values.nickname,
        email: values.email,
        country: 'us',
      });
      messageApi.success('Successfully registered!');
      navigate('/');
    } catch (error) {
      messageApi.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card title="Registration" className={`${styles.card} auth-modal`}>
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
              { max: 20, message: 'Nickname cannot be longer than 20 characters!' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'Nickname can only contain letters, numbers and underscores',
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
                message: 'Password must contain both letters and numbers',
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>

          <div className={styles.loginLink}>
            Already have an account?{' '}
            <Button type="link" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}; 