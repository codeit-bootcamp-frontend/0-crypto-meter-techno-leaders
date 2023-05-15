import { useCallback } from 'react';
import restoreIcon from '../../assets/images/restore.svg';
import Button from './Button';
import LogoWithName from './LogoWithName';

function GNB() {
  const handleRestoreClick = useCallback(() => {
    console.log('다시 계산하기 버튼 클릭');
    // inputBoard, mainBoard 초기화 로직 들어갈 곳
  }, []);

  const handleSelectChanage = useCallback((e) => {
    console.log(e.target.value);
    // e.target.value 값으로 화폐단위 state 변경 로직 들어갈 곳
  }, []);

  const handleHistoryClick = useCallback(() => {
    console.log('검색 기록 버튼 클릭');
    // search history modal 띄워줄 로직 들어갈 곳
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px',
      }}
    >
      <LogoWithName />
      <div
        className="button-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '329px',
        }}
      >
        <Button
          handleClick={handleRestoreClick}
          source={restoreIcon}
          name="다시 계산하기"
        />
        <select
          onChange={handleSelectChanage}
          style={{
            height: '40px',
            width: '90px',
            borderRadius: '15px',
            paddingLeft: '15px',
          }}
        >
          <option value="won">원 (₩)</option>
          <option value="dollar">USD ($)</option>
        </select>
        <Button
          handleClick={handleHistoryClick}
          propStyle={{ width: '1000px' }}
          name="검색 기록"
        />
      </div>
    </div>
  );
}

export default GNB;
