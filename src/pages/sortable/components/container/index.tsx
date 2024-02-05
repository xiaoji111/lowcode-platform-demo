import './index.less';

import { type FC, useContext } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { CanvasConfigInterface, SortableContext } from '../../index';
import RenderComponents from '../render';

const Container: FC<{ canvasConfig: CanvasConfigInterface }> = (props) => {
  const context = useContext(SortableContext);

  if (!context?.pageData) {
    return null;
  }

  return (
    <div
      className="container-view-mobile"
      onClick={(e) => {
        console.log(e);
        e.stopPropagation();
        context.setCurrentComponent?.({ id: 'canvas', uuid: 'canvas' });
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        context.setCurrentComponent?.(null);
      }}
    >
      <div className="wrapper-view-mobile">
        <div className="tmpl-container-box">
          <ReactSortable
            group="formItem"
            list={context.pageData}
            setList={context.setComponents}
            ghostClass="ghost-class"
            animation={150}
            className="tmpl-container"
            style={{ backgroundColor: props.canvasConfig?.backgroundColor }}
            filter=".disabled"
          >
            {context.pageData.map((componentData, index) => (
              <RenderComponents
                key={componentData.uuid}
                index={index}
                componentData={componentData}
              />
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};

export default Container;
