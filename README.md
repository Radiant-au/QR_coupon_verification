# 🎟️ QR Coupon System — Backend

Backend API for the QR Coupon System built for the **2025 Fresher Welcome Event**.  
Handles coupon generation, QR token signing, and redemption at event shops.

---

## 🛠️ Tech Stack

| | |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | TypeORM |
| Auth | JWT |
| Security | HMAC SHA-256 (QR signing) |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/admin` | Admin login | Public |
| POST | `/api/auth/shopkeeper` | Shopkeeper login | Public |

### Coupon
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/coupon/:pinCode` | Generate QR token from pinCode | Public |
| PUT | `/api/coupon` | Redeem coupon via QR scan | Shopkeeper |

### Shop
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/shop` | Create shop | Admin |
| GET | `/api/shop` | Get all shops | Admin |
| GET | `/api/shop/:id` | Get shop by ID | Admin |
| PUT | `/api/shop/:id` | Update shop | Admin |
| PATCH | `/api/shop/:id/deactivate` | Deactivate shop | Admin |
| PATCH | `/api/shop/:id/restore` | Restore shop | Admin |
| DELETE | `/api/shop/:id` | Delete shop | Admin |

### Shopkeeper
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/shopkeeper` | Register shopkeeper | Admin |
| GET | `/api/shopkeeper` | Get all shopkeepers | Admin |
| GET | `/api/shopkeeper/:id` | Get shopkeeper by ID | Shopkeeper |
| DELETE | `/api/shopkeeper/:id` | Delete shopkeeper | Admin |

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DB_HOST=
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_SSL=false

JWT_SECRET=
JWT_EXPIRE_MINUTES=1440

PORT=5000
ENV=development

CORS_ORIGINS=http://localhost:3000
COUPON_SECRET_KEY=
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run database migrations
npm run migration:run

# Seed admin user
npm run seed:admin

# Seed coupons from data/code.json
npm run seed:coupons

# Start development server
npm run dev
```

---

## 🗄️ Database Entities

| Entity | Description |
|--------|-------------|
| `Admin` | Admin accounts |
| `Shop` | Event shops that redeem coupons |
| `Shopkeeper` | Shop staff who scan QR codes |
| `Coupon` | QR coupons linked to voting system pinCodes |

---

## 🔐 How QR Works

1. Voting system calls `GET /api/coupon/:pinCode` → gets a signed HMAC token
2. Token is encoded as base64 and displayed as a QR code
3. Shopkeeper scans QR → `PUT /api/coupon` → token verified → coupon marked as `used`
4. Each coupon is **single-use** — duplicate scans are rejected
