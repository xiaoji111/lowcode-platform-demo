import './index.less';

import { type FC, useMemo } from 'react';

import { PageDataInterface } from '../..';

interface IProps {
  componentData: PageDataInterface;
}

const Image: FC<IProps> = (props) => {
  const { componentData = {} as PageDataInterface } = props;

  const url = useMemo(() => {
    return componentData.config?.url;
  }, [componentData.config]);

  return (
    <div className="img-wrapper">
      {url ? (
        <img alt="" src={url} />
      ) : (
        <div style={{ fontSize: 14, border: '1px dashed #aaa', padding: 20 }}>
          Please upload a picture
        </div>
      )}
    </div>
  );
};

export default Image;
