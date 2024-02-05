import './index.less';

import cx from 'classnames';
import { type FC, useContext, useMemo } from 'react';

import { SortableContext } from '../..';
import ButtonForm from '../forms/button';
import CanvasForm from '../forms/canvas';
import ImageForm from '../forms/image';

interface FormPanelProps {
  open?: boolean;
}

const FormPanel: FC<FormPanelProps> = (props) => {
  const context = useContext(SortableContext);

  const renderFrom = useMemo(() => {
    if (!context.currentComponent) {
      return null;
    }
    switch (context.currentComponent.id) {
      case 'canvas':
        return <CanvasForm key={context.currentComponent.uuid} />;
      case 'button':
        return <ButtonForm key={context.currentComponent.uuid} />;
      case 'image':
        return <ImageForm key={context.currentComponent.uuid} />;
      default:
        return null;
    }
  }, [context.currentComponent]);

  return (
    <div
      className={cx({
        'form-container': true,
        open: props.open,
      })}
    >
      {renderFrom}
    </div>
  );
};
export default FormPanel;
