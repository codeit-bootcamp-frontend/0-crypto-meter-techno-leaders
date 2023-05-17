import { useCallback } from 'react';
import Modal from 'react-modal';
import Button from './Button';

const modalStyle = {
  overlay: {
    top: '76px',
    right: '52px',
    backgroundColor: 'none',
  },
  content: {
    position: 'absolute',
    overflow: 'auto',
    top: 0,
    right: 0,
    left: 'auto',
    bottom: 'auto',
    border: '1px solid #E7E9F0',
    borderRadius: '16px',
    boxShadow: '0px 4px 15px rgba(11, 14, 27, 0.08)',
    zIndex: 10,
    width: '520px',
    height: '590px',
  },
};

function HistoryModal({ isOpen, handleModalOpen }) {
  const handleModalClose = useCallback(() => {
    handleModalOpen(false);
  }, []);

  return (
    <Modal
      style={modalStyle}
      isOpen={isOpen}
      onRequestClose={() => handleModalClose()}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700 }}>검색 기록</h1>
        <Button propStyle={{ border: 'none' }} name="기록 모두 지우기" />
      </div>
    </Modal>
  );
}

export default HistoryModal;

Modal.setAppElement('#root');
