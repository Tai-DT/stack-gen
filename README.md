# stack-gen

Xây dựng trang web cho công ty stack-gen với backend Go và frontend Next.js 15 (App Router, TypeScript).

## Cấu trúc

- `backend`: dịch vụ HTTP đơn giản với Go phục vụ các API:
  - `/api/hello`
  - `/api/products`
  - `/api/projects`
  - `/api/licenses`
  - `/api/contact`
- `frontend`: ứng dụng Next.js 15 sử dụng App Router và TypeScript với các trang:
  - `/` (giới thiệu)
  - `/products`
  - `/projects`
  - `/licenses`
  - `/contact`

## Chạy dự án

### Backend

```bash
cd backend
go run .
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
