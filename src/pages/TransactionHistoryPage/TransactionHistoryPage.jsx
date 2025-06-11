import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as WalletService from '../../services/WalletService';
import * as UserService from '../../services/UserService';
import {
  Container, FilterContainer, ButtonGroup, DatePickerWrapper,
  TransactionTable, Row, Cell, StatusButton
} from './style';
import dayjs from 'dayjs';

const TransactionPage = () => {
  const user = useSelector(state => state.user);
  const [walletId, setWalletId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      const userRes = await UserService.getDetailsUser(user?.id, user?.access_token);
      setWalletId(userRes.data?.wallet);
    };
    if (user?.id && user?.access_token) fetchWallet();
  }, [user]);

  const fetchFilteredTransactions = async () => {
    if (!walletId) return;
    const query = {
      type: typeFilter,
      fromDate,
      toDate
    };
    const result = await WalletService.filterTransactions(walletId, query);
    setTransactions(result);
  };

  useEffect(() => {
    if (walletId) fetchFilteredTransactions();
  }, [walletId, typeFilter, fromDate, toDate]);

  return (
    <Container style={{minHeight: '70vh', marginTop: '20px', marginBottom: '20px'}}>
      <h2>Lịch sử giao dịch</h2>

      <FilterContainer>
        <ButtonGroup>
          {['all', 'deposit', 'withdraw', 'purchase'].map(type => (
            <StatusButton key={type}
              active={typeFilter === type}
              onClick={() => setTypeFilter(type)}
            >
              {type === 'all' ? 'Tất cả' : type.charAt(0).toUpperCase() + type.slice(1)}
            </StatusButton>
          ))}
        </ButtonGroup>

        <DatePickerWrapper>
          <label>Từ</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>Đến</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </DatePickerWrapper>
      </FilterContainer>

      <TransactionTable>
        {transactions.map(tx => (
          <Row key={tx._id}>
            <Cell>{dayjs(tx.createdAt).format('DD-MM-YYYY')}</Cell>
            <Cell>{tx.type}</Cell>
            <Cell>{tx.amount.toLocaleString()} ₫</Cell>
            <Cell>{tx.balanceAfter.toLocaleString()} ₫</Cell>
            <Cell>{tx.description || '--'}</Cell>
          </Row>
        ))}
      </TransactionTable>
    </Container>
  );
};

export default TransactionPage;
