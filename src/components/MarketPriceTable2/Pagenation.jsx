import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // 페이지 변경 핸들러
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div>
      {/* 페이지 컨텐츠 */}
      {/* ... */}

      {/* 페이지네이션 컴포넌트 */}
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={10} // 전체 페이지 수
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange} // 페이지 변경 핸들러
        containerClassName={cn('pagination')}
        activeClassName={cn('active')}
      />
    </div>
  );
};

export default Pagination;
