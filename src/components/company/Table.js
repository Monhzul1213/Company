
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table as AntTable } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDimensions } from '../../helpers/useDimensions';
import '../../css/table.css'

import Highlighter from 'react-highlight-words';

export const Table = (props) => {
  const {data, setVisible,  setSelected, } = props;
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { height } = useDimensions();

  const { t } = useTranslation();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search `}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
         
            size="small"
            style={{
              width: 90,
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            clearFilters && 
            handleReset(clearFilters)
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: t('print.company'), 
      // accessor: 'CpnyID' ,
      dataIndex: 'CpnyID',
      key: 'CpnyID',
      ...getColumnSearchProps('CpnyID'),
      width: 120
    },
    {
      title: t('table.company'), 
      // accessor: 'CpnyID' ,
      dataIndex: 'CpnyName',
      key: 'CpnyName',
      ...getColumnSearchProps('CpnyName'),
      width: 120
    },
    {
      title: t('user_email'),
      dataIndex: 'WebUserID',
      key: 'WebUserID',
      ...getColumnSearchProps('WebUserID'),
      width: 200
    },
    {
      title: t('user_password'),
      dataIndex: 'WebPassword',
      key: 'WebPassword',
      ...getColumnSearchProps('WebPassword'),
      width: 140
    },
    {
      title: t('login.email'),
      dataIndex: 'Email',
      key: 'Email',
      ...getColumnSearchProps('Email'),
      width: 200,
    },
    {
      title: t('table.phone'),
      dataIndex: 'Phone',
      key: 'Phone',
      align: 'center',
      ...getColumnSearchProps('Phone'),
      width: 100
    },   
    {
      title: t('table.address'),
      dataIndex: 'Address',
      key: 'Address',
      ...getColumnSearchProps('Address'),
      width: 200
    },
     {
      title: t('table.vendorCount'),
      dataIndex: 'VendorCount',
      key: 'VendorCount',
      align: 'center',
      ...getColumnSearchProps('VendorCount'),
      width: 150
    },   
    {
      title: t('table.License'),
      dataIndex: 'LicenseAmt',
      key: 'LicenseAmt',
      align: 'right',
      marginBottom: 20,
      width: 120,
      ...getColumnSearchProps('LicenseAmt'),
    },
    {
      title: t('table.webservice'),
      dataIndex: 'WebServiceURL',
      key: 'WebServiceURL',
      ...getColumnSearchProps('WebServiceURL'),
      width: 120
    },
    {
      title: t('txntype'),
      dataIndex: 'TxnType',
      key: 'TxnType',
      width: 200,
      filters: [
        {
          text: 'Бараа материал : Багцлалт',
          value: 'INAS',
        },
        {
          text: 'Бараа материал : Тохируулга',
          value: 'INAJ',
        },
        {
          text: 'Бараа материал : Зарлага',
          value: 'INII',
        },
        
        {
          text: 'Бараа материал : Тооллого',
          value: 'INPI',
        },
        {
          text: 'Бараа материал : Орлого',
          value: 'INRC',
        },
        {
          text: 'Бараа материал : Шилжүүлэг',
          value: 'INTR',
        },
        {
          text: 'Борлуулалт : Буцаалтын орлого',
          value: 'PSCM',
        },
        {
          text: 'Борлуулалт : Зарлага',
          value: 'PSIN',
        },
      ],
      filteredValue: filteredInfo.TxnType || null,
      onFilter: (value, record) => record.TxnType.includes(value),
      ellipsis: true,
    },  
     {
      title: t('AppServer_IP'),
      dataIndex: 'AppServerIP',
      key: 'AppServerIP',
      align: 'center',
      width: 130,
      ...getColumnSearchProps('AppServerIP'),
    },
    {
      title: t('AppServer_Port'),
      dataIndex: 'AppServerLoginPort',
      key: 'AppServerLoginPort',
      align: 'center',
      width: 120,
      ...getColumnSearchProps('AppServerLoginPort'),
    },
    {
      title: t('AppServer_UserID'),
      dataIndex: 'AppServerLoginUserID',
      key: 'AppServerLoginUserID',
      ...getColumnSearchProps('AppServerLoginUserID'),
      width: 120,
    },
    {
      title: t('AppServer_UserPass'),
      dataIndex: 'AppServerLoginUserPass',
      key: 'AppServerLoginUserPass',
      ...getColumnSearchProps('AppServerLoginUserPass'),
      width: 140,
    },
    {
      title: 'Үүсгэсэн огноо',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      align: 'center',
      width: 120,
      // ...getColumnSearchProps('CreatedDate'),
      sorter: (a, b) => new Date(a.CreatedDate)- new Date( b.CreatedDate),
      // sortDirections: ['descend', 'ascend'],
      // defaultSortOrder: 'descend'
    },
  ];
 

  return <AntTable columns={columns} dataSource={data}
  onChange={handleChange} scroll={{ x: 'max-content', y: height - 260 , scrollToFirstRowOnChange: true
  }} 
  onRow={(record, rowIndex) => {
    return {
      onDoubleClick: event => {
        setVisible(true)
        setSelected(record);
      }, 
    };
  }}  />;
};
