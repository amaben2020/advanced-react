/* eslint-disable react/prop-types */

import { Button } from './Button';

export const ModalDialog = ({ onClose }) => {
  return (
    <div className="modal-dialog">
      <div className="content">modal content</div>
      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};
