import { useCallback } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import HistoryList from './HistoryList';
import HistoryItem from './HistoryItem';

const dateString = (years, months, days) => {
  const newDate = new Date(years, months, days);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const datas = {
  purchaseDate: dateString(2020, 1, 30),
  investment: 10000,
  coinName: 'bitcoin',
  currentDate: dateString(2023, 5, 18),
  currentValue: 30000,
};

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
      <HistoryList>
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
        <HistoryItem datas={datas} />
      </HistoryList>
    </Modal>
  );
}

export default HistoryModal;

Modal.setAppElement('#root');
