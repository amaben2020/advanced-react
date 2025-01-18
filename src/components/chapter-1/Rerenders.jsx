import { useEffect } from 'react';

import { BunchOfStuff, OtherStuffAlsoComplicated } from './../mocks/mocks';

import { VerySlowComponent } from '../very-slow-component';
import { ModalDialog } from '../basic-modal-dialog';
import { Button } from '../Button';
import { useModalDialog } from './hooks/useResizeDetector';
import { useMediaQuery } from './hooks/useMediaQuery';

function ModalAndButtonComponent() {
  // before hooks
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, open, close } = useModalDialog();
  const matches = useMediaQuery();

  useEffect(() => {
    if (matches.matches) {
      alert(matches.matches);
    }
  }, [matches.matches]);

  return (
    <>
      <Button onClick={() => open(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => close(false)} /> : null}
    </>
  );
}

export default function Rerenders() {
  // instead of putting the state here, we move it to the Component that truly cares which is the ModalAndButtonComponent.
  return (
    <>
      <ModalAndButtonComponent />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
