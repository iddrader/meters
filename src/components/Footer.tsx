import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import '../assets/styles/Footer.css';
import { useStore } from '../models/RootStore';
import { observer } from 'mobx-react';

type FooterProps = {
  metersCount: number;
};

const Footer = observer(({ metersCount }: FooterProps) => {
  const rootStore = useStore();
  const pagesCount = Math.ceil(metersCount / 20);

  useEffect(() => {}, [rootStore.page.currentPage]);

  const getPagination = (): ReactElement[] => {
    const paginationElements: ReactElement[] = [];
    for (let i = 1; i <= pagesCount; i++) {
      if (
        (i - rootStore.page.currentPage <= 2 &&
          rootStore.page.currentPage - i <= 2) ||
        i === pagesCount ||
        i === 1
      )
        paginationElements.push(
          React.createElement(
            'div',
            {
              className:
                rootStore.page.currentPage == i
                  ? 'pagination__page active'
                  : 'pagination__page',
              onClick: () => {
                rootStore.setPage(i);
              },
              key: `pagination_button_${i}`,
            },
            i
          )
        );
    }
    return paginationElements;
  };
  return (
    <>
      <div className="footer">{getPagination().map((el) => el)}</div>
    </>
  );
});

export default Footer;
