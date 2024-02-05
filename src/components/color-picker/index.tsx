import { type FC, useMemo, useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

interface ColorPickerProps {
  onChange?: (value: string) => void;
  value?: string;
}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    const c = color.rgb;
    props.onChange?.(`rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
  };

  const [color, styles] = useMemo(() => {
    const colorValues = props.value ? props.value.match(/\d+/g) : [];
    const colorKeys = 'rgba';
    const color = {} as any;
    colorValues.forEach((c, i) => {
      color[colorKeys[i]] = c;
    });
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return [color, styles];
  }, [props.value]);

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
