import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";

class DrawerForm extends Component {
  render() {
    let {
      children,
      onSubmit,
      title,
      visible,
      onClose,
      formRef,
      submitBtnText,
    } = this.props;
    return (
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Скасувати
            </Button>
            <Button onClick={() => formRef.current.submit()} type="primary">
              {submitBtnText ?? "Зберегти"}
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          ref={formRef}
        >
          {children}
        </Form>
      </Drawer>
    );
  }
}
export default DrawerForm;
