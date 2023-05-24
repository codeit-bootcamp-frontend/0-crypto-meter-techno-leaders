import { useCallback, useState } from 'react';
import { Popover } from '@headlessui/react';
import Button from '/src/components/GNB/Button';
import HistoryList from '/src/components/GNB/HistoryList';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryPopover.module.css';

const cn = classNames.bind(styles);

function HistoryPopover() {
  const handlePopoverOpenClose = useCallback(() => {
    !open;
  }, []);

  return (
    <Popover as="div">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn('open-button', { active: open })}
            onClick={handlePopoverOpenClose}
          >
            <p className={cn('button-name')}>검색 기록</p>
          </Popover.Button>
          {open && (
            <Popover.Panel
              className={cn('panel')}
              static
              onClose={handlePopoverOpenClose}
            >
              <div className={cn('popover-header')}>
                <h1>검색기록</h1>
                <Button
                  propStyle={{ border: 'none', width: '95px' }}
                  name="기록 모두 지우기"
                />
              </div>
              <HistoryList />
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
}

export default HistoryPopover;
