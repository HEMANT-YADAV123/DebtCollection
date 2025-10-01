# Debt Collections Dashboard
- A comprehensive React-based dashboard for monitoring and analyzing debt collection performance with real-time insights and visualizations.

<!-- https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Debt+Collections+Dashboard -->

# Features

# 📊 Data Visualization
- KPI Cards: Real-time key performance indicators

- Interactive Charts: Pie charts and bar charts for data analysis

- Responsive Data Table: Sortable, searchable, and paginated transaction data

# 🔧 Data Management

- CSV Upload: Easy data import with automatic parsing

- Data Filtering: Multi-criteria filtering system

- Real-time Calculations: Automatic KPI computation


# 🎯 Key Metrics

- Total Amount Due & Collected

- Collection Rate

- Unique Customers

- PTP (Promise To Pay) Rate & Count

- Average Ticket Size

# Quick Start

- Prerequisites :- Node.js (v14 or higher)
```
npm or yarn
```

## Installation

### Clone the repository

```
git clone <repository-url>
```
- cd debt-collections-dashboar


### Install dependencies
```
npm install
```

- Start the development server
```
npm start
```
-mOpen your browser

- http://localhost:3000

# Project Structure
```
src/
├── components/
│   ├── Dashboard/
│   │   ├── DebtCollectionsDashboard.jsx   # Main container component
│   │   ├── FileUpload.jsx                 # CSV upload component
│   │   ├── FilterPanel.jsx                # Data filtering controls
│   │   ├── KPICards.jsx                   # KPI metrics display
│   │   ├── ChartsSection.jsx              # Data visualization charts
│   │   └── DataTable.jsx                  # Transaction data table
│   └── shared/                            # Reusable components
├── utils/
│   ├── formatters.js                      # Currency and data formatting
│   └── constants.js                       # App constants and configurations
└── App.jsx                               # Main application entry point 
```


# Libraries Used

- React 18: Frontend framework with hooks

- Tailwind CSS: Utility-first CSS framework for styling

- Recharts: Composable charting library built on React

- PapaParse: CSV parsing library for handling file uploads

- Lucide React: Beautiful & consistent icon toolkit

- React Hooks: useState, useMemo for state management


# CSV Data Format

## Required Columns
- Your CSV file should include the following columns:

```
| Column         | Description                  | Format                                     |
|----------------|------------------------------|--------------------------------------------|
| transaction_id | Unique transaction identifier | String                                    |
| customer_id    | Customer identifier           | String                                    |
| dpd_bucket     | Days Past Due bucket          | String (0, 1-30, 31-60, 61-90, 90+)        |
| status         | Payment status                | String (paid, partial, failed, pending, chargeback) |
| channel        | Collection channel            | String (email, phone, sms, etc.)           |
| amount_due     | Total amount due              | Number                                    |
| amount_paid    | Amount collected              | Number                                    |
| is_ptp         | Promise To Pay flag           | Number/String (true/false, 1/0, yes/no)    |

```


# Optional Columns

- transaction_date: Date of transaction (YYYY-MM-DD)
- failure_reason: Reason for payment failure

# KPI Calculations

## Collection Rate
- **Formula:**  
  `Collection Rate = (Total Collected / Total Due) × 100`

## PTP Rate
- **Formula:**  
  `PTP Rate = (PTP Count / Total Transactions) × 100`

## Average Ticket Size
- **Formula:**  
  `Average Ticket = Total Due / Number of Non-Zero Transactions`

## Unique Customers
- **Formula:**  
  `Unique Customers = Count of distinct customer_id values`

---

# Assumptions & Edge Cases

## Data Processing
- Empty or null values in numeric fields are treated as **0**  
- Missing channel values are defaulted to **"(unknown)"**  
- DPD buckets are sorted in severity order: `0 → 1-30 → 31-60 → 61-90 → 90+`  
- PTP field supports multiple formats for flexibility  

## Filtering Logic
- Date range filtering only applies if **both start and end dates** are provided  
- Empty filter arrays show all data (**no filtering**)  
- Text search performs **case-insensitive partial matches** across all columns  

## Calculation Edge Cases
- **Collection rate** is `0%` when total due is `0` (to avoid division by zero)  
- **Average ticket** excludes zero-amount transactions for meaningful calculation  
- **PTP rate** calculation handles both **count** and **percentage display**  


# Sample CSV Data

```
transaction_id,customer_id,dpd_bucket,status,channel,amount_due,amount_paid,is_ptp,transaction_date
T001,CUST001,1-30,pending,email,10000,0,true,2024-01-15
T002,CUST002,31-60,partial,phone,15000,5000,false,2024-01-16
T003,CUST003,61-90,paid,sms,20000,20000,true,2024-01-17
T004,CUST001,90+,failed,email,5000,0,true,2024-01-18
```

# Supported PTP Formats
- The dashboard supports multiple PTP (Promise To Pay) value formats:

- Boolean: true / false

- Numeric: 1 / 0

- String: "true" / "false", "yes" / "no", "y" / "n"

# Filtering Options

## Date Range
- Filter transactions by start and end dates

## DPD Buckets
- Predefined buckets: 0, 1-30, 31-60, 61-90, 90+

- Automatic sorting by delinquency severity

## Collection Channels
- Dynamic channel list from uploaded data

- Multi-select filtering

# Available Scripts

- npm start - Run development server

- npm run build - Create production build

- npm test - Run test suite

- npm run eject - Eject from Create React App


# Browser Support

- Chrome (latest)

- Firefox (latest)

- Safari (latest)

- Edge (latest)


# Performance Features

- Memoized Calculations: Efficient KPI computations

- Lazy Loading: Optimized component rendering

- Responsive Design: Mobile-friendly interface

- Real-time Updates: Instant filter responses

# Troubleshooting

## Common Issues

1. PTP Rate shows 0%

- Check your CSV PTP column format

- Ensure values are in supported formats

- Verify column name is is_ptp, ptp, or promise_to_pay

2. CSV upload fails

- Verify file is valid CSV format

- Check required columns are present

- Ensure no empty rows at the end

3. Charts not displaying

- Verify data contains valid numeric values

- Check browser console for errors



# Debug Mode
- Enable console logs by checking the browser developer tools for:

-- Data parsing results

-- PTP calculation details

-- Filter application logs

# Contributing


- Fork the repository

- Create a feature branch

- Commit your changes

- Push to the branch

- Create a Pull Request
