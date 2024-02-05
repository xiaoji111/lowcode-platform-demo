import './index.less';

import { Button } from 'antd';
import cx from 'classnames';
import { pullAt } from 'lodash-es';
import { type FC, createContext, Dispatch, SetStateAction, useState } from 'react';
import { type ItemInterface, ReactSortable } from 'react-sortablejs';
import { v4 as uuidv4 } from 'uuid';

import Container from './components/container';
import FormPanel from './components/form-panel';

export interface PageDataInterface extends ItemInterface {
  uuid: string;
}

interface IContext {
  pageData: PageDataInterface[];
  setComponents: (pageData: ItemInterface[] | PageDataInterface[]) => void;
  currentComponent: PageDataInterface;
  setCurrentComponent: Dispatch<SetStateAction<PageDataInterface>>;
  deleteComponent: (index: number) => void;
  onFormValuesChange: (value: any, allValue: any) => void;
  onCanvasConfigChange: (value: any, allValue: any) => void;
}

export interface CanvasConfigInterface {
  backgroundColor: string;
}

export const SortableContext = createContext<IContext | null>(null);

const ReactSortableApp: FC = () => {
  const [componentList, setComponentList] = useState<ItemInterface[]>([
    { id: 'image' },
    { id: 'button' },
  ]);

  const [pageData, setPageData] = useState<PageDataInterface[]>([]);

  const [canvasConfig, setCanvasConfig] = useState<CanvasConfigInterface>();

  const [currentComponent, setCurrentComponent] = useState<PageDataInterface>(null);

  const setComponents = (list) => {
    const pageData = list?.map((item) => {
      if (!item.uuid) {
        return {
          ...item,
          uuid: uuidv4(),
        };
      }
      return item;
    });
    /** 查找button位置 */
    const index = pageData.findIndex((item) => item.id === 'button');
    if (index > 0) {
      const eleMove = pullAt(pageData, index)[0];
      pageData.splice(0, 0, eleMove);
    }
    setPageData(pageData);
  };

  const deleteComponent = (index) => {
    const newPageData = [...pageData];
    newPageData.splice(index, 1);
    setPageData(newPageData);
    setCurrentComponent(null);
  };

  const onFormValuesChange = (_, all) => {
    const component = { ...currentComponent };
    component.config = all;
    const index = pageData.findIndex((i) => i.uuid === component.uuid);
    if (index >= 0) {
      pageData.splice(index, 1, component);
    }
    setPageData([...pageData]);
    setCurrentComponent(component);
  };

  const onCanvasConfigChange = (_, all) => {
    setCanvasConfig(all);
  };

  return (
    <SortableContext.Provider
      value={{
        pageData,
        setComponents,
        currentComponent,
        setCurrentComponent,
        deleteComponent,
        onFormValuesChange,
        onCanvasConfigChange,
      }}
    >
      <div className="custom-doc-tmpl-layout">
        <div className="custom-doc-tmpl-header">
          <div className="btn-bar">
            <Button type="text" style={{ marginRight: 16 }}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={() => console.log(JSON.stringify({ pageData, canvasConfig }))}
            >
              保存
            </Button>
          </div>
        </div>
        <div className="custom-doc-tmpl">
          <div className={cx('components-kit-view')}>
            <ReactSortable
              group={{
                name: 'formItem',
                pull: 'clone',
                put: false,
              }}
              list={componentList}
              setList={setComponentList}
              sort={false}
              animation={0}
              filter=".disabled"
              className="components-kit-list"
            >
              {componentList &&
                componentList.map((item) => (
                  <div
                    className={cx('components-kit-item', {
                      disabled:
                        item.id === 'button' && pageData.findIndex((i) => i.id === 'button') > -1,
                    })}
                    key={item.id}
                  >
                    <img
                      className="icon-default"
                      src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-default/date.svg`}
                      alt=""
                    />
                    <img
                      className="icon-hover"
                      src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-hover/date.svg`}
                      alt=""
                    />
                    {item.id}
                  </div>
                ))}
            </ReactSortable>
          </div>
          <div className="container-view">
            <div className="container-view-main">
              <Container canvasConfig={canvasConfig} />
            </div>
          </div>

          {/* 表单 */}
          <div className="form-container-panel">
            <FormPanel open={!!currentComponent} />
          </div>
        </div>
      </div>
    </SortableContext.Provider>
  );
};

export default ReactSortableApp;
