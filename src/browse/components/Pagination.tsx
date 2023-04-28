import { useMemo } from 'react';
import { Pagination as BootstraPagination } from 'react-bootstrap';

import { PaginationLink } from '../../common/components/Pagination';

export interface IPaginationProps {
  offset:   number;
  limit:    number;
  count:    number;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

interface IPaginationNumbersListProps {
  offset: number;
  limit:  number;
  count:  number;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

type PaginationPageRole = 'first' | 'last' | 'page' | 'next' | 'skipper-far' | 'skipper-near';

type PaginationPageNumber = {
  index: number;
  role:  PaginationPageRole;
}

function getFakeRollForFiller(numOfGeneratedLinks: number): PaginationPageRole {
  if (numOfGeneratedLinks < 4) {
    return 'next';
  } else if (numOfGeneratedLinks < 6) {
    return 'skipper-near';
  } else {
    return 'skipper-far';
  }
}

function generatePageList(page: number, pages: number): Array<PaginationPageNumber> {
  const pageList: Array<PaginationPageNumber> = [];

  const numOfLinks = 8;

  if (pages <= numOfLinks) {
    for (let i = 1; i <= pages; i++) {
      pageList.push({ index: i, role: 'page' });
    }
    return pageList;
  }

  /**
   * Rules: As SPA, we want a consistent number of links, to avoid jumping.
   * - Always the first and last page.
   * - Always the next following page.
   * - 2 Skipper before current page. Place redundant ones after.
   * - 2 Skipper behind current page to last page. Place redundant ones after.
   */

  // First page
  if (page > 1) {
    pageList.push({ index: 1, role: 'first' });
  }

  // Add 2 skipper before current page, if applicable.
  let intervalEnd = 1; // first page
  let previousPage = intervalEnd;
  if (page > 3) {
    const skipperStep = Math.round((page - previousPage) / 2);
    previousPage = page - skipperStep;
    pageList.push({ index: previousPage, role: 'skipper-far' });
  }
  if (page > 2) {
    const skipperStep = Math.ceil((page - previousPage) / 3);
    if (page - skipperStep !== previousPage) {
      previousPage = page - skipperStep;
      pageList.push({ index: previousPage, role: 'skipper-near' });
    }
  }

  // Current page
  previousPage = page;
  pageList.push({ index: page, role: 'page' });

  // Following page
  if (previousPage < pages - 1) {
    previousPage += 1;
    pageList.push({ index: previousPage, role: page === 1 ? 'first' : 'next' });
  }

  // On page 1, page === first -> fill up
  if (page === 1) {
    previousPage += 1;
    pageList.push({ index: previousPage, role: 'next' });
  }

  // Use remaining skippers, that could not been placed before the current page, additionally after the current page.
  if (pageList.length <= 4 && previousPage < pages - 1) {
    previousPage += 1;
    pageList.push({ index: previousPage, role: 'skipper-far' });
  }
  if (pageList.length <= 4 && previousPage < pages - 1) {
    previousPage += 1;
    pageList.push({ index: previousPage, role: 'skipper-near' });
  }

  if (previousPage < pages - 1) {
    // Add 2 skipper after current page, if applicable.
    const ixPage = pageList.length - 1;
    intervalEnd = pages;
    if (previousPage < pages - 2) {
      const skipperStep = Math.ceil((intervalEnd - previousPage) / 2);
      intervalEnd = previousPage + skipperStep;
      pageList.push({ index: intervalEnd, role: 'skipper-near' });
    }
    if (previousPage < pages - 1) {
      const skipperStep = Math.ceil((intervalEnd - previousPage) / 3);
      if (skipperStep > 0) {
        intervalEnd = previousPage + skipperStep;
        pageList.splice(ixPage + 1, 0, { index: intervalEnd, role: 'skipper-far' });
      }
    }
  }

  // Last page
  if (page !== pages) {
    pageList.push({ index: pages, role: 'last' });
  }

  // Fill remaining slots up (should be always maxSize buttons).
  let ixPrevFiller = pageList.findIndex(p => p.index === page);
  if (ixPrevFiller === -1) throw new Error('Internal error: Page index not found.');
  while (pageList.length < numOfLinks && ixPrevFiller > 0) {
    while (ixPrevFiller > 0) {
      const baseValue = pageList[ixPrevFiller].index;
      const prevVal = pageList[ixPrevFiller - 1].index;
      if (baseValue - prevVal > 1) {
        pageList.splice(ixPrevFiller, 0, { index: baseValue - 1, role: getFakeRollForFiller(pageList.filter(p => p.role !== 'skipper-far').length) });
        break;
      }
      --ixPrevFiller;
    }
  }

  return pageList;
}

const PaginationNumbersList: React.FC<IPaginationNumbersListProps> = ({ offset, limit, count, buildUrl }: IPaginationNumbersListProps) => {
  const numOfPages = Math.ceil(count / limit);
  const currentPage = Math.ceil(offset / limit) + 1;

  const pageList = useMemo(() => generatePageList(currentPage, numOfPages), [currentPage, numOfPages]);

  const pageListJsx: Array<React.ReactNode> = pageList.map(p => (
    <PaginationLink title={p.index.toString()} offset={limit * (p.index - 1)} key={p.index.toString()} active={currentPage === p.index} buildUrl={buildUrl} className={p.role} />
  ));

  return <>{pageListJsx}</>;
};

const Pagination: React.FC<IPaginationProps> = ({ offset, limit, count, buildUrl }: IPaginationProps) => {
  const next = offset + limit;
  const previous = offset - limit;

  if (count <= limit) return null;

  return (
    <nav>
      <BootstraPagination>
        <PaginationLink title='←' offset={previous} key='previous' buildUrl={buildUrl} disabled={previous < 0} />
        <PaginationNumbersList    offset={offset}   limit={limit}  buildUrl={buildUrl} count={count} />
        <PaginationLink title='→' offset={next}     key='next'     buildUrl={buildUrl} disabled={next > count} />
      </BootstraPagination>
    </nav>
  );
};

export default Pagination;
