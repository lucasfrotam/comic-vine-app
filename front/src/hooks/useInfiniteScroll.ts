import { useEffect, RefObject } from 'react';

interface UseInfiniteScroll {
  getMore: () => void;
  elementRef: RefObject<HTMLElement>;
}

const useInfiniteScroll = ({ getMore, elementRef }: UseInfiniteScroll) => {
  useEffect(() => {
    getMore();

    const onScroll = () => {
      if (
        window.innerHeight + (elementRef?.current?.scrollTop ?? 0) <
        (elementRef?.current?.scrollHeight ?? 0)
      ) return;
      getMore();
    };

    elementRef?.current?.addEventListener('scroll', onScroll);
  }, [getMore, elementRef])
}

export default useInfiniteScroll;