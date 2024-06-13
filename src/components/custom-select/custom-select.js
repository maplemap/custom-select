import {useState, useRef, useEffect} from 'react';
import {FixedSizeList as List} from 'react-window';
import './custom-select.css';

export const CustomSelect = ({options, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [lastInteraction, setLastInteraction] = useState(null); // 'mouse' or 'keyboard'
  const selectRef = useRef(null);
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
    setLastInteraction('keyboard');

    if (e.key === 'ArrowDown') {
      if (!isOpen) {
        setIsOpen(true);
        setHoverIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setHoverIndex((prevIndex) => {
          const newIndex = Math.min(prevIndex + 1, options.length - 1);
          listRef.current.scrollToItem(newIndex);
          return newIndex;
        });
      }
    } else if (e.key === 'ArrowUp') {
      if (!isOpen) {
        setIsOpen(true);
        setHoverIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setHoverIndex((prevIndex) => {
          const newIndex = Math.max(prevIndex - 1, 0);
          listRef.current.scrollToItem(newIndex);
          return newIndex;
        });
      }
    } else if (e.key === 'Enter' && isOpen) {
      if (hoverIndex >= 0) {
        setSelectedIndex(hoverIndex);
        onChange(options[hoverIndex]);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleBlur = (e) => {
    // Затримка перед закриттям списку для обробки події кліку
    setTimeout(() => {
      if (!e.currentTarget?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 300);
  };

  const handleMouseEnter = (index) => {
    if (lastInteraction !== 'keyboard') {
      setHoverIndex(index);
    }
  };

  const handleMouseMove = () => {
    if (lastInteraction !== 'mouse') {
      setLastInteraction('mouse');
    }
  };

  useEffect(() => {
    if (isOpen) {
      selectRef.current.focus();
      if (selectedIndex >= 0) {
        listRef.current.scrollToItem(selectedIndex);
        setHoverIndex(selectedIndex);
      }
    }
  }, [isOpen, selectedIndex]);

  return (
    <div className="custom-select-container">
      <div
        className="selected-option"
        tabIndex="0"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={selectRef}
      >
        {selectedIndex >= 0 ? options[selectedIndex] : 'Select an option'}
        <svg className="chevron-icon" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      {isOpen && (
        <List
          height={150}
          itemSize={30}
          className="options-list"
          itemCount={options.length}
          ref={listRef}
        >
          {({index, style}) => (
            <div
              className={`option ${hoverIndex === index ? 'hover' : ''} ${selectedIndex === index ? 'selected' : ''}`}
              style={style}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseMove={handleMouseMove}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(index);
                onChange(options[index]);
                setIsOpen(false);
              }}
            >
              {options[index]}
            </div>
          )}
        </List>
      )}
    </div>
  );
};
