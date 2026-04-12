# MyToken (MTK) — ERC-20 Smart Contract

Smart contract token ERC-20 sederhana yang dibangun di atas jaringan Ethereum menggunakan Solidity `^0.8.28`.

---

## Informasi Token

| Properti | Nilai |
|---|---|
| **Nama** | MyToken |
| **Symbol** | MTK |
| **Decimals** | 18 |
| **Lisensi** | MIT |

---

## Fitur

- ✅ Mint token saat deploy melalui `constructor`
- ✅ Transfer token antar address
- ✅ Sistem allowance (delegasi pengeluaran token)
- ✅ Transfer dari address lain menggunakan allowance
- ✅ Event `Transfer` dan `Approval` sesuai standar ERC-20

---

## Cara Deploy

Deploy contract dengan memberikan jumlah supply awal (dalam satuan token, **bukan** wei):

```solidity
constructor(uint256 _initialSupply)
```

**Contoh:** Jika ingin supply 1.000.000 MTK, deploy dengan nilai `1000000`. Contract akan otomatis mengalikan dengan `10^18` secara internal.

Seluruh supply awal akan langsung dikirim ke address deployer.

---

## Fungsi-Fungsi

### 🔍 Read (View)

#### `balanceOf(address owner) → uint256`
Mengembalikan saldo token milik address `owner`.

```solidity
function balanceOf(address owner) external view returns (uint256)
```

#### `allowance(address owner, address spender) → uint256`
Mengembalikan jumlah token yang diizinkan oleh `owner` untuk dibelanjakan oleh `spender`.

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

---

### ✍️ Write (State-Changing)

#### `transfer(address to, uint256 amount) → bool`
Mengirim sejumlah `amount` token dari pemanggil fungsi (`msg.sender`) ke address `to`.

```solidity
function transfer(address to, uint256 amount) external returns (bool)
```

| Parameter | Keterangan |
|---|---|
| `to` | Address tujuan |
| `amount` | Jumlah token dalam satuan terkecil (wei) |

---

#### `approve(address spender, uint256 amount) → bool`
Mengizinkan `spender` untuk membelanjakan hingga `amount` token atas nama pemanggil.

```solidity
function approve(address spender, uint256 amount) external returns (bool)
```

| Parameter | Keterangan |
|---|---|
| `spender` | Address yang diberi izin |
| `amount` | Batas jumlah token yang boleh dibelanjakan |

---

#### `transferFrom(address from, address to, uint256 amount) → bool`
Memindahkan `amount` token dari `from` ke `to`, menggunakan allowance yang telah diberikan sebelumnya.

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool)
```

| Parameter | Keterangan |
|---|---|
| `from` | Address asal token |
| `to` | Address tujuan token |
| `amount` | Jumlah token yang dipindahkan |

> ⚠️ Akan gagal jika allowance tidak mencukupi.

---

## Events

| Event | Kapan Dipancarkan |
|---|---|
| `Transfer(address from, address to, uint256 value)` | Setiap kali token berpindah, termasuk saat mint (from = `address(0)`) |
| `Approval(address owner, address spender, uint256 value)` | Setiap kali `approve` dipanggil |

---

## Alur Penggunaan (Transfer dengan Allowance)

```
1. Alice memanggil approve(Bob, 500 MTK)
   → Bob mendapat izin belanja 500 MTK dari saldo Alice

2. Bob memanggil transferFrom(Alice, Charlie, 200 MTK)
   → 200 MTK berpindah dari Alice ke Charlie
   → Sisa allowance Bob menjadi 300 MTK
```

---

## Error Messages

| Pesan Error | Penyebab |
|---|---|
| `ERC20: transfer from zero address` | Address pengirim adalah `address(0)` |
| `ERC20: transfer to zero address` | Address penerima adalah `address(0)` |
| `ERC20: insufficient balance` | Saldo pengirim tidak mencukupi |
| `ERC20 : transfer amount exceeds allowance` | Allowance tidak cukup untuk `transferFrom` |

---

## Struktur Kontrak

```
MyToken
├── State Variables
│   ├── name, symbol, decimals
│   ├── totalSupply
│   ├── balances (mapping)
│   └── allowances (mapping)
├── Events
│   ├── Transfer
│   └── Approval
├── Constructor
├── External Functions
│   ├── balanceOf()
│   ├── transfer()
│   ├── approve()
│   ├── allowance()
│   └── transferFrom()
└── Internal Functions
    └── _transfer()
```

---

## Teknologi

- **Bahasa:** Solidity `^0.8.28`
- **Standar:** ERC-20 (implementasi manual)
- **Lisensi:** MIT
