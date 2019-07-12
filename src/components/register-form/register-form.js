import React, { Component } from 'react';
import {
  Form, Input, Icon, Button,
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../service/auth-service';

class RegisterForm extends Component {
  state = {
    confirmDirty: false,
    isLoading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { form, history } = this.props;
    const formValid = await new Promise((resolve) => {
      form.validateFields((err, values) => {
        resolve({ err, values });
      });
    });

    if (!formValid.err) {
      this.setState({ isLoading: true });
      await registerUser(formValid.values);
      this.setState({ isLoading: false });
      history.push('/dashboard');
    }
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords are not the same!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 20,
        offset: 2,
      },
      wrapperCol: {
        span: 20,
        offset: 2,
      },
      labelAlign: 'left',
    };

    const requiredConfigRules = {
      rules: [{ type: 'string', required: true, message: 'This field is required!' }],
    };

    const emailRules = {
      rules: [
        ...requiredConfigRules.rules,
        {
          type: 'email',
          message: 'This is not a valid e-mail!',
        },
      ],
    };

    const passwordRules = {
      rules: [
        ...requiredConfigRules.rules,
        {
          validator: this.validateToNextPassword,
        },
      ],
    };

    const confirmRules = {
      rules: [
        ...requiredConfigRules.rules,
        {
          validator: this.compareToFirstPassword,
        },
      ],
    };

    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { isLoading } = this.state;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
        <Form.Item label="Name">
          {getFieldDecorator('name', requiredConfigRules)(
            <Input prefix={<Icon type="user" />} placeholder="Name" />,
          )}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator('username', requiredConfigRules)(
            <Input prefix={<Icon type="user" />} placeholder="Username" autoComplete="username" />,
          )}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', emailRules)(
            <Input prefix={<Icon type="mail" />} placeholder="E-mail" />,
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', passwordRules)(
            <Input.Password
              prefix={<Icon type="lock" />}
              placeholder="Password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', confirmRules)(
            <Input.Password
              prefix={<Icon type="lock" />}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

RegisterForm.defaultProps = {
  form: {},
  history: {},
};

RegisterForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const RegisterFormComponent = Form.create({ name: 'register_form' })(RegisterForm);

export default withRouter(RegisterFormComponent);
