import React, { useEffect, useState } from "react";
import * as WalletService from "../../services/WalletService";
import * as UserService from "../../services/UserService";
import {
  Container,
  FilterContainer,
  Table,
  Tr,
  Td,
  Th,
  Button,
  Select,
  Input,
  Status,
  ImagePreview,
} from "./style";

const DepositRequests = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRes = await UserService.getAllUser();
        setUsers(userRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await WalletService.getAllDepositRequests({
          email: selectedEmail,
        });
        setRequests(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, [selectedEmail]);

  const refreshRequests = async () => {
    const updated = await WalletService.getAllDepositRequests({
      email: selectedEmail,
    });
    setRequests(updated);
  };

  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn duyệt yêu cầu này?"
    );
    if (!confirmed) return;
    try {
      await WalletService.approveDepositRequest(id);
      await refreshRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn từ chối yêu cầu này?"
    );
    if (!confirmed) return;
    try {
      await WalletService.rejectDepositRequest(id);
      await refreshRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      req.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      req.user?.phone?.toString().includes(search)
  );

  const renderImage = (req) => {
    const base64 = req.imageBase64;
    const url = req.imageUrl;

    const src = base64
      ? base64
      : url
        ? `${process.env.REACT_APP_API_URL_BACKEND}${url}`
        : null;

    return src ? (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <ImagePreview src={src} alt="Ảnh chuyển khoản" />
      </a>
    ) : (
      "—"
    );
  };

  return (
    <Container>
      <FilterContainer>
        <Input
          placeholder="Tìm theo tên, email, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">-- Chọn email --</option>
          {users.map((user) => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </Select>
      </FilterContainer>

      <Table>
        <thead>
          <Tr>
            <Th>Tên</Th>
            <Th>Email</Th>
            <Th>SĐT</Th>
            <Th>Số tiền</Th>
            <Th>Ảnh</Th>
            <Th>Trạng thái</Th>
            <Th>Hành động</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredRequests.map((req) => (
            <Tr key={req._id}>
              <Td>{req.user?.name}</Td>
              <Td>{req.user?.email}</Td>
              <Td>{req.user?.phone}</Td>
              <Td>{req.amount.toLocaleString()}đ</Td>

              <Td>
                {req.imageUrl ? (
                  <ImagePreview src={req.imageUrl} alt="Ảnh chuyển khoản" />
                ) : (
                  "—"
                )}
              </Td>

              <Td>
                <Status status={req.status}>{req.status}</Status>
              </Td>
              <Td>
                {req.status === "pending" && (
                  <>
                    <Button onClick={() => handleApprove(req._id)}>
                      Duyệt
                    </Button>
                    <Button
                      onClick={() => handleReject(req._id)}
                      style={{ marginLeft: "8px", background: "#e74c3c" }}
                    >
                      Từ chối
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DepositRequests;
