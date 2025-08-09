# stack-gen

Xây dựng trang web cho công ty stack-gen với backend Go và frontend Next.js 15 (App Router, TypeScript).

## Cấu trúc

- `backend`: dịch vụ HTTP với Go phục vụ các API:
  - Public: `/api/hello`, `/api/products`, `/api/projects`, `/api/licenses`, `/api/contact`
  - Admin: `/api/admin/products`, `/api/admin/projects`, `/api/admin/licenses`
- `frontend`: ứng dụng Next.js 15 (TypeScript) hỗ trợ đa ngôn ngữ với các đường dẫn dạng `/:lang/...` (`en`, `ja`, `vi`, `ko`):
  - `/:lang` (giới thiệu)
  - `/:lang/products`
  - `/:lang/projects`
  - `/:lang/licenses`
  - `/:lang/contact`
  - `/:lang/admin/products`

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
