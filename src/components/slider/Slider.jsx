import React, { useEffect, useId, useRef, useState } from 'react';
import sliderStyles from './slider.module.css';

export const Slider = ({
  name,
  min = 0,
  max = 100,
  step = 1,
  startAt = min,
}) => {
  const rangeInputRef = useRef(null);
  const rangeInputId = useId();
  const [value, setValue] = useState(startAt);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const updateStyles = () => {
      if (!rangeInputRef.current) return;

      const percentage = ((value - min) / (max - min)) * 100;
      rangeInputRef.current.style.setProperty(
        '--fill-percentage',
        `${percentage}%`,
      );
    };

    updateStyles();
  }, [rangeInputRef, value]);

  return (
    <div className={sliderStyles['slider-root']}>
      <div className={sliderStyles['slider-header']}>
        <label htmlFor={rangeInputId}>{name}</label>
        <div aria-hidden="true">{value}</div>
      </div>
      <input
        ref={rangeInputRef}
        className={isDragging ? sliderStyles.dragging : ''}
        type="range"
        id={rangeInputId}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onKeyDown={(e) => {
          if (
            ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
          ) {
            setIsDragging(true);
          }
        }}
        onKeyUp={() => setIsDragging(false)}
      />
    </div>
  );
};
