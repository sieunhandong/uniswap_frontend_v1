import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as WalletService from "../../services/WalletService";
import {
  Container,
  Title,
  Table,
  HeaderRow,
  Row,
  Cell,
  StatusBadge,
  Empty,
  ImagePreview,
} from "./style";

const UserDepositPage = () => {
  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await WalletService.getUserDepositRequests(userId);
        setRequests(res);
      } catch (error) {
        console.error("Lỗi khi lấy yêu cầu:", error);
      }
    };

    if (userId) fetchRequests();
  }, [userId]);

  return (
    <Container>
      <Title>Danh sách yêu cầu nạp tiền</Title>
      {requests.length === 0 ? (
        <Empty>Không có yêu cầu nào.</Empty>
      ) : (
        <Table>
          <HeaderRow>
            <Cell>STT</Cell>
            <Cell>Số tiền</Cell>
            <Cell>Ảnh chuyển khoản</Cell>
            <Cell>Trạng thái</Cell>
            <Cell>Thời gian</Cell>
          </HeaderRow>
          {requests.map((req, index) => (
            <Row key={req._id}>
              <Cell>{index + 1}</Cell>
              <Cell>{req.amount.toLocaleString()} ₫</Cell>
              <Cell>
                {req.imageUrl ? (
                  <ImagePreview src={req.imageUrl} alt="Ảnh chuyển khoản" />
                ) : (
                  "—"
                )}
              </Cell>

              <Cell>
                <StatusBadge status={req.status}>{req.status}</StatusBadge>
              </Cell>
              <Cell>{new Date(req.createdAt).toLocaleString()}</Cell>
            </Row>
          ))}
        </Table>
      )}
    </Container>
  );
};

export default UserDepositPage;
