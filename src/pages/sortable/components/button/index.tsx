import './index.less';

import cx from 'classnames';
import { type FC, useContext } from 'react';

import { PageDataInterface, SortableContext } from '../..';

interface IProps {
  componentData: PageDataInterface;
  index: number;
}

const Button: FC<IProps> = (props) => {
  const componentData = props.componentData;
  const context = useContext(SortableContext);
  const textColorValue = componentData?.config?.fontColor || 'rgba(250,250,250,1)';
  const buttonText = componentData?.config?.buttonText || 'Confirm';
  const buttonBackgroundColorValue = componentData?.config?.backgroundColor || 'rgba(248,231,28,1)';

  const deleteComponent = (e) => {
    e.stopPropagation();
    context.deleteComponent?.(props.index);
  };

  return (
    <div
      className={cx('absolute_button_wrap', {
        'layer-select': context?.currentComponent?.id === 'button',
      })}
    >
      <span onClick={deleteComponent}>
        <img
          className="layer-close-btn"
          alt=""
          src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/close.svg"
        />
      </span>
      <a className="absolute_button" style={{ background: buttonBackgroundColorValue }}>
        <div className="absolute_vertical_bottom">
          <span style={{ color: textColorValue }} className="absolute_button_text">
            {buttonText}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.94975 2.99996L10.8995 7.94971L5.94975 12.8995"
              stroke={textColorValue}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Button;
