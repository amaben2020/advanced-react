/* eslint-disable react/prop-types */

import './../dialog/';
import './styles.css';

const Something = () => <div>Something. This is left column component</div>;
const OtherThing = () => <div>OtherThing. This is middle column component</div>;
const SomethingElse = () => (
  <div>SomethingElse. This is right column component</div>
);

const ThreeColumnsLayout = ({ leftColumn, middleColumn, rightColumn }) => (
  <div className="three-layout">
    <div className="left">{leftColumn}</div>
    <div className="middle">{middleColumn}</div>
    <div className="right">{rightColumn}</div>
  </div>
);
export default function ThreeColsLayout() {
  return (
    <ThreeColumnsLayout
      leftColumn={<Something />}
      middleColumn={<OtherThing />}
      rightColumn={<SomethingElse />}
    />
  );
}

{
  /* <> ❌
  <LeftCol />
  <MidCol />
  <RightCol/>
</> */
}
