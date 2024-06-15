import {useEffect, useRef, useState} from 'react';
import {FixedSizeList as List} from 'react-window';
import classNames from 'classnames';
import {ChevronIcon} from '@/components/icons/chevron';
import {KEYBOARD_KEY} from '@/constants';
import styles from './custom-select.module.scss';

const LABEL = 'Select an option';
const INTERACTION = {
  KEYBOARD: 'keyboard',
  MOUSE: 'mouse',
};

export const CustomSelect = ({label = LABEL, options, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [lastInteraction, setLastInteraction] = useState(null);

  const selectRef = useRef(null);
  const listRef = useRef(null);

  const selectLabel = selectedIndex >= 0 ? options[selectedIndex].value : label;

  useEffect(() => {
    if (isOpen) {
      selectRef.current.focus();

      if (selectedIndex >= 0) {
        listRef.current.scrollToItem(selectedIndex);
        setHoverIndex(selectedIndex);
      }
    }
  }, [isOpen, selectedIndex]);

  const onKeyDown = ({key}) => {
    setLastInteraction(INTERACTION.KEYBOARD);

    switch (key) {
      case KEYBOARD_KEY.ARROW_DOWN:
      case KEYBOARD_KEY.ARROW_UP: {
        if (!isOpen) {
          setIsOpen(true);
          setHoverIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else {
          const newIndex =
            key === KEYBOARD_KEY.ARROW_DOWN
              ? Math.min(hoverIndex + 1, options.length - 1)
              : Math.max(hoverIndex - 1, 0);
          listRef.current.scrollToItem(newIndex);
          setHoverIndex(newIndex);
        }

        break;
      }

      case KEYBOARD_KEY.ENTER: {
        if (isOpen && hoverIndex >= 0) {
          setSelectedIndex(hoverIndex);
          onChange(options[hoverIndex]);
          setIsOpen(false);
        }

        break;
      }

      case KEYBOARD_KEY.ESCAPE: {
        setIsOpen(false);
        break;
      }
    }
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const onItemClick = (index) => {
    setSelectedIndex(index);
    onChange(options[index]);
    setIsOpen(false);
  };

  const onItemMouseEnter = (index) => {
    if (lastInteraction !== INTERACTION.KEYBOARD) {
      setHoverIndex(index);
    }
  };

  const onItemMouseMove = () => {
    if (lastInteraction !== INTERACTION.MOUSE) {
      setLastInteraction(INTERACTION.MOUSE);
    }
  };

  const getSelectItem = ({index, style}) => {
    const className = classNames(styles.optionItem, {
      [styles.optionItem_hover]: hoverIndex === index,
      [styles.optionItem_selected]: selectedIndex === index,
    });

    return (
      <div
        className={className}
        style={style}
        onMouseEnter={() => onItemMouseEnter(index)}
        onMouseMove={onItemMouseMove}
        onClick={() => onItemClick(index)}
      >
        {options[index].value}
      </div>
    );
  };

  const selectClassName = classNames(styles.select, {
    [styles.select_disabled]: options.length === 0,
  });

  return (
    <div className={styles.container}>
      <div
        className={selectClassName}
        tabIndex="0"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={selectRef}
      >
        {selectLabel}
        <ChevronIcon className={styles.chevronIcon} />
      </div>
      {isOpen && (
        <List
          height={150}
          itemSize={30}
          className={styles.optionsList}
          itemCount={options.length}
          ref={listRef}
        >
          {getSelectItem}
        </List>
      )}
    </div>
  );
};
