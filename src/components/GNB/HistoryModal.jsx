import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import Button from '/src/components/GNB/Button';
import HistoryList from '/src/components/GNB/HistoryList';
import {
  DesktopModalStyle,
  TabletModalStyle,
  MobileModalStyle,
} from '/src/components/GNB/ModalStyles';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryModal.module.css';

const cn = classNames.bind(styles);

function HistoryModal({ isOpen, handleModalOpen }) {
  const handleModalClose = useCallback(() => {
    handleModalOpen(false);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 620px)',
  });

  const isTablet = useMediaQuery({
    query: '(max-width: 767px) and (min-width: 621px)',
  });

  return (
    <Modal
      style={
        isMobile
          ? MobileModalStyle
          : isTablet
          ? TabletModalStyle
          : DesktopModalStyle
      }
      isOpen={isOpen}
      onRequestClose={() => handleModalClose()}
    >
      <div className={cn('modal-header')}>
        <h1 className={cn('modal-title')}>검색기록</h1>
        <Button
          propStyle={{ border: 'none', width: '95px' }}
          name="기록 모두 지우기"
        />
      </div>
      <HistoryList></HistoryList>
    </Modal>
  );
}

export default HistoryModal;

Modal.setAppElement('#root');
