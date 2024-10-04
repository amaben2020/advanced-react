import React from 'react';
import { useState } from 'react';
import { Button } from '../button';

const SomeFormHere = () => <div> some form here</div>;
const SubmitButton = () => <button className="button">Submit button</button>;
const CancelButton = () => (
  <button className="button secondary">Cancel button</button>
);
const ModalDialog = ({ content, footer, onClose }) => {
  return (
    <div className="modal-dialog">
      <div className="content">
        {content}
        <Button onClick={onClose}>Close dialog</Button>
      </div>
      <div className="footer">{footer}</div>
    </div>
  );
};
export default function ModalDiag() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <h4>Dialog with content and one button in the footer</h4>
      <Button onClick={() => setIsOpen1(true)}>Open dialog one</Button>
      {isOpen1 && (
        <ModalDialog
          content={<SomeFormHere />}
          footer={<SubmitButton />}
          onClose={() => setIsOpen1(false)}
        />
      )}
      <h4>Dialog with content and two buttons in the footer</h4>
      <Button onClick={() => setIsOpen2(true)}>Open dialog two</Button>
      {isOpen2 && (
        <ModalDialog
          onClose={() => setIsOpen2(false)}
          content={<SomeFormHere />}
          footer={
            <>
              <SubmitButton />
              <CancelButton />
            </>
          }
        />
      )}
    </>
  );
}
