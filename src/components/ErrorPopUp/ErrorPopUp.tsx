import { ErrorPopUpProps } from '../../lib/commonTypes/types';
import Button from '../Button/Button';

export default function ErrorPopUp({ onClick, error }: ErrorPopUpProps) {
  return (
    <>
      <div className="popup-shade" onClick={onClick} role="shade"></div>
      <div className="popup">
        <Button onClick={onClick} className="error-button">
          x
        </Button>
        <div>{error}</div>
      </div>
    </>
  );
}
