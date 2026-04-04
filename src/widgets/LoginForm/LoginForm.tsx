import { Card, Flex, Form, theme } from "antd";
import styles from "./LoginForm.module.scss";
import LoginFormActions from "./ui/LoginFormActions/LoginFormActions";
import LoginFormFields from "./ui/LoginFormFields/LoginFormFields";
import LoginFormHeader from "./ui/LoginFormHeader/LoginFormHeader";

const LoginForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  return (
    <Flex className={styles.wrapper}>
      <Card
        style={{
          width: "100%",
          borderRadius: 34,
          border: "1px solid transparent",
          background: `
            linear-gradient(to bottom, ${token.colorBgLayout}, ${token.colorBgContainer} 50%) padding-box,
            linear-gradient(to bottom, ${token.colorBorderSecondary}, ${token.colorBgContainer} 50%) border-box
          `,
        }}
        classNames={{ body: styles.cardBody }}
      >
        <LoginFormHeader />
        <Form form={form} layout="vertical" requiredMark={false} size="large">
          <LoginFormFields />
          <LoginFormActions />
        </Form>
      </Card>
    </Flex>
  );
};

export default LoginForm;
