import { useCallback } from 'react';
import Modal from 'react-modal';
import Button from '/src/components/GNB/Button';
import HistoryList from '/src/components/GNB/HistoryList';

const modalStyle = {
  overlay: {
    top: '0',
    right: '0',
    backgroundColor: 'none',
  },
  content: {
    position: 'absolute',
    overflow: 'auto',
    top: '76px',
    right: '52px',
    left: 'auto',
    bottom: 'auto',
    border: '1px solid #E7E9F0',
    borderRadius: '16px',
    boxShadow: '0px 4px 15px rgba(11, 14, 27, 0.08)',
    zIndex: 10,
    width: '520px',
    height: '590px',
    padding: 0,
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
          width: '464px',
          borderBottom: '1px solid #E7E9F0',
          paddingLeft: '28px',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700, width: '73px' }}>
          검색
        </h1>
        <Button
          propStyle={{ border: 'none', width: '90px' }}
          name="기록 모두 "
        />
      </div>
      <HistoryList></HistoryList>
    </Modal>
  );
}

export default HistoryModal;

Modal.setAppElement('#root');