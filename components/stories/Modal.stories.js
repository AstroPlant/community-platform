import { text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

export default {
  component: Modal,
  title: "Modal",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        inverted
        label={"Show Modal"}
        color={"secondary"}
        onClick={() => setShow(true)}
      />
      <Modal
        title={text("Title", "Modal")}
        show={show}
        handleClose={() => setShow(false)}
      >
        <p>Hey I'm a modal</p>
      </Modal>
    </>
  );
};
