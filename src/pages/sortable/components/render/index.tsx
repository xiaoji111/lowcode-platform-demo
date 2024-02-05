import cx from 'classnames';
import { type FC, useContext, useMemo } from 'react';

import { type PageDataInterface, SortableContext } from '../..';
import Button from '../button';
import Image from '../image';

interface IProps {
  componentData: PageDataInterface;
  index: number;
}

const Render: FC<IProps> = (props) => {
  const { componentData } = props;
  const context = useContext(SortableContext);

  const setCurrent = (e) => {
    e.stopPropagation();
    if (componentData.uuid === context?.currentComponent?.uuid) {
      context.setCurrentComponent?.(null);
      return;
    }
    context.setCurrentComponent?.(componentData);
  };

  const deleteComponent = (e) => {
    e.stopPropagation();
    context.deleteComponent?.(props.index);
  };

  const renderComponent = useMemo(() => {
    switch (componentData.id) {
      case 'image':
        return <Image componentData={componentData} />;
      case 'button':
        return <Button componentData={componentData} index={props.index} />;
      default:
        return null;
    }
  }, [componentData]);
  return (
    <div
      className={cx({
        'layer-item': true,
        'layer-item-fixed': componentData.id === 'button',
        disabled: componentData.id === 'button',
        'layer-select':
          context?.currentComponent?.uuid === componentData.uuid && componentData.id !== 'button',
      })}
      onClick={setCurrent}
    >
      {componentData.id !== 'button' ? (
        <span onClick={deleteComponent}>
          <img
            className="layer-close-btn"
            alt=""
            src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/close.svg"
          />
        </span>
      ) : null}
      {renderComponent}
    </div>
  );
};

export default Render;
