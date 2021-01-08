import { useRequest } from 'ahooks';
import React, { useRef } from 'react';
import { View, Text, Button} from 'react-native'

const dataSource = [
  {
    id: 1,
    title: 'ahooks title 1',
  },
  {
    id: 2,
    title: 'ahooks title 2',
  },
  {
    id: 3,
    title: 'ahooks title 3',
  },
  {
    id: 4,
    title: 'ahooks title 4',
  },
  {
    id: 5,
    title: 'ahooks title 5',
  },
  {
    id: 6,
    title: 'ahooks title 6',
  },
  {
    id: 7,
    title: 'ahooks title 7',
  },
  {
    id: 8,
    title: 'ahooks title 8',
  },
  {
    id: 9,
    title: 'ahooks title 9',
  },
  {
    id: 10,
    title: 'ahooks title 10',
  },
];

const asyncFn = ({ pageSize, offset }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        list: dataSource.slice(offset, offset + pageSize),
      });
    }, 1000);
  });

export default () => {
  const containerRef = useRef(null);
  const { data, loading, loadingMore, reload, loadMore, noMore } = useRequest(
    d =>
      asyncFn({
        offset: d?.list?.length || 0,
        pageSize: 3,
      }),
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: d => (d ? d.list.length >= d.total : false),
    },
  );
  const { list = [] } = data || {};
  return (
    <View
      ref={containerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Button title={loading ? 'loading' : 'Reload'} onPress={reload} disabled={loading} />
      <View>
        {list.map(item => (
          <View
            style={{
              height: 50,
              borderBottom: '1px',
              lineHeight: '50px',
            }}
          >
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <View>
        {!noMore && (
          <Button title={loadingMore ? 'Loading more...' : 'Click to load more'} onPress={loadMore} disabled={loadingMore} />
        )}

        {noMore && <Text>No more data</Text>}

        <View
          style={{
            float: 'right',
            fontSize: 12,
          }}
        >
          <Text>total: {data?.total}</Text>
        </View>
      </View>
    </View>
  );
};
