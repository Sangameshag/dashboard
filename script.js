// ========== GLOBAL DATA (Original Dashboard) ==========

const kpiData = {
  'OTIF': { current: 87.2, target: 95, change: -2.1, unit: '%', category: 'Service' },
  'Stock Out Rate': { current: 4.8, target: 2, change: 0.3, unit: '%', category: 'Inventory' },
  'Supplier OTD': { current: 91.5, target: 98, change: 1.2, unit: '%', category: 'Procurement' },
  'Lead Time': { current: 12.3, target: 8, change: -0.5, unit: 'days', category: 'Operations' },
  'Cost Per Unit': { current: 24.50, target: 22, change: 2.1, unit: '$', category: 'Cost' },
  'Inventory Turnover': { current: 8.2, target: 12, change: -1.8, unit: 'x', category: 'Inventory' },
  'Quality Score': { current: 94.1, target: 98, change: 0.8, unit: '%', category: 'Quality' },
  'Customer Satisfaction': { current: 86.3, target: 90, change: -1.2, unit: '%', category: 'Service' },
  'Production Efficiency': { current: 78.9, target: 85, change: 2.3, unit: '%', category: 'Operations' },
  'Warehouse Utilization': { current: 92.1, target: 88, change: 3.2, unit: '%', category: 'Operations' },
  'Return Rate': { current: 3.2, target: 2, change: 0.4, unit: '%', category: 'Quality' },
  'Forecast Accuracy': { current: 82.7, target: 90, change: -0.9, unit: '%', category: 'Planning' }
};


// Track pending slider changes for Simulate button
let simPendingChanges = {};

// Enhanced KPI data with detailed information for modal
const kpiDetailData = {
    'OTIF': {
        name: 'On-Time In-Full Delivery',
        description: 'Percentage of orders delivered on time and in full to customers',
        contributors: {
            positive: [
                { name: 'Warehouse Automation', impact: '12%', deviation: '+3.2%' },
                { name: 'Route Optimization', impact: '8%', deviation: '+2.1%' },
                { name: 'Demand Planning', impact: '6%', deviation: '+1.8%' }
            ],
            negative: [
                { name: 'Supplier Delays', impact: '-18%', deviation: '-4.8%' },
                { name: 'Inventory Shortages', impact: '-15%', deviation: '-3.9%' },
                { name: 'Transportation Issues', impact: '-12%', deviation: '-3.1%' }
            ]
        },
        rootCause: 'The primary root cause of OTIF performance decline is the cascading effect of supplier reliability issues (91.5% vs 98% target) combined with inventory management challenges. Late supplier deliveries create stock-out situations (4.8% vs 2% target), which directly impact our ability to fulfill customer orders on time. Additionally, extended lead times (12.3 days vs 8-day target) compound the problem by reducing our flexibility to respond to demand variations.',
        recommendations: 'Implement a three-pronged approach: 1) Diversify supplier base and establish backup sourcing for critical components, 2) Enhance demand forecasting accuracy through advanced analytics and machine learning models, 3) Increase safety stock levels for high-velocity items while optimizing inventory turnover. Consider implementing a supplier scorecard system with performance-based contracts to incentivize on-time delivery.'
    },
    'Stock Out Rate': {
        name: 'Stock Out Rate',
        description: 'Percentage of time products are unavailable when customers want to purchase',
        contributors: {
            positive: [
                { name: 'Safety Stock Optimization', impact: '15%', deviation: '+2.8%' },
                { name: 'Vendor Managed Inventory', impact: '10%', deviation: '+1.9%' },
                { name: 'ABC Analysis Implementation', impact: '8%', deviation: '+1.5%' }
            ],
            negative: [
                { name: 'Forecast Inaccuracy', impact: '-25%', deviation: '-5.2%' },
                { name: 'Supplier Unreliability', impact: '-20%', deviation: '-4.1%' },
                { name: 'Long Lead Times', impact: '-18%', deviation: '-3.8%' }
            ]
        },
        rootCause: 'Stock-out issues stem from a combination of demand forecasting inaccuracy (82.7% vs 90% target) and supply chain reliability problems. The current forecasting model fails to account for seasonal variations and promotional impacts, leading to understocking of high-demand items. Supplier delivery inconsistencies (91.5% OTD) exacerbate the problem by creating unpredictable inventory replenishment cycles.',
        recommendations: 'Deploy advanced demand sensing technology that incorporates real-time market signals, weather data, and social media trends. Implement dynamic safety stock calculations based on demand variability and supplier reliability scores. Establish strategic partnerships with key suppliers to improve delivery consistency and consider local sourcing for critical fast-moving items to reduce dependency on long supply chains.'
    },
    'Supplier OTD': {
        name: 'Supplier On-Time Delivery',
        description: 'Percentage of supplier deliveries received on or before the promised date',
        contributors: {
            positive: [
                { name: 'Supplier Development Program', impact: '20%', deviation: '+4.2%' },
                { name: 'Performance Incentives', impact: '15%', deviation: '+3.1%' },
                { name: 'Quality Partnerships', impact: '12%', deviation: '+2.5%' }
            ],
            negative: [
                { name: 'Geographic Concentration', impact: '-22%', deviation: '-4.8%' },
                { name: 'Capacity Constraints', impact: '-18%', deviation: '-3.9%' },
                { name: 'Communication Gaps', impact: '-15%', deviation: '-3.2%' }
            ]
        },
        rootCause: 'Supplier OTD challenges are primarily driven by over-concentration of suppliers in specific geographic regions, particularly Asia, which creates vulnerability to regional disruptions. Many suppliers are operating at near-full capacity, limiting their flexibility to accommodate rush orders or demand spikes. Additionally, inadequate communication systems and lack of real-time visibility into supplier operations contribute to delivery surprises.',
        recommendations: 'Implement a supplier diversification strategy to reduce geographic concentration risk. Establish regional supplier hubs to improve delivery reliability and reduce lead times. Deploy supplier collaboration platforms for real-time visibility into production schedules and potential delays. Create tiered supplier relationships with preferred partners receiving volume commitments in exchange for guaranteed capacity and delivery performance.'
    },
    'Lead Time': {
        name: 'Lead Time',
        description: 'Average time from order placement to delivery completion',
        contributors: {
            positive: [
                { name: 'Process Automation', impact: '18%', deviation: '+2.8%' },
                { name: 'Local Sourcing', impact: '14%', deviation: '+2.2%' },
                { name: 'Expedited Shipping', impact: '10%', deviation: '+1.6%' }
            ],
            negative: [
                { name: 'Supplier Processing Time', impact: '-28%', deviation: '-4.5%' },
                { name: 'Customs Delays', impact: '-20%', deviation: '-3.2%' },
                { name: 'Quality Inspections', impact: '-15%', deviation: '-2.4%' }
            ]
        },
        rootCause: 'Extended lead times are primarily caused by supplier processing inefficiencies and international shipping complexities. Many suppliers require 5-7 days for order processing and production scheduling, while international shipments face customs delays and documentation requirements. Quality inspection processes, while necessary, add additional time to the overall lead time.',
        recommendations: 'Streamline supplier onboarding and order processing through digital integration and automated systems. Establish pre-positioned inventory in regional distribution centers to reduce shipping distances. Implement risk-based quality inspection processes to reduce inspection time for trusted suppliers. Consider air freight for critical items and negotiate expedited processing agreements with key suppliers.'
    },
    'Cost Per Unit': {
        name: 'Cost Per Unit',
        description: 'Total cost to produce and deliver one unit of product',
        contributors: {
            positive: [
                { name: 'Volume Discounts', impact: '12%', deviation: '+1.8%' },
                { name: 'Process Improvements', impact: '10%', deviation: '+1.5%' },
                { name: 'Automation Savings', impact: '8%', deviation: '+1.2%' }
            ],
            negative: [
                { name: 'Raw Material Inflation', impact: '-20%', deviation: '-3.2%' },
                { name: 'Labor Cost Increases', impact: '-18%', deviation: '-2.9%' },
                { name: 'Energy Price Volatility', impact: '-15%', deviation: '-2.4%' }
            ]
        },
        rootCause: 'Unit cost increases are driven by external market factors including raw material price inflation (8% above budget) and energy cost volatility. Labor costs have increased due to market competition and skill shortages in key manufacturing roles. Inefficiencies in production processes and suboptimal capacity utilization also contribute to higher per-unit costs.',
        recommendations: 'Implement lean manufacturing principles to eliminate waste and improve efficiency. Negotiate long-term contracts with raw material suppliers to stabilize pricing. Invest in automation technology to reduce labor dependency and improve consistency. Optimize production scheduling to maximize capacity utilization and reduce setup costs. Consider alternative materials and suppliers to reduce cost volatility.'
    },
     // Add details for other KPIs if needed for the detail view
    'Inventory Turnover': { name: 'Inventory Turnover', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Quality Score': { name: 'Quality Score', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Customer Satisfaction': { name: 'Customer Satisfaction', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Production Efficiency': { name: 'Production Efficiency', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Warehouse Utilization': { name: 'Warehouse Utilization', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Return Rate': { name: 'Return Rate', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'},
    'Forecast Accuracy': { name: 'Forecast Accuracy', description: '...', contributors: {positive: [], negative: []}, rootCause: '...', recommendations: '...'}
};

// Time series data for charts
const timeSeriesData = {
    weekly: {
        labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8', 'Wk 9', 'Wk 10', 'Wk 11', 'Wk 12'],
        datasets: {
            'OTIF': { 
                actual: [89.2, 88.5, 87.8, 86.9, 87.2, 86.8, 87.1, 87.2, null, null, null, null], 
                trend: [89.0, 88.3, 87.6, 86.9, 86.2, 85.5, 84.8, 84.1, null, null, null, null], 
                prediction: [null, null, null, null, 87.2, 86.8, 86.4, 86.0, 85.6, 85.2, 84.8, 84.4], 
                goal: Array(12).fill(95)
            },
            'Stock Out Rate': { actual: [3.8, 4.1, 4.3, 4.6, 4.8, 4.9, 4.7, 4.8, null, null, null, null], trend: [3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, null, null, null, null], prediction: [null, null, null, null, 4.8, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2], goal: Array(12).fill(2) },
            'Supplier OTD': { actual: [90.2, 90.8, 91.1, 91.3, 91.5, 91.7, 91.4, 91.5, null, null, null, null], trend: [90.0, 90.5, 91.0, 91.5, 92.0, 92.5, 93.0, 93.5, null, null, null, null], prediction: [null, null, null, null, 91.5, 91.8, 92.1, 92.4, 92.7, 93.0, 93.3, 93.6], goal: Array(12).fill(98) },
            /* --- FIXED: Removed duplicate/broken lines 106-107 from here --- */
            'Lead Time': { actual: [13.1, 12.8, 12.5, 12.4, 12.3, 12.2, 12.4, 12.3, null, null, null, null], trend: [13.2, 12.9, 12.6, 12.3, 12.0, 11.7, 11.4, 11.1, null, null, null, null], prediction: [null, null, null, null, 12.3, 12.1, 11.9, 11.7, 11.5, 11.3, 11.1, 10.9], goal: Array(12).fill(8) },
            'Cost Per Unit': { actual: [24.2, 24.3, 24.4, 24.5, 24.5, 24.6, 24.4, 24.5, null, null, null, null], trend: [24.0, 24.2, 24.4, 24.6, 24.8, 25.0, 25.2, 25.4, null, null, null, null], prediction: [null, null, null, null, 24.5, 24.6, 24.7, 24.8, 24.9, 25.0, 25.1, 25.2], goal: Array(12).fill(22) },
            // Add dummy data for other KPIs
            'Inventory Turnover': { actual: [8.5, 8.3, 8.1, 7.9, 8.2, 8.0, 8.1, 8.2, null, null, null, null], trend: [8.6, 8.4, 8.2, 8.0, 7.8, 7.6, 7.4, 7.2, null, null, null, null], prediction: [null, null, null, null, 8.2, 8.1, 8.0, 7.9, 7.8, 7.7, 7.6, 7.5], goal: Array(12).fill(12) },
            'Quality Score': { actual: [93.5, 93.8, 94.0, 94.2, 94.1, 94.3, 94.0, 94.1, null, null, null, null], trend: [93.4, 93.7, 94.0, 94.3, 94.6, 94.9, 95.2, 95.5, null, null, null, null], prediction: [null, null, null, null, 94.1, 94.2, 94.3, 94.4, 94.5, 94.6, 94.7, 94.8], goal: Array(12).fill(98) },
            'Customer Satisfaction': { actual: [87.0, 86.5, 86.1, 85.8, 86.3, 86.0, 86.2, 86.3, null, null, null, null], trend: [87.2, 86.6, 86.0, 85.4, 84.8, 84.2, 83.6, 83.0, null, null, null, null], prediction: [null, null, null, null, 86.3, 86.0, 85.7, 85.4, 85.1, 84.8, 84.5, 84.2], goal: Array(12).fill(90) },
            'Production Efficiency': { actual: [77.0, 77.5, 78.0, 78.5, 78.9, 79.2, 78.8, 78.9, null, null, null, null], trend: [76.5, 77.2, 77.9, 78.6, 79.3, 80.0, 80.7, 81.4, null, null, null, null], prediction: [null, null, null, null, 78.9, 79.3, 79.7, 80.1, 80.5, 80.9, 81.3, 81.7], goal: Array(12).fill(85) },
            'Warehouse Utilization': { actual: [90.0, 90.5, 91.0, 91.5, 92.1, 92.5, 91.8, 92.1, null, null, null, null], trend: [89.5, 90.3, 91.1, 91.9, 92.7, 93.5, 94.3, 95.1, null, null, null, null], prediction: [null, null, null, null, 92.1, 92.4, 92.7, 93.0, 93.3, 93.6, 93.9, 94.2], goal: Array(12).fill(88) },
            'Return Rate': { actual: [3.0, 3.1, 3.3, 3.4, 3.2, 3.3, 3.1, 3.2, null, null, null, null], trend: [3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.3, 4.5, null, null, null, null], prediction: [null, null, null, null, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9], goal: Array(12).fill(2) },
            'Forecast Accuracy': { actual: [83.5, 83.0, 82.5, 82.0, 82.7, 82.3, 82.5, 82.7, null, null, null, null], trend: [83.6, 83.1, 82.6, 82.1, 81.6, 81.1, 80.6, 80.1, null, null, null, null], prediction: [null, null, null, null, 82.7, 82.4, 82.1, 81.8, 81.5, 81.2, 80.9, 80.6], goal: Array(12).fill(90) },
        }
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         datasets: {
            'OTIF': { actual: [91.2, 90.1, 89.3, 88.7, 87.9, 87.5, 87.2, 87.0, 87.0, null, null, null], trend: [91.0, 89.8, 88.6, 87.4, 86.2, 85.0, 83.8, 82.6, 82.6, null, null, null], prediction: [null, null, null, null, null, 87.0, 86.5, 86.0, 85.5, 85.0, 84.5, 84.0], goal: Array(12).fill(95) },
            'Stock Out Rate': { actual: [2.8, 3.2, 3.6, 4.0, 4.3, 4.6, 4.8, 5.0, 5.0, null, null, null], trend: [2.9, 3.4, 3.9, 4.4, 4.9, 5.4, 5.9, 6.4, 6.4, null, null, null], prediction: [null, null, null, null, null, 5.0, 5.3, 5.6, 5.9, 6.2, 6.5, 6.8], goal: Array(12).fill(2) },
            'Supplier OTD': { actual: [89.5, 90.1, 90.4, 90.8, 91.1, 91.3, 91.5, 91.7, 91.7, null, null, null], trend: [89.0, 90.0, 91.0, 92.0, 93.0, 94.0, 95.0, 96.0, 96.0, null, null, null], prediction: [null, null, null, null, null, 91.7, 92.2, 92.7, 93.2, 93.7, 94.2, 94.7], goal: Array(12).fill(98) },
            'Lead Time': { actual: [14.2, 13.8, 13.4, 13.0, 12.7, 12.5, 12.3, 12.1, 12.1, null, null, null], trend: [14.5, 13.8, 13.1, 12.4, 11.7, 11.0, 10.3, 9.6, 9.6, null, null, null], prediction: [null, null, null, null, null, 12.1, 11.8, 11.5, 11.2, 10.9, 10.6, 10.3], goal: Array(12).fill(8) },
            'Cost Per Unit': { actual: [23.8, 24.0, 24.1, 24.3, 24.4, 24.5, 24.5, 24.6, 24.6, null, null, null], trend: [23.5, 24.0, 24.5, 25.0, 25.5, 26.0, 26.5, 27.0, 27.0, null, null, null], prediction: [null, null, null, null, null, 24.6, 24.8, 25.0, 25.2, 25.4, 25.6, 25.8], goal: Array(12).fill(22) },
            // Add dummy data for other KPIs
             'Inventory Turnover': { actual: [9.0, 8.8, 8.5, 8.3, 8.0, 7.8, 8.2, 8.4, 8.4, null, null, null], trend: [9.2, 8.9, 8.6, 8.3, 8.0, 7.7, 7.4, 7.1, 7.1, null, null, null], prediction: [null, null, null, null, null, 8.4, 8.2, 8.0, 7.8, 7.6, 7.4, 7.2], goal: Array(12).fill(12) },
             'Quality Score': { actual: [92.8, 93.1, 93.5, 93.9, 94.2, 94.0, 93.8, 94.1, 94.1, null, null, null], trend: [92.5, 93.0, 93.5, 94.0, 94.5, 95.0, 95.5, 96.0, 96.0, null, null, null], prediction: [null, null, null, null, null, 94.1, 94.4, 94.7, 95.0, 95.3, 95.6, 95.9], goal: Array(12).fill(98) },
             'Customer Satisfaction': { actual: [88.5, 87.8, 87.0, 86.5, 86.0, 85.5, 86.3, 86.8, 86.8, null, null, null], trend: [89.0, 88.0, 87.0, 86.0, 85.0, 84.0, 83.0, 82.0, 82.0, null, null, null], prediction: [null, null, null, null, null, 86.8, 86.4, 86.0, 85.6, 85.2, 84.8, 84.4], goal: Array(12).fill(90) },
             'Production Efficiency': { actual: [75.5, 76.2, 77.0, 77.8, 78.5, 79.0, 78.9, 79.1, 79.1, null, null, null], trend: [75.0, 76.0, 77.0, 78.0, 79.0, 80.0, 81.0, 82.0, 82.0, null, null, null], prediction: [null, null, null, null, null, 79.1, 79.6, 80.1, 80.6, 81.1, 81.6, 82.1], goal: Array(12).fill(85) },
             'Warehouse Utilization': { actual: [88.5, 89.2, 90.0, 90.8, 91.5, 92.0, 92.1, 92.3, 92.3, null, null, null], trend: [88.0, 89.0, 90.0, 91.0, 92.0, 93.0, 94.0, 95.0, 95.0, null, null, null], prediction: [null, null, null, null, null, 92.3, 92.7, 93.1, 93.5, 93.9, 94.3, 94.7], goal: Array(12).fill(88) },
             'Return Rate': { actual: [3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 3.2, 3.3, 3.3, null, null, null], trend: [3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.9, null, null, null], prediction: [null, null, null, null, null, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7], goal: Array(12).fill(2) },
             'Forecast Accuracy': { actual: [85.0, 84.5, 84.0, 83.5, 83.0, 82.5, 82.7, 82.9, 82.9, null, null, null], trend: [85.5, 84.8, 84.1, 83.4, 82.7, 82.0, 81.3, 80.6, 80.6, null, null, null], prediction: [null, null, null, null, null, 82.9, 82.5, 82.1, 81.7, 81.3, 80.9, 80.5], goal: Array(12).fill(90) },
        }
    },
    quarterly: {
        labels: ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26'],
         datasets: {
            'OTIF': { actual: [93.2, 91.8, 90.1, 89.2, 88.5, 87.8, 87.2, null, null], trend: [93.0, 90.5, 88.0, 85.5, 83.0, 80.5, 78.0, null, null], prediction: [null, null, null, null, null, 83.6, 82.8, 82.0, 81.2], goal: Array(9).fill(95) },
            'Stock Out Rate': { actual: [1.8, 2.4, 3.2, 3.8, 4.2, 4.5, 4.8, null, null], trend: [1.9, 2.8, 3.7, 4.6, 5.5, 6.4, 7.3, null, null], prediction: [null, null, null, null, null, 7.1, 7.6, 8.1, 8.6], goal: Array(9).fill(2) },
            'Supplier OTD': { actual: [88.2, 89.1, 90.2, 90.8, 91.2, 91.4, 91.5, null, null], trend: [88.0, 90.0, 92.0, 94.0, 96.0, 98.0, 100.0, null, null], prediction: [null, null, null, null, null, 94.6, 95.3, 96.0, 96.7], goal: Array(9).fill(98) },
            'Lead Time': { actual: [15.2, 14.1, 13.2, 12.8, 12.5, 12.4, 12.3, null, null], trend: [15.5, 14.0, 12.5, 11.0, 9.5, 8.0, 6.5, null, null], prediction: [null, null, null, null, null, 10.0, 9.5, 9.0, 8.5], goal: Array(9).fill(8) },
            'Cost Per Unit': { actual: [23.2, 23.6, 24.0, 24.2, 24.4, 24.5, 24.5, null, null], trend: [23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, null, null], prediction: [null, null, null, null, null, 26.3, 26.7, 27.1, 27.5], goal: Array(9).fill(22) },
            // Add dummy data for other KPIs
             'Inventory Turnover': { actual: [10.5, 10.0, 9.5, 9.0, 8.5, 8.0, 8.2, null, null], trend: [11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 8.0, null, null], prediction: [null, null, null, null, null, 7.3, 7.0, 6.7, 6.4], goal: Array(9).fill(12) },
             'Quality Score': { actual: [91.5, 92.2, 92.9, 93.5, 94.0, 94.2, 94.1, null, null], trend: [91.0, 92.0, 93.0, 94.0, 95.0, 96.0, 97.0, null, null], prediction: [null, null, null, null, null, 95.9, 96.3, 96.7, 97.1], goal: Array(9).fill(98) },
             'Customer Satisfaction': { actual: [90.0, 89.0, 88.0, 87.0, 86.5, 86.0, 86.3, null, null], trend: [90.5, 89.5, 88.5, 87.5, 86.5, 85.5, 84.5, null, null], prediction: [null, null, null, null, null, 84.5, 84.0, 83.5, 83.0], goal: Array(9).fill(90) },
             'Production Efficiency': { actual: [74.0, 75.5, 76.8, 77.5, 78.2, 78.8, 78.9, null, null], trend: [73.0, 75.0, 77.0, 79.0, 81.0, 83.0, 85.0, null, null], prediction: [null, null, null, null, null, 82.2, 83.0, 83.8, 84.6], goal: Array(9).fill(85) },
             'Warehouse Utilization': { actual: [87.0, 88.0, 89.0, 90.0, 90.8, 91.5, 92.0, null, null], trend: [86.0, 87.5, 89.0, 90.5, 92.0, 93.5, 95.0, null, null], prediction: [null, null, null, null, null, 94.6, 95.2, 95.8, 96.4], goal: Array(9).fill(88) },
             'Return Rate': { actual: [4.0, 3.8, 3.6, 3.4, 3.2, 3.1, 3.2, null, null], trend: [4.2, 4.0, 3.8, 3.6, 3.4, 3.2, 3.0, null, null], prediction: [null, null, null, null, null, 2.8, 2.7, 2.6, 2.5], goal: Array(9).fill(2) },
             'Forecast Accuracy': { actual: [87.0, 86.0, 85.0, 84.0, 83.5, 83.0, 82.7, null, null], trend: [87.5, 86.5, 85.5, 84.5, 83.5, 82.5, 81.5, null, null], prediction: [null, null, null, null, null, 80.5, 80.0, 79.5, 79.0], goal: Array(9).fill(90) },
        }
    }
};

// ========== GLOBAL STATE (Original Dashboard) ==========
let selectedKPIs = new Set();
let selectedTrajectory = null;
let allSelected = false;
let showAllKPIs = false; // Controls showing all vs. underperforming KPIs
let showAllTradeoffs = false; // Controls showing all tradeoffs in details panel
let showAllContext = false; // Controls showing all context impacts in details panel
let currentKPIDetail = null; // Name of the KPI being viewed in detail
let currentTimeRange = 'weekly'; // Default time range for charts
let kpiChart = null; // Chart.js instance for KPI detail
let breadcrumbPath = []; // For navigating back from KPI detail
let currentImpactTimeRange = 'weekly'; // Time range for tradeoff modal
let currentImpactLevel = 'enterprise'; // Level for tradeoff modal

// ========== INITIALIZATION ==========
let simInitialized = false; // Flag to prevent multiple initializations

document.addEventListener('DOMContentLoaded', function() {
    populateCurrentKPIs();
    populateNewsCards();
    if (document.getElementById('kanban-view-ctrl')) initCtrl(); // Check if control agent elements exist
    
    // Initialize Simulation only once
    // Initialize Workflow Studio
    if (typeof populateWorkflowFilters === 'function') {
        populateWorkflowFilters();
    }
    if (typeof renderWorkflowTable === 'function') {
        renderWorkflowTable();
    }
    
    if (!simInitialized && typeof simInitializeApp === 'function' && document.getElementById('simulation-dashboard')) { // Check if sim elements exist
        simInitializeApp();
        simInitialized = true;
    }

    // Set initial expanded section
     expandSection('critical-issues-section');
});

// ========== TAB SWITCHING ==========
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active')); // Deselect all main tabs
    
    const activeContent = document.getElementById(tabName);
    if (activeContent) activeContent.classList.add('active');
    
    // Find the corresponding button for the main tab and activate it
    const activeTabButton = document.querySelector(`.nav-tabs .tab-item[onclick*="switchTab('${tabName}')"]`);
    if (activeTabButton) activeTabButton.classList.add('active');

    // If switching TO planning agent, ensure its first sub-tab is active
    if (tabName === 'planning-agent') {
        const firstSubTabButton = document.querySelector('#planning-agent .sub-tab-item');
        if (firstSubTabButton) { // Add safety check
            const firstSubTabContentId = firstSubTabButton.getAttribute('onclick').match(/'([^']+)'/)[1];
            switchSubTab(firstSubTabContentId, firstSubTabButton); // Pass the button element
        }
    }
    // Handle Improvement Agent first sub-tab activation
    if (tabName === 'improvement-agent') {
        const firstSubTabButton = document.querySelector('#improvement-agent .sub-tab-item');
         if (firstSubTabButton) { // Add safety check
            const firstSubTabContentId = firstSubTabButton.getAttribute('onclick').match(/'([^']+)'/)[1];
            switchSubTab(firstSubTabContentId, firstSubTabButton); // Pass the button element
         }
    }

    // Handle Summary first sub-tab activation
    if (tabName === 'summary') {
        const firstSubTabButton = document.querySelector('#summary .sub-tab-item');
         if (firstSubTabButton) {
            const firstSubTabContentId = firstSubTabButton.getAttribute('onclick').match(/'([^']+)'/)[1];
            switchSummarySubTab(firstSubTabContentId, firstSubTabButton);
         }
    }
}


/* ============================================================================
   CONTROL AGENT SUB-TAB SWITCHING
   ============================================================================ */

function switchCtrlSubTab(subTabId) {
    console.log('Switching to:', subTabId);

    // Hide all sub-contents
    const allContents = document.querySelectorAll('.ctrl-sub-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // Deactivate all buttons
    const allButtons = document.querySelectorAll('.ctrl-sub-tab-item');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected content
    const selectedContent = document.getElementById(
        subTabId === 'action-tracker' ? 'action-tracker' : 'workflow-studio-ctrl'
    );

    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Activate clicked button
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
}



function switchSummarySubTab(subTabId, button) {
    // Hide all sub-tab contents within #summary
    document.querySelectorAll('#summary .sub-tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    // Remove active class from all sub-tab items within #summary
    document.querySelectorAll('#summary .sub-tab-item').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected sub-tab content
    const selectedSubTab = document.getElementById(subTabId);
    if (selectedSubTab) {
        selectedSubTab.classList.add('active');
        selectedSubTab.style.display = 'flex';
    }

    // Activate the clicked sub-tab button
    if (button) {
        button.classList.add('active');
    }
}

function switchSubTab(subTabName, button) {
    // Hide all sub-tab contents
    document.querySelectorAll('#planning-agent .sub-tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; // Ensure it's hidden
    });

    // Remove active class from all sub-tab items
    document.querySelectorAll('#planning-agent .sub-tab-item').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected sub-tab content
    const selectedSubTab = document.getElementById(subTabName);
    if (selectedSubTab) {
        selectedSubTab.classList.add('active');
        selectedSubTab.style.display = 'flex'; // Ensure it's shown
    }

    // Activate the clicked sub-tab button
    if (button) {
        button.classList.add('active');
    }
}


// ========== SUMMARY SECTION/TAB FUNCTIONALITY ==========
function toggleSection(sectionId) {
    const header = document.getElementById(sectionId);
    const content = document.getElementById(sectionId.replace('-section', '-content'));
    const icon = header.querySelector('.expand-icon');

    if (header && content && icon) {
        const isExpanded = content.classList.toggle('expanded');
        header.classList.toggle('expanded', isExpanded);
        icon.textContent = isExpanded ? '▲' : '▼'; // Change icon based on state
    }
}

function expandSection(sectionId) {
    const header = document.getElementById(sectionId);
    const content = document.getElementById(sectionId.replace('-section', '-content'));
     const icon = header?.querySelector('.expand-icon');

    if (header && content && icon) {
        if (!content.classList.contains('expanded')) {
            content.classList.add('expanded');
            header.classList.add('expanded');
            icon.textContent = '▲';
        }
    }
}


function explainSummaryItem(itemType, element) {
    // Visual feedback
    document.querySelectorAll('.insight-card.selected').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected'); // Add a 'selected' class for styling

    let explanation = '';
    switch(itemType) {
         case 'stockout-crisis':
            explanation = `<b>Stock Out Rate Crisis (4.8% vs 2% Target):</b><br>
                <b>Root Cause:</b> <br> Primarily driven by inaccurate demand forecasts (82.7% vs 90% target) and unreliable supplier deliveries (91.5% OTD).<br>
                <b>Impact:</b> <br> Estimated $280K/month in lost sales. Significant negative impact on OTIF (87.2%). Customer satisfaction declining.<br>
                <b>Action:</b> <br> Prioritize TKT-001. Implement emergency buffer stock for critical items. Expedite review of forecasting models and supplier performance agreements.`;
            break;
        case 'otif-decline':
            explanation = `<b>OTIF Delivery Decline (87.2% vs 95% Target):</b><br>
                <b>Root Cause:</b> <br> Combination of high stock-out rates (4.8%) and extended lead times (12.3 days). Logistics bottlenecks also contribute.<br>
                <b>Impact:</b> <br> Risk to customer retention - 3 major contracts under review. Increased expedited shipping costs ($45K/month).<br>
                <b>Action:</b> <br> Address root causes via TKT-001 (Stockouts) and TKT-003 (Lead Time). Initiate proactive communication with key customers regarding recovery plan.`;
            break;
        case 'cost-overrun':
            explanation = `<b>Cost Per Unit Overrun ($24.50 vs $22 Target):</b><br>
                <b>Root Cause:</b> <br> Driven by raw material inflation (+8% vs budget), increased labor costs, and energy price volatility. Production inefficiencies (78.9% efficiency) also play a role.<br>
                <b>Impact:</b> <br> 3.2% compression in gross margin. Reduced price competitiveness.<br>
                <b>Action:</b> <br> Prioritize TKT-004 (Cost Reduction). Accelerate lean manufacturing initiatives. Renegotiate with material suppliers or explore alternatives. Evaluate automation opportunities.`;
            break;
        case 'lead-time-delay':
            explanation = `<b>Extended Lead Times (12.3 days vs 8 Target):</b><br>
                <b>Root Cause:</b> <br> Supplier processing delays, international shipping complexities (customs, documentation), and internal quality inspection times. Supplier OTD (91.5%) is a major factor.<br>
                <b>Impact:</b> <br> Slows time-to-market. Increases need for expedited shipping ($45K/month). Contributes to stock-outs.<br>
                <b>Action:</b> <br> Prioritize TKT-003. Implement supplier collaboration platform for better visibility. Explore regional inventory hubs. Streamline internal order processing and inspection.`;
            break;
        case 'production-efficiency':
            explanation = `<b>Production Efficiency Gain (78.9%, Trend +2.3%):</b><br>
                <b>Status:</b> <br> Approaching 85% target due to recent equipment modernization and lean initiatives.<br>
                <b>Opportunity:</b> <br> Reaching the 85% target could yield ~$180K/month in savings.<br>
                <b>Action:</b> <br> Identify and replicate best practices from top-performing plants (Plant B: 82.6%, Plant D: 86.8%). Continue targeted automation investments.`;
            break;
        case 'warehouse-optimization':
            explanation = `<b>Warehouse Capacity Utilization (92.1% vs 88% Target):</b><br>
                <b>Status:</b> <br> Excellent performance driven by automation and optimized workflows.<br>
                <b>Opportunity:</b> <br> Current efficiency provides capacity buffer for ~15% volume growth without major investment. Supports readiness for Q4 demand surge.<br>
                <b>Action:</b> <br> Document and standardize successful processes. Explore application to other facilities. Monitor for potential over-utilization risks.`;
            break;
        case 'market-recovery':
            explanation = `<b>Market Recovery Trends (Tech/Energy +8%):</b><br>
                <b>Status:</b> <br> Positive market signals with strong Q4 demand forecast (+12-15%).<br>
                <b>Opportunity:</b> <br> Significant potential to gain market share if operational challenges (OTIF, Cost) are addressed.<br>
                <b>Action:</b> <br> Align production & inventory planning with forecast. Ensure supplier capacity. Marketing/Sales to prepare aggressive Q4 campaigns.`;
            break;
        case 'supplier-performance':
             explanation = `<b>Supplier OTD Improvement (91.5%, Trend +1.2%):</b><br>
                <b>Status:</b> <br> Performance improving due to new vendor program, but still below 98% target. Bottom quartile suppliers (87% OTD) are dragging down the average.<br>
                <b>Risk:</b> <br> Geographic concentration in Asia remains a vulnerability.<br>
                <b>Action:</b> <br> Focus supplier development efforts on bottom quartile. Continue diversification strategy. Implement stricter performance clauses in contracts for critical suppliers. Prioritize TKT-002.`;
            break;
        case 'action-expedite':
             explanation = `<b>Expedite Raw Material Order (Urgent):</b><br>
                <b>Context:</b> <br> Line 3 production at risk due to raw material shortage.<br>
                <b>Impact:</b> <br> Potential 4-hour stoppage affecting 20% of daily output.<br>
                <b>Action:</b> <br> Contact supplier for expedited air freight. Approval pre-authorized for up to $2k.`;
            break;
        case 'action-schedule':
             explanation = `<b>Review Shift Schedule (Moderate):</b><br>
                <b>Context:</b> <br> Weekend shift is currently understaffed by 2 operators.<br>
                <b>Impact:</b> <br> Risk of overtime costs exceeding budget by 15%.<br>
                <b>Action:</b> <br> Request voluntary overtime from weekday crew or authorize agency staff.`;
            break;
        case 'action-maintenance':
             explanation = `<b>Approve Maintenance Request (Moderate):</b><br>
                <b>Context:</b> <br> Forklift #4 requires hydraulic system repair.<br>
                <b>Impact:</b> <br> Warehouse picking efficiency reduced by 5% until fixed.<br>
                <b>Action:</b> <br> Approve work order WO-492. est cost $450. Repair scheduled for tonight.`;
             break;
        case 'action-guidelines':
             explanation = `<b>Update Safety Guidelines (Low):</b><br>
                 <b>Context:</b> <br> Q4 safety protocols require quarterly review and sign-off.<br>
                 <b>Impact:</b> <br> Mandatory compliance requirement for ISO certification.<br>
                 <b>Action:</b> <br> Assign to Safety Officer. Deadline: End of month.`;
             break;
        default:
            explanation = 'Analysis for this item is not yet configured.';
    }
    addSummaryChatMessage('assistant', explanation);
}

function addSummaryChatMessage(role, content) {
    const messagesContainer = document.getElementById('summary-chat-messages');
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        // Use textContent for user message, innerHTML for assistant (allows basic formatting)
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        if (role === 'user') {
            bubble.textContent = content;
        } else {
             bubble.innerHTML = content.replace(/\n/g, '<br>'); // Sanitize if necessary in real app
        }
        messageDiv.appendChild(bubble);

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function handleSummaryChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendSummaryChatMessage();
    }
}

function sendSummaryChatMessage() {
    const input = document.querySelector('#summary .chat-input-field');
    const message = input.value.trim();
    if (!message) return;

    addSummaryChatMessage('user', message);
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const response = generateSummaryAIResponse(message);
        addSummaryChatMessage('assistant', response);
    }, 800);
}

function generateSummaryAIResponse(message) {
     const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('stock out') || lowerMessage.includes('inventory')) {
        return "The Stock Out Rate is currently critical at 4.8% against a 2% target. This is primarily due to forecast inaccuracies (82.7%) and supplier delays (91.5% OTD), leading to an estimated $280K monthly loss. Would you like to see the detailed root cause analysis from the Planning Agent?";
    }
    if (lowerMessage.includes('otif') || lowerMessage.includes('delivery')) {
        return "OTIF performance has declined to 87.2% (target 95%), mainly because of the stock-out issues and extended lead times (12.3 days). This is putting 3 major customer contracts at risk. Addressing the underlying inventory and supplier issues is key.";
    }
    if (lowerMessage.includes('cost') || lowerMessage.includes('unit price')) {
        return "Cost Per Unit is $24.50, which is 11% above the $22 target. Key drivers are material inflation, labor costs, and energy prices. While production efficiency is improving (78.9%), more action is needed. See TKT-004 for cost reduction initiatives.";
    }
     if (lowerMessage.includes('opportunity') || lowerMessage.includes('potential')) {
        return "Key opportunities include leveraging the improving Production Efficiency (currently 78.9%) for potential $180K/month savings, utilizing the high Warehouse Capacity (92.1%) to support growth, and capturing share in the recovering market (+8% sector growth).";
    }

    // Generic fallback
    const responses = [
        "I can provide details on the critical issues like Stock Outs (4.8%) or OTIF decline (87.2%), or discuss opportunities like Production Efficiency gains. What specific area interests you?",
        "The overall Supply Chain Health is 'Critical' primarily due to OTIF and Stock Out Rate performance. However, there are positive trends in Production Efficiency and Warehouse Utilization.",
        "Let me check the data for that... Can you specify which KPI or issue you're asking about?",
        "I have access to performance data, root cause analyses, and recommended actions. How can I assist you further?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}


// ========== KPI GRID & DETAIL (Analytics Studio) ==========
function populateCurrentKPIs() {
    const grid = document.getElementById('current-kpis');
    if (!grid) return;

    const kpisToShow = showAllKPIs
        ? Object.keys(kpiData)
        : Object.keys(kpiData).filter(name => {
              const d = kpiData[name];
              // Determine if KPI is *not* meeting target
              const isMeetingTarget = (name === 'Stock Out Rate' || name === 'Return Rate' || name === 'Cost Per Unit' || name === 'Lead Time')
                  ? d.current <= d.target // Lower is better for these
                  : d.current >= d.target; // Higher is better for others
              return !isMeetingTarget; // Only show those NOT meeting target
          });

    grid.innerHTML = kpisToShow
        .map(name => {
            const d          = kpiData[name];
             const isMeetingTarget = (name === 'Stock Out Rate' || name === 'Return Rate' || name === 'Cost Per Unit' || name === 'Lead Time')
                  ? d.current <= d.target
                  : d.current >= d.target;
            const changeUp   = d.change >= 0; // Raw change direction
            // Trend color depends on KPI type
             const trendPositive = (name === 'Stock Out Rate' || name === 'Return Rate' || name === 'Cost Per Unit' || name === 'Lead Time')
                  ? d.change <= 0 // Negative change is positive for these KPIs
                  : d.change >= 0; // Positive change is positive for others
            const selected   = selectedKPIs.has(name) ? 'selected' : '';
            const safeId     = name.replace(/\s+/g, '-').replace(/[^\w-]/g, '');

            return `
            <div class="kpi-card ${isMeetingTarget ? 'met' : 'not-met'} ${selected}" onclick="showKPIDetail('${name}')">
                 <div class="kpi-checkbox-container">
                    <input type="checkbox"
                           id="checkbox-${safeId}"
                           class="kpi-checkbox"
                           ${selected ? 'checked' : ''}
                           onchange="handleKPICheckboxChange('${name}', this)"
                           onclick="event.stopPropagation()">
                </div>
                <div class="kpi-header">
                    <div class="kpi-title">${name}</div>
                </div>
                <div class="kpi-value-container">
                    <div class="kpi-value">${d.current}${d.unit}</div>
                    <div class="kpi-status ${isMeetingTarget ? 'status-met' : 'status-not-met'}">
                        ${isMeetingTarget ? 'On Target' : 'Below Target'}
                    </div>
                </div>
                <div class="kpi-target">Target: ${d.target}${d.unit}</div>
                <div class="kpi-change ${trendPositive ? 'change-positive' : 'change-negative'}">
                    ${trendPositive ? '▲' : '▼'} ${Math.abs(d.change)}${d.unit === '%' || d.unit ==='x' ? '' : d.unit} ${d.unit === '%' || d.unit ==='x' ? d.unit : ''}
                </div>
            </div>`;
        })
        .join('');

    // Update 'Show All' button text
    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
        showAllBtn.textContent = showAllKPIs ? 'Show Under-performing' : `Show All (${Object.keys(kpiData).length})`;
    }
     // Update 'Select All' button state
    updateSelectAllButtonState();
}


function toggleShowAllKPIs() {
    showAllKPIs = !showAllKPIs;
    // Clear selections when toggling view? Optional, but can prevent confusion.
    // selectedKPIs.clear();
    populateCurrentKPIs();
}

function handleKPICheckboxChange(kpiName, checkbox) {
    const card = checkbox.closest('.kpi-card');
    if (checkbox.checked) {
         if (selectedKPIs.size >= 4) {
            checkbox.checked = false; // Prevent checking more than 4
            addChatMessage('assistant', "You can select a maximum of 4 KPIs for optimization.");
            return;
        }
        selectedKPIs.add(kpiName);
        card.classList.add('selected');
    } else {
        selectedKPIs.delete(kpiName);
        card.classList.remove('selected');
    }
     updateSelectAllButtonState();
    // Maybe trigger an AI explanation when selected/deselected?
    // explainKPISelection();
}

function updateSelectAllButtonState() {
     const selectAllBtn = document.getElementById('selectAllBtn');
    const visibleCheckboxes = document.querySelectorAll('#current-kpis .kpi-checkbox');
    const allVisibleSelected = visibleCheckboxes.length > 0 && selectedKPIs.size >= visibleCheckboxes.length && Array.from(visibleCheckboxes).every(cb => cb.checked);

    if (selectAllBtn) {
        selectAllBtn.textContent = allVisibleSelected ? 'Deselect All' : 'Select All';
    }
}

function toggleSelectAll() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const visibleCheckboxes = document.querySelectorAll('#current-kpis .kpi-checkbox');
    const currentlySelectingAll = selectAllBtn.textContent === 'Select All'; // Determine action based on current text

    let currentSelectionCount = selectedKPIs.size;

    visibleCheckboxes.forEach(checkbox => {
        const kpiName = checkbox.id.replace('checkbox-', '').replace(/-/g, ' '); // Reconstruct KPI name (adjust if needed)
        const card = checkbox.closest('.kpi-card');

        if (currentlySelectingAll) {
             if (currentSelectionCount < 4) {
                if (!checkbox.checked) {
                    checkbox.checked = true;
                    selectedKPIs.add(kpiName);
                    card.classList.add('selected');
                    currentSelectionCount++;
                }
             } else {
                 // Stop selecting if limit reached
                 if (currentSelectionCount === 4) { // Show message only once
                     addChatMessage('assistant', "Selection limited to 4 KPIs for optimization.");
                      currentSelectionCount++; // Prevent message spam
                 }
             }
        } else { // Deselecting all visible
            if (checkbox.checked) {
                checkbox.checked = false;
                selectedKPIs.delete(kpiName);
                card.classList.remove('selected');
            }
        }
    });

     updateSelectAllButtonState(); // Update button text after operation
}


function showKPIDetail(kpiName) {
    currentKPIDetail = kpiName; // Store the currently viewed KPI
    const data = kpiData[kpiName];
    const detailData = kpiDetailData[kpiName];

    if (!data || !detailData) {
        console.error("KPI data or detail data not found for:", kpiName);
        return;
    }

    // Switch views
    document.getElementById('kpi-grid-view').style.display = 'none';
    document.getElementById('kpi-detail-view').style.display = 'grid'; // Use grid for 2-column layout

    // Update breadcrumb
    updateBreadcrumbPath(kpiName);

    // Populate detail panel
    loadKPIDetailInMainPanel(kpiName);

     // Make sure related KPIs are populated for the current detail view
    populateRelatedKPIs(kpiName);
}

function showKPIGrid() {
    document.getElementById('kpi-detail-view').style.display = 'none';
    document.getElementById('kpi-grid-view').style.display = 'block'; // Or 'grid' if it's a grid
    document.getElementById('breadcrumb-nav').style.display = 'none';
    currentKPIDetail = null; // Clear the currently viewed KPI

    // Destroy chart if it exists to free resources
    if (kpiChart) {
        kpiChart.destroy();
        kpiChart = null;
    }
}

function updateBreadcrumbPath(kpiName) {
    const nav = document.getElementById('breadcrumb-nav');
    if (!nav) return;
    nav.style.display = 'flex'; // Show breadcrumb

    // Clear previous breadcrumbs except the "Back" button
    nav.innerHTML = `
        <button class="breadcrumb-btn" onclick="showKPIGrid()">← Back to KPIs</button>
        <span class="breadcrumb-divider">/</span>
        <span class="breadcrumb-current">${kpiName}</span>`;
}


function loadKPIDetailInMainPanel(kpiName) {
    const data = kpiData[kpiName];
    const detailData = kpiDetailData[kpiName]; // Assuming kpiDetailData holds the extra info

    if (!data || !detailData) return;

    // --- Populate Header Info ---
    document.getElementById('kpi-detail-title-inline').textContent = detailData.name || kpiName;
    document.getElementById('kpi-detail-value-inline').textContent = `${data.current}${data.unit}`;
    document.getElementById('kpi-detail-goal-inline').textContent = `${data.target}${data.unit}`;
    document.getElementById('kpi-detail-trend-inline').textContent = `${data.change >= 0 ? '+' : ''}${data.change}${data.unit === '%' ? '%' : ''}`; // Assuming change is percentage

     const isMeetingTarget = (name === 'Stock Out Rate' || name === 'Return Rate' || name === 'Cost Per Unit' || name === 'Lead Time')
        ? data.current <= data.target
        : data.current >= data.target;
    const statusElement = document.getElementById('kpi-detail-status-inline');
    statusElement.textContent = isMeetingTarget ? 'On Target' : 'Below Target';
    statusElement.className = `kpi-detail-status ${isMeetingTarget ? 'status-met' : 'status-not-met'}`;

    // --- Time Range & Chart ---
    currentTimeRange = 'weekly'; // Reset to default when loading new KPI
    document.querySelectorAll('#kpi-detail-view .time-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === 0); // Activate 'Weekly' button
    });
    createKPIChartInline(kpiName, currentTimeRange);

    // --- Contributors ---
    populateContributorsInline(detailData.contributors);

    // --- Root Cause & Recommendations ---
     const rootCauseEl = document.getElementById('root-cause-content-inline');
    if (rootCauseEl) rootCauseEl.innerHTML = bulletizeText(detailData.rootCause); // Use bulletizeText

    populateRecommendationsCards(detailData.recommendations); // Populate recommendations

    // Force vertical layout for analysis section if needed (handled by CSS now, but kept for potential override)
    // forceVerticalLayout();

    // --- Related KPIs ---
    // This is populated when the detail view is shown via showKPIDetail
     populateRelatedKPIs(kpiName);
}

function populateContributorsInline(contributors) {
    const positiveContainer = document.getElementById('positive-contributors-inline');
    const negativeContainer = document.getElementById('negative-contributors-inline');

    if (!contributors) {
        if (positiveContainer) positiveContainer.innerHTML = '<li>No significant positive drivers identified.</li>';
        if (negativeContainer) negativeContainer.innerHTML = '<li>No significant negative drivers identified.</li>';
        return;
    }

    const generateHtml = (items, type) => {
        if (!items || items.length === 0) {
            return `<li>No significant ${type} drivers identified.</li>`;
        }
        return items.map(c => `
            <div class="contributor-item ${type === 'positive' ? 'positive' : 'negative'}">
                <div class="contributor-name">${c.name}</div>
                <div class="contributor-impact">Est. Impact: ${c.impact}</div>
                <div class="contributor-deviation ${type === 'positive' ? 'positive' : 'negative'}">Change: ${c.deviation}</div>
            </div>`).join('');
    };

    if (positiveContainer) {
        positiveContainer.innerHTML = generateHtml(contributors.positive, 'positive');
    }
    if (negativeContainer) {
        negativeContainer.innerHTML = generateHtml(contributors.negative, 'negative');
    }
}


function bulletizeText(text) {
    if (!text || typeof text !== 'string') return '<p>No analysis available.</p>';

    // Attempt to detect numbered lists like "1) text..." or "1. text..."
     const numberedListRegex = /(\d+[\.\)]\s+)/;
     const parts = text.split(numberedListRegex).filter(part => part && !numberedListRegex.test(part.trim())); // Split and remove number/symbol

    if (parts.length > 1) {
        // Assume it's a list if multiple parts are found after splitting by number/symbol
        return '<ul>' + parts.map(point => `<li>${point.trim()}</li>`).join('') + '</ul>';
    } else {
        // Fallback: Split by sentences (period followed by space/end) and create bullet points
        const sentences = text.split(/\.\s*(?=[A-Z])|\.$/).filter(s => s.trim()); // Split by ". " followed by capital or end "."
        if (sentences.length > 1) {
            return '<ul>' + sentences.map(sentence => `<li>${sentence.trim()}.</li>`).join('') + '</ul>';
        } else {
            // If only one sentence or part, return as a paragraph
            return `<p>${text}</p>`;
        }
    }
}

function createKPIChartInline(kpiName, timeRange) {
    const canvas = document.getElementById('kpi-trend-chart-inline');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (kpiChart) {
        kpiChart.destroy(); // Destroy previous chart instance
    }

    const timeData = timeSeriesData[timeRange];
    const kpiDatasets = timeData?.datasets[kpiName];

    if (!timeData || !kpiDatasets) {
        // Optionally display a message on the canvas or console log
        console.warn(`No chart data available for ${kpiName} in ${timeRange} range.`);
         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
         ctx.fillStyle = '#6c757d'; // Medium gray
         ctx.textAlign = 'center';
         ctx.fillText(`No data available for ${timeRange} view.`, canvas.width / 2, canvas.height / 2);
        return;
    }

kpiChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeData.labels,
        datasets: [
            {
                label: 'Actual',
                data: kpiDatasets.actual,
                borderColor: '#0099ffab',                  // Bright Blue
                backgroundColor: 'rgba(26,140,184,0.10)', // soft fill
                borderWidth: 3,
                fill: false,
                tension: 0.1,
                pointRadius: 3,
                pointHoverRadius: 5,
                spanGaps: false
            },
            {
                label: 'Target',
                data: kpiDatasets.goal,
                borderColor: '#00FFFF',                  // Cyan / Aqua
                backgroundColor: 'rgba(135,115,117,0.06)',
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                tension: 0.1,
                pointRadius: 0,
                spanGaps: false
            },
            {
                label: 'Trend',
                data: kpiDatasets.trend,
                borderColor: '#ff00ffa9',                  // Magenta
                backgroundColor: 'rgba(98,63,186,0.06)',
                borderWidth: 3,
                borderDash: [2, 2],
                fill: false,
                tension: 0.1,
                pointRadius: 0,
                spanGaps: false
            },
            {
                label: 'Prediction',
                data: kpiDatasets.prediction,
                borderColor: '#f59e0b',                  // Violet
                backgroundColor: 'rgba(245,158,11,0.06)',
                borderWidth: 3,
                borderDash: [8, 4],                      // Distinct dash pattern
                fill: false,
                tension: 0.1,
                pointRadius: 2,
                pointHoverRadius: 4,
                spanGaps: false
            }
        ]
    },
        options: {
            responsive: true,
            maintainAspectRatio: false,
             plugins: {
                 legend: {
                     position: 'bottom', // Move legend to bottom
                     labels: { padding: 20 }
                 },
                 tooltip: {
                     mode: 'index',
                     intersect: false,
                 }
             },
             scales: {
                 y: {
                     beginAtZero: false, // Don't force start at zero if values are high
                     grid: { display: false },
                     ticks: {
                        // Dynamically add unit if available
                        callback: function(value, index, values) {
                            return value + (kpiData[kpiName]?.unit || '');
                        }
                    }
                 },
                 x: {
                      grid: { display: false }
                 }
            },
             hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}


function selectTimeRange(range, buttonElement) {
    currentTimeRange = range;

    // Update button active states
    document.querySelectorAll('#kpi-detail-view .time-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // Re-create the chart with the new time range
    if (currentKPIDetail) {
        createKPIChartInline(currentKPIDetail, range);
    }
}


// ========== RELATED KPIs (Analytics Studio Detail View) ==========

function populateRelatedKPIs(kpiName) {
    const container = document.getElementById('related-kpi-cards');
    if (!container) return;

    // Basic correlation logic (replace with real logic)
    const correlations = {
        'OTIF': ['Stock Out Rate', 'Supplier OTD', 'Lead Time', 'Customer Satisfaction'],
        'Stock Out Rate': ['OTIF', 'Forecast Accuracy', 'Inventory Turnover', 'Supplier OTD'],
        'Cost Per Unit': ['Production Efficiency', 'Raw Material Prices (External)', 'Labor Cost (External)'],
         'Lead Time': ['Supplier OTD', 'OTIF', 'Transportation Time (External)'],
         'Supplier OTD': ['OTIF', 'Lead Time', 'Stock Out Rate'],
         // Add more correlations as needed
    };

    const relatedKeys = correlations[kpiName] || Object.keys(kpiData).filter(k => k !== kpiName).slice(0, 4); // Fallback to first 4 others

    container.innerHTML = relatedKeys.filter(key => kpiData[key]) // Ensure related KPI exists in data
        .map(relatedKpiName => {
            const data = kpiData[relatedKpiName];
            const isMeetingTarget = (relatedKpiName === 'Stock Out Rate' || relatedKpiName === 'Return Rate' || relatedKpiName === 'Cost Per Unit' || relatedKpiName === 'Lead Time')
                ? data.current <= data.target
                : data.current >= data.target;
             const trendPositive = (relatedKpiName === 'Stock Out Rate' || relatedKpiName === 'Return Rate' || relatedKpiName === 'Cost Per Unit' || relatedKpiName === 'Lead Time')
                  ? data.change <= 0
                  : data.change >= 0;
            // FIX: Ensure 'd' is defined, should be 'data'
            const d = data; 
            return `
            <div class="related-kpi-card ${isMeetingTarget ? 'met' : 'not-met'}" onclick="showRelatedKPIDetail('${relatedKpiName}')">
                <div class="kpi-card-header">
                    <div class="kpi-card-title">${relatedKpiName}</div>
                </div>
                <div class="kpi-card-value-container">
                    <div class="kpi-card-value">${data.current}${data.unit}</div>
                    <div class="kpi-card-status ${isMeetingTarget ? 'status-met' : 'status-not-met'}">
                        ${isMeetingTarget ? 'On Target' : 'Below Target'}
                    </div>
                </div>
                <div class="kpi-card-target">Target: ${data.target}${data.unit}</div>
                 <div class="kpi-card-change ${trendPositive ? 'change-positive' : 'change-negative'}">
                    <span class="kpi-card-change-icon">${trendPositive ? '▲' : '▼'}</span>
                     <span>${Math.abs(data.change)}${data.unit === '%' || data.unit ==='x' ? '' : data.unit} ${data.unit === '%' || data.unit ==='x' ? d.unit : ''}</span>
                 </div>
            </div>`;
        }).join('');
}

function showRelatedKPIDetail(kpiName) {
    // This function will switch the main detail view to the selected related KPI
    loadKPIDetailInMainPanel(kpiName); // Reload main panel with new KPI
    updateBreadcrumbPath(kpiName); // Update breadcrumb to show the new KPI
    populateRelatedKPIs(kpiName); // Refresh related KPIs based on the new main KPI
}


// ========== RECOMMENDATION CARDS & MODALS (Analytics Studio) ==========

function populateRecommendationsCards(recommendationsText) {
    const container = document.getElementById('recommendations-grid-inline');
    if (!container || !recommendationsText) {
         if(container) container.innerHTML = '<p>No specific recommendations available for this KPI.</p>';
        return;
    }

    let recommendationPoints = [];
    // Enhanced split logic
     const numberedSplit = recommendationsText.split(/(\d+[\.\)]\s+)/).filter(s => s.trim() && !/^\d+[\.\)]\s+$/.test(s.trim()));

    if (numberedSplit.length > 1) {
        recommendationPoints = numberedSplit.map(s => s.trim());
    } else {
        const sentenceSplit = recommendationsText.split(/\.\s*(?=[A-Z])|\.$/).filter(s => s.trim());
        if (sentenceSplit.length > 1) {
             recommendationPoints = sentenceSplit.map(s => s.endsWith('.') ? s.trim() : s.trim() + '.');
        } else {
            recommendationPoints = [recommendationsText]; // Treat as single recommendation
        }
    }


    container.innerHTML = recommendationPoints.map((recText, index) => {
        const safeText = recText.replace(/"/g, '&quot;').replace(/'/g, "&#39;"); // Make safe for attribute
        return `
            <div class="recommendation-card">
                <div class="recommendation-text">${recText}</div>
                <div class="recommendation-actions">
                    <button class="accept-btn" onclick="acceptRecommendation(${index}, '${safeText}')">Accept</button>
                    <button class="reject-btn" onclick="rejectRecommendation(${index}, '${safeText}')">Reject</button>
                </div>
            </div>
        `;
    }).join('');
}


let currentRecommendation = { index: null, text: '' }; // Store context

function acceptRecommendation(index, text) {
    currentRecommendation = { index, text };
    document.getElementById('acceptModalBackdrop').style.display = 'flex';
    // In a real app, you'd trigger ticket creation here or log acceptance
    console.log(`Accepted Recommendation ${index}: ${text}`);
     addChatMessage('assistant', `Recommendation accepted: "${text}". A ticket will be generated in the Control Agent view.`);
}

function rejectRecommendation(index, text) {
    currentRecommendation = { index, text };
    document.getElementById('rejectionReason').value = ''; // Clear previous reason
    document.getElementById('rejectModalBackdrop').style.display = 'flex';
    console.log(`Rejecting Recommendation ${index}: ${text}`);
}

function closeAcceptModal() {
    document.getElementById('acceptModalBackdrop').style.display = 'none';
}

function closeRejectModal() {
    document.getElementById('rejectModalBackdrop').style.display = 'none';
}

function submitRejection() {
    const reason = document.getElementById('rejectionReason').value.trim();
    if (!reason) {
        alert("Please provide a reason for rejection."); // Simple validation
        return;
    }
    console.log(`Rejected Recommendation ${currentRecommendation.index} with reason: ${reason}`);
    // Log the rejection reason, potentially send to backend
     addChatMessage('assistant', `Recommendation rejected: "${currentRecommendation.text}". Reason: "${reason}". Feedback logged.`);
    closeRejectModal();
}

// --- Discuss Modal ---
function addToDiscussion() {
    document.getElementById('discussModalBackdrop').style.display = 'flex';
}

function closeDiscussModal() {
    document.getElementById('discussModalBackdrop').style.display = 'none';
}

function confirmDiscuss() {
    closeDiscussModal();
    const kpiNameToDiscuss = currentKPIDetail || "the current analysis"; // Use specific KPI name if available
    addChatMessage('assistant', `Okay, initiating a discussion thread in Slack regarding ${kpiNameToDiscuss}...`);
    // Simulate Slack integration
    setTimeout(() => {
        addChatMessage('assistant', `Slack thread created! Please check your notifications.`);
    }, 1500);
}

// --- Set New Target Goal Modal ---
function showreviewModal() {
     if (selectedTrajectory === null) {
        addChatMessage('assistant', 'Please select an optimization trajectory before setting new goals based on it.');
        return;
    }
    // Simple confirmation for applying targets based on selected trajectory
    document.getElementById('reviewModalBackdrop').style.display = 'flex';
}

function closereviewModal() {
    document.getElementById('reviewModalBackdrop').style.display = 'none';
}

function confirmapply() {
    closereviewModal();
     applySelectedOptimization(); // Reuse the logic from the tradeoff modal apply button
    // Maybe navigate back to grid?
    // showKPIGrid();
}

// ========== OPTIMIZATION & TRAJECTORIES (Analytics Studio) ==========

function startOptimization() {
    if (selectedKPIs.size === 0 || selectedKPIs.size > 4) {
        addChatMessage('assistant', 'Please select between 1 and 4 KPIs to optimize.');
        return;
    }

    const optimizeBtn = document.getElementById('opt-btn');
    optimizeBtn.disabled = true;
    optimizeBtn.innerHTML = `<div class="loading"><div class="spinner"></div> Running Optimization...</div>`;
    addChatMessage('assistant', `Starting optimization for: ${Array.from(selectedKPIs).join(', ')}...`);

    // Simulate optimization process
    setTimeout(() => {
        document.getElementById('trajectory-panel').style.display = 'block'; // Show the panel
        populateTrajectories(); // Load trajectory cards
        optimizeBtn.disabled = false;
        optimizeBtn.innerHTML = 'Start Optimization';
        addChatMessage('assistant', 'Optimization complete! Found 4 potential trajectories. Select one below to see details and tradeoffs.');
    }, 2500);
}

function populateTrajectories() {
    const grid = document.getElementById('trajectory-grid');
    if (!grid) return;

    // Display all trajectories with smart KPI filtering
    grid.innerHTML = trajectoryData.map(traj => {
        // Validate selected KPIs against available KPIs in trajectory
        const availableKPIs = Object.keys(traj.details);
        const validSelectedKPIs = Array.from(selectedKPIs).filter(kpi => 
            availableKPIs.includes(kpi)
        );

        // Show all KPIs if none selected or no valid selections
        const kpisToShow = validSelectedKPIs.length === 0
            ? Object.entries(traj.details)
            : Object.entries(traj.details).filter(([kpiName]) => 
                validSelectedKPIs.includes(kpiName)
              );

        const miniKpisHTML = kpisToShow
            .map(([kpi, data]) => {
                const diff = data.optimized - data.current;
                const diffClass = diff >= 0 ? 'diff-positive' : 'diff-negative';
                const diffSymbol = diff >= 0 ? '+' : '';
                return `<div class="mini-kpi">${kpi}: ${data.optimized}${kpiData[kpi]?.unit || ''} (<span class="${diffClass}">${diffSymbol}${diff.toFixed(1)}</span>)</div>`;
            }).join('');

        // Add "Recommended" badge for Trajectory #3
        const recommendedBadge = traj.id === 3 
            ? '<span class="recommended-badge">✓ Recommended</span>' 
            : '';

        return `
        <div class="trajectory-card ${traj.id === 3 ? 'recommended' : ''}" id="traj-card-${traj.id}" onclick="selectTrajectory(event, ${traj.id})">
            <div class="trajectory-header">
                <div class="trajectory-number">Trajectory #${traj.id}</div>
                ${recommendedBadge}
            </div>
            <div class="trajectory-score">Overall Score: ${traj.score}</div>
            <div class="mini-kpis">
                ${miniKpisHTML}
            </div>
        </div>
        `;
    }).join('');

    // Reset selection styling
    selectedTrajectory = null;
    document.getElementById('trajectory-details').style.display = 'none';
}

function selectTrajectory(event, trajectoryId) {
    selectedTrajectory = trajectoryId;

    // Highlight selected card
    document.querySelectorAll('.trajectory-card').forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Show details for the selected trajectory
    showTrajectoryDetails(trajectoryId);
     explainTrajectory(trajectoryId); // Add AI explanation
}

function showTrajectoryDetails(id) {

    const trajectory = trajectoryData.find(t => t.id === id);
    if (!trajectory) {
        //*console.error('❌ Trajectory not found for ID:', id);
        return;
    }

    const detailsPanel = document.getElementById('trajectory-details');
    const detailContent = document.getElementById('trajectory-detail-content');

    if (!detailsPanel || !detailContent) {
        //*console.error('❌ Panel elements not found');
        return;
    }

    // IMPROVED LOGIC: Filter to only valid KPIs that exist in trajectory.details
    const availableKPIs = Object.keys(trajectory.details);
    const validSelectedKPIs = Array.from(selectedKPIs).filter(kpi => availableKPIs.includes(kpi));


    // Show ALL KPIs if none selected OR if no valid selections
    const filteredDetails = validSelectedKPIs.length === 0
        ? Object.entries(trajectory.details)  // Show all
        : Object.entries(trajectory.details).filter(([kpiName]) => validSelectedKPIs.includes(kpiName));

    // Generate table rows
    const kpiTableRows = filteredDetails.map(([kpi, data]) => {

        const diff = data.optimized - data.current;
        const diffClass = diff >= 0 ? 'diff-positive' : 'diff-negative';
        const diffSymbol = diff >= 0 ? '+' : '';
        const unit = kpiData[kpi]?.unit || '';

        return `
            <tr>
                <td><strong>${kpi}</strong></td>
                <td>${data.original}${unit}</td>
                <td>${data.current}${unit}</td>
                <td>${data.optimized}${unit}</td>
                <td class="${diffClass}">${diffSymbol}${diff.toFixed(1)}${unit}</td>
            </tr>
        `;
    }).join('');

    // Tradeoffs
    const tradeoffEntries = Object.entries(trajectory.tradeoffs);
    const tradeoffItemsToShow = showAllTradeoffs ? tradeoffEntries : tradeoffEntries.slice(0, 4);
    const tradeoffItems = tradeoffItemsToShow.map(([metric, data]) => {
        const changeClass = data.change.includes('+') ? 'diff-positive' : 'diff-negative';
        return `
            <div class="tradeoff-item" onclick="explainTradeoff('${metric}', '${JSON.stringify(data).replace(/"/g, '&quot;')}')">
                <div class="tradeoff-label">${metric}</div>
                <div class="tradeoff-value">${data.optimized}</div>
                <div class="tradeoff-change ${changeClass}">${data.change}</div>
            </div>`;
    }).join('');

    // Context Impact
    const contextEntries = Object.entries(trajectory.contextImpact);
    const contextItemsToShow = showAllContext ? contextEntries : contextEntries.slice(0, 4);
    const contextItems = contextItemsToShow.map(([context, data]) => {
        const changeClass = data.change.includes('+') ? 'diff-positive' : 'diff-negative';
        return `
            <div class="context-item" onclick="explainContextImpact('${context}', '${JSON.stringify(data).replace(/"/g, '&quot;')}')">
                <div class="context-label">${context}</div>
                <div class="context-change ${changeClass}">${data.change}</div>
                <div class="context-value">${data.optimized}</div>
            </div>`;
    }).join('');

    // Dynamic heading
    const kpiHeading = validSelectedKPIs.length === 0 
        ? 'KPI Performance Changes (All KPIs)'
        : `KPI Performance Changes (${validSelectedKPIs.length} Selected)`;

    detailContent.innerHTML = `
        <div class="details-section">
            <h4>${kpiHeading}</h4>
            <table class="details-table">
                <thead><tr><th>KPI</th><th>Goal</th><th>Current</th><th>Optimized</th><th>Change</th></tr></thead>
                <tbody>${kpiTableRows}</tbody>
            </table>
        </div>

        <div class="details-section">
            <h4 style="display: flex; justify-content: space-between; align-items: center;">
                Operational Tradeoffs
                ${tradeoffEntries.length > 4 ? `<button class="show-all-btn" onclick="toggleTradeoffs()">${showAllTradeoffs ? 'Show Less' : `Show All (${tradeoffEntries.length})`}</button>` : ''}
            </h4>
            <div class="tradeoff-grid">${tradeoffItems}</div>
        </div>

        <div class="details-section">
            <h4 style="display: flex; justify-content: space-between; align-items: center;">
                Contextual Impact
                ${contextEntries.length > 4 ? `<button class="show-all-btn" onclick="toggleContext()">${showAllContext ? 'Show Less' : `Show All (${contextEntries.length})`}</button>` : ''}
            </h4>
            <div class="context-grid">${contextItems}</div>
        </div>`;

    detailsPanel.style.display = 'block';

}

function toggleTradeoffs() {
    showAllTradeoffs = !showAllTradeoffs;
    if (selectedTrajectory !== null) {
        showTrajectoryDetails(selectedTrajectory); // Re-render details with updated flag
    }
}

function toggleContext() {
    showAllContext = !showAllContext;
    if (selectedTrajectory !== null) {
        showTrajectoryDetails(selectedTrajectory); // Re-render details with updated flag
    }
}

// ========== TRADEOFF IMPACT MODAL (Analytics Studio) ==========

function showTradeoffImpactModal() {
    if (selectedTrajectory === null) {
        addChatMessage('assistant', 'Please select an optimization trajectory first.');
        return;
    }
    const backdrop = document.getElementById('tradeoff-modal-backdrop');
    const modal = document.getElementById('tradeoff-impact-modal');
     const trajectoryIdSpan = document.getElementById('selected-trajectory-id');


    if (!backdrop || !modal) {
    console.error('Modal or backdrop not found');
    return;
}

backdrop.style.display = 'flex';
modal.style.display = 'flex';

// Force flexbox layout
const modalBody = modal.querySelector('.modal-body');
if (modalBody) {
    modalBody.style.flexDirection = 'row';
    modalBody.style.minHeight = '0';
}

// Update span only if it exists
if (trajectoryIdSpan) {
    trajectoryIdSpan.textContent = selectedTrajectory;
}
    currentImpactTimeRange = 'weekly'; // Reset to default
    currentImpactLevel = 'enterprise'; // Reset to default
     updateImpactBreakdown(); // Populate modal content

    backdrop.style.display = 'flex';
    modal.style.display = 'flex';
}

function hideTradeoffImpactModal() {
    const backdrop = document.getElementById('tradeoff-modal-backdrop');
    const modal = document.getElementById('tradeoff-impact-modal');
    
    if (backdrop) backdrop.style.display = 'none';
    if (modal) modal.style.display = 'none';
}

function selectImpactTimeRange(range, button) {
    currentImpactTimeRange = range;
    document.querySelectorAll('#tradeoff-impact-modal .time-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateImpactBreakdown();
}

function selectImpactLevel(level, button) {
    currentImpactLevel = level;
    document.querySelectorAll('#tradeoff-impact-modal .level-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateImpactBreakdown();
}

function updateImpactBreakdown() {
    const trajectory = trajectoryData.find(t => t.id === selectedTrajectory);
    if (!trajectory) return;

    const container = document.getElementById('impact-breakdown');
    if (!container) return;

    // Simulation functions
    const getProjectedData = (kpi, currentVal, time, levelMultiplier) => {
        const baseProjection = calculateProjectedValue(kpi, time);
        const noise = (Math.random() - 0.5) * 0.1 * baseProjection;
        return baseProjection + noise * levelMultiplier;
    };

    let levelMultiplier = 1;
    if (currentImpactLevel === 'regional') levelMultiplier = 1.2;
    if (currentImpactLevel === 'product') levelMultiplier = 0.8;

    // KPI Impact Table with validation
    const availableKPIs = Object.keys(trajectory.details);
    const validSelectedKPIs = Array.from(selectedKPIs).filter(kpi => 
        availableKPIs.includes(kpi)
    );
    
    // Show all KPIs if no valid selections, otherwise show selected
    const kpiImpactRows = (validSelectedKPIs.length === 0
        ? Object.entries(trajectory.details)
        : Object.entries(trajectory.details).filter(([kpiName]) => 
            validSelectedKPIs.includes(kpiName)
          ))
         .map(([kpi, data]) => {
            const unit = kpiData[kpi]?.unit || '';
            const projectedValue = getProjectedData(kpi, data.current, currentImpactTimeRange, levelMultiplier);
            const diff = data.optimized - projectedValue;
            const diffClass = diff >= 0 ? 'positive-diff' : 'negative-diff';
            const diffSymbol = diff >= 0 ? '+' : '';
            return `
                <tr>
                    <td><strong>${kpi}</strong></td>
                    <td>${data.current}${unit}</td>
                    <td>${data.original}${unit}</td>
                    <td>${projectedValue.toFixed(1)}${unit}</td>
                    <td>${data.optimized}${unit}</td>
                    <td class="impact-difference ${diffClass}">${diffSymbol}${diff.toFixed(1)}${unit}</td>
                </tr>`;
        }).join('');

    // Operational Impact Table
    const operationalImpactRows = Object.entries(trajectory.tradeoffs).map(([metric, data]) => {
        const currentVal = parseFloat(data.current.replace(/[^0-9.-]+/g,"")) || 0;
        const optimizedVal = parseFloat(data.optimized.replace(/[^0-9.-]+/g,"")) || 0;
        const unit = data.current.replace(/[\d.,$-]+/g, '').trim();
        const projectedVal = currentVal * (1 + (Math.random() - 0.5) * 0.1 * levelMultiplier);
        const diff = optimizedVal - projectedVal;
        const diffClass = diff >= 0 ? 'positive-diff' : 'negative-diff';
        const diffSymbol = diff >= 0 ? '+' : '';
        
        const formatOpValue = (val, u) => {
            if (u === '$') return `$${val.toFixed(2)}M`;
            if (u === '%') return `${val.toFixed(1)}%`;
            return `${val.toFixed(0)} ${u}`;
        };

        return `
            <tr>
                <td><strong>${metric}</strong></td>
                <td>${formatOpValue(currentVal, unit)}</td>
                <td>${formatOpValue(projectedVal, unit)}</td>
                <td>${formatOpValue(optimizedVal, unit)}</td>
                <td class="impact-difference ${diffClass}">${diffSymbol}${Math.abs(diff).toFixed(1)}${unit === '%' || unit === '$' ? '' : ' '}${unit === '$' ? 'M' : unit}</td>
            </tr>`;
    }).join('');

    // NEW: Two-column layout with filters on left, tables on right
    container.innerHTML = `
        <div class="impact-filters-sidebar">
            <div class="impact-filter-section">
                <h3>Time Range</h3>
                <div class="filter-group">
                    <button class="time-btn ${currentImpactTimeRange === 'weekly' ? 'active' : ''}" onclick="selectImpactTimeRange('weekly', this)">Weekly</button>
                    <button class="time-btn ${currentImpactTimeRange === 'monthly' ? 'active' : ''}" onclick="selectImpactTimeRange('monthly', this)">Monthly</button>
                    <button class="time-btn ${currentImpactTimeRange === 'quarterly' ? 'active' : ''}" onclick="selectImpactTimeRange('quarterly', this)">Quarterly</button>
                </div>
            </div>

            <div class="impact-filter-section">
                <h3>Context</h3>
                <div class="filter-group">
                    <button class="level-btn ${currentImpactLevel === 'enterprise' ? 'active' : ''}" onclick="selectImpactLevel('enterprise', this)">Enterprise</button>
                    <button class="level-btn ${currentImpactLevel === 'regional' ? 'active' : ''}" onclick="selectImpactLevel('regional', this)">Regional</button>
                    <button class="level-btn ${currentImpactLevel === 'product' ? 'active' : ''}" onclick="selectImpactLevel('product', this)">Product Line</button>
                </div>
            </div>
        </div>

        <div class="impact-tables-area">
            <div class="impact-table-section">
                <h3>KPI Impact (${currentImpactLevel}, ${currentImpactTimeRange})</h3>
                <div class="table-responsive">
                    <table class="impact-table">
                        <thead>
                            <tr>
                                <th>KPI</th>
                                <th>Current</th>
                                <th>Goal</th>
                                <th>Projected</th>
                                <th>Optimized</th>
                                <th>Diff (Opt vs Proj)</th>
                            </tr>
                        </thead>
                        <tbody>${kpiImpactRows}</tbody>
                    </table>
                </div>
            </div>

            <div class="impact-table-section">
                <h3>Operational Impact (${currentImpactLevel}, ${currentImpactTimeRange})</h3>
                <div class="table-responsive">
                    <table class="impact-table">
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Current</th>
                                <th>Projected</th>
                                <th>Optimized</th>
                                <th>Diff (Opt vs Proj)</th>
                            </tr>
                        </thead>
                        <tbody>${operationalImpactRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function openTradeoffModal() {
    const modal = document.getElementById('tradeoff-impact-modal');
    if (modal) {
        modal.style.display = 'flex';
        updateImpactBreakdown();
    }
}

function reviewTradeoffs() {
    if (!selectedTrajectory) {
        addChatMessage('assistant', 'Please select a trajectory first to review its tradeoffs.');
        return;
    }
    
    openTradeoffModal();
}

function applyOptimizedTargets() {
    const trajectory = trajectoryData.find(t => t.id === selectedTrajectory);
    if (!trajectory) {
        alert('No trajectory selected');
        return;
    }

    // Update KPI targets with optimized values
    Object.entries(trajectory.details).forEach(([kpiName, data]) => {
        if (kpiData[kpiName]) {
            kpiData[kpiName].target = data.optimized;
            kpiData[kpiName].current = data.optimized;
        }
    });

    // Close modal
    const modal = document.getElementById('tradeoff-impact-modal');
    if (modal) modal.style.display = 'none';

    // Show success message
    addChatMessage('assistant', `✓ Successfully applied optimized targets from Trajectory #${selectedTrajectory}. KPI targets have been updated with the optimized values.`);
    
    // Refresh the KPI grid
    if (typeof populateKPIs === 'function') {
        populateKPIs();
    }
}

function closeTradeoffModal() {
    const modal = document.getElementById('tradeoff-impact-modal');
    if (modal) modal.style.display = 'none';
}

function calculateProjectedValue(kpi, timeRange) {
    // Uses the prediction data from the timeSeriesData
    const kpiDataset = timeSeriesData[timeRange]?.datasets[kpi];
    if (!kpiDataset || !kpiDataset.prediction || kpiDataset.prediction.length === 0) {
        // Fallback: simple trend extrapolation from current value and change
        const currentData = kpiData[kpi];
        let multiplier = 1;
        if (timeRange === 'monthly') multiplier = 4;
        if (timeRange === 'quarterly') multiplier = 12;
         // Ensure change is treated as a percentage change for calculation if unit is %
         let projectedChange = currentData.change;
         if (currentData.unit === '%') {
             projectedChange = currentData.current * (currentData.change / 100);
         }

        return currentData.current + (projectedChange * multiplier * 0.1); // Simplified projection
    }
    // Return the last prediction value for the given time range
    return kpiDataset.prediction[kpiDataset.prediction.length - 1];
}


function applySelectedOptimization() {
    if (!selectedTrajectory) {  // ← This catches both null and undefined
    addChatMessage('assistant', 'Please select an optimization trajectory first.');
    return;
    }
    const trajectory = trajectoryData.find(t => t.id === selectedTrajectory);
    if (!trajectory) return;

    // Update the main kpiData targets based on the selected trajectory's optimized values
    Object.entries(trajectory.details).forEach(([kpiName, data]) => {
        if (kpiData[kpiName] && selectedKPIs.has(kpiName)) { // Apply only to selected KPIs
            // Option 1: Update the target
            // kpiData[kpiName].target = data.optimized;

            // Option 2: Update the current value (less realistic, implies instant change)
             kpiData[kpiName].current = data.optimized;
             // Also reset change indicator for applied KPIs
             kpiData[kpiName].change = 0;
        }
    });

    hideTradeoffImpactModal(); // Close the modal
    addChatMessage('assistant', `Applied optimized values from Trajectory #${selectedTrajectory} to the selected KPIs. Targets and current values have been updated.`);

    // Refresh the KPI grid to show updated values/targets
    selectedKPIs.clear(); // Clear selection after applying
    populateCurrentKPIs(); // Refresh grid

     // Reset trajectory panel state
     document.getElementById('trajectory-panel').style.display = 'none';
     document.getElementById('trajectory-details').style.display = 'none';
     selectedTrajectory = null;
}


// ========== EXPLAINABILITY FUNCTIONS (Analytics Studio) ==========

function explainKPIPerformance(kpi, dataStr) {
    try {
        const data = JSON.parse(dataStr.replace(/&quot;/g, '"'));
        const unit = kpiData[kpi]?.unit || '';
        const diff = data.optimized - data.current; // Opt vs Current
        const diffGoal = data.optimized - data.original; // Opt vs Goal
        let explanation = `<b>${kpi} Analysis (Trajectory #${selectedTrajectory}):</b><br>`;
        explanation += ` • Current: ${data.current}${unit}<br>`;
        explanation += ` • Goal: ${data.original}${unit}<br>`;
        explanation += ` • Optimized: <b>${data.optimized}${unit}</b><br>`;
        explanation += ` • Change vs Current: <span class="${diff >= 0 ? 'diff-positive' : 'diff-negative'}">${diff >= 0 ? '+' : ''}${diff.toFixed(1)}${unit}</span><br>`;
        explanation += ` • Change vs Goal: <span class="${diffGoal >= 0 ? 'diff-positive' : 'diff-negative'}">${diffGoal >= 0 ? '+' : ''}${diffGoal.toFixed(1)}${unit}</span><br><br>`;

         // Add context based on KPI type
         const lowerIsBetter = ['Stock Out Rate', 'Return Rate', 'Cost Per Unit', 'Lead Time'].includes(kpi);
        if (lowerIsBetter) {
             explanation += diff <= 0
                 ? `This trajectory significantly improves ${kpi}, moving closer to or surpassing the goal.`
                 : `This trajectory shows a trade-off for ${kpi}. While overall optimization is positive, ${kpi} increases slightly.`;
        } else {
             explanation += diff >= 0
                 ? `This trajectory enhances ${kpi}, indicating positive impact towards the goal.`
                 : `This trajectory suggests a slight decrease in ${kpi}, possibly due to resource reallocation.`;
        }
        addChatMessage('assistant', explanation);
    } catch (e) { console.error("Error parsing KPI data:", e); }
}

function explainTradeoff(metric, dataStr) {
     try {
        const data = JSON.parse(dataStr.replace(/&quot;/g, '"'));
        let explanation = `<b>Tradeoff: ${metric} (Trajectory #${selectedTrajectory}):</b><br>`;
        explanation += ` • Current: ${data.current}<br>`;
        explanation += ` • Optimized: <b>${data.optimized}</b><br>`;
        explanation += ` • Impact: <span class="${data.change.includes('+') ? 'diff-negative' : 'diff-positive'}">${data.change}</span><br><br>`; // Note: class might depend on metric meaning (e.g., cost increase is negative)

        // Add contextual explanation based on the metric
        switch (metric) {
            case "Logistics Cost": explanation += data.change.includes('+') ? "Increased logistics spending likely supports faster delivery or higher service levels required by this trajectory." : "Cost savings achieved, potentially through optimized routes or consolidation."; break;
            case "Inventory Holding": explanation += data.change.includes('+') ? "Higher inventory levels might be needed to meet improved OTIF or buffer against stockouts." : "Reduced holding costs suggest better inventory turnover or forecasting accuracy."; break;
            case "Production Capacity": explanation += data.change.includes('+') ? "Increased utilization implies higher production output or efficiency gains needed." : "Lower utilization might free up resources but could impact unit cost if volume drops."; break;
             default: explanation += `The change in ${metric} reflects operational adjustments necessary to achieve the target KPI improvements.`;
        }
        addChatMessage('assistant', explanation);
     } catch (e) { console.error("Error parsing tradeoff data:", e); }
}

function explainTrajectory(trajectoryId) {
    const trajectory = trajectoryData.find(t => t.id === trajectoryId);
    if (!trajectory) return;

    let explanation = `<b>Trajectory: ${trajectory.name}</b><br>`;
    
    // Add status-based message
    switch(trajectory.status) {
        case 'recommended':
            explanation += `<span class="diff-positive">✓ Recommended</span> - This trajectory provides the optimal balance across all KPIs.<br><br>`;
            break;
        case 'alternative':
            explanation += `<span class="info">ℹ Alternative Option</span> - Consider this trajectory for different priorities.<br><br>`;
            break;
        case 'not_recommended':
            explanation += `<span class="diff-negative">⚠ Not Recommended</span> - This trajectory has significant tradeoffs.<br><br>`;
            break;
        default:
            explanation += `<br>`;
    }

    // Summarize KPI improvements
    explanation += `<b>Key Performance Indicators:</b><br>`;
    const kpiEntries = Object.entries(trajectory.kpis);
    kpiEntries.forEach(([kpi, value]) => {
        const kpiInfo = kpiData[kpi];
        const unit = kpiInfo?.unit || '';
        const isMeetingTarget = kpiInfo ? 
            (kpiInfo.targetDirection === 'increase' ? value >= kpiInfo.target : value <= kpiInfo.target) 
            : false;
        const statusIcon = isMeetingTarget ? '✓' : '→';
        explanation += ` ${statusIcon} <b>${kpi}:</b> ${value}${unit}<br>`;
    });

    // Add tradeoffs summary
    if (trajectory.tradeoffs) {
        const tradeoffCount = Object.keys(trajectory.tradeoffs).length;
        explanation += `<br><b>Operational Considerations:</b> ${tradeoffCount} areas impacted<br>`;
    }

    // Add context impact summary
    if (trajectory.contextImpact) {
        const contextCount = Object.keys(trajectory.contextImpact).length;
        explanation += `<b>Regional/Product Impact:</b> ${contextCount} contexts analyzed<br>`;
    }

    explanation += `<br><i>Click on specific metrics below for detailed explanations.</i>`;
    
    addChatMessage('assistant', explanation);
}

function explainContextImpact(context, dataStr) {
     try {
        const data = JSON.parse(dataStr.replace(/&quot;/g, '"'));
        let explanation = `<b>Contextual Impact: ${context} (Trajectory #${selectedTrajectory}):</b><br>`;
        explanation += ` • Current: ${data.current}<br>`;
        explanation += ` • Optimized: <b>${data.optimized}</b><br>`;
        explanation += ` • Change: <span class="${data.change.includes('+') ? 'diff-positive' : 'diff-negative'}">${data.change}</span><br><br>`; // Again, positive/negative depends on context

        explanation += `This trajectory is projected to specifically impact ${context}. The ${data.change} change suggests this strategy might be particularly effective (or challenging) in this area. Consider this when planning roll-out.`;
        addChatMessage('assistant', explanation);
     } catch (e) { console.error("Error parsing context data:", e); }
}

// ========== CHAT FUNCTIONS (Planning Agent - Analytics Studio) ==========
// These functions are specific to the chat panel in the Analytics Studio
function addChatMessage(role, content) { // Renamed from addPlanningChatMessage
    const messagesContainer = document.getElementById('chat-messages'); // Target correct ID
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        if (role === 'user') {
            bubble.textContent = content; // Safer for user input
        } else {
            bubble.innerHTML = content.replace(/\n/g, '<br>'); // Allow basic HTML for AI
        }
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function handleChatKeyPress(event) { // Renamed from handlePlanningChatKeyPress
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage(); // Call the correct send function
    }
}

function sendChatMessage() { // Renamed from sendPlanningChatMessage
    const input = document.querySelector('#analytics-studio .chat-input-field'); // Target correct input
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;

    addChatMessage('user', message);
    input.value = '';

    setTimeout(() => {
        const response = generateAIResponse(message); // Call the correct AI response generator
        addChatMessage('assistant', response);
    }, 850);
}

function generateAIResponse(message) { // Renamed from generatePlanningAIResponse
     const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('explain') && lowerMessage.includes('trajectory')) {
        const match = lowerMessage.match(/trajectory\s*#?(\d)/);
        if (match && match[1]) {
            const id = parseInt(match[1]);
            if (trajectoryData.find(t=> t.id === id)) {
                explainTrajectory(id); // Call the existing function
                return `Okay, providing a detailed explanation for Trajectory #${id}.`;
            } else {
                return `Sorry, I couldn't find Trajectory #${id}. Please choose from the available options.`;
            }
        } else if (selectedTrajectory !== null) {
            explainTrajectory(selectedTrajectory); // Explain the currently selected one
             return `Explaining the currently selected Trajectory #${selectedTrajectory}.`;
        } else {
            return "Please select a trajectory first, or specify which one you'd like me to explain (e.g., 'explain trajectory 2').";
        }
    }
     if (lowerMessage.includes('tradeoff') || lowerMessage.includes('impact')) {
         if (selectedTrajectory !== null) {
              return `Trajectory #${selectedTrajectory} involves several tradeoffs. Key ones include impacts on Logistics Cost, Inventory Holding, and Production Capacity. Click on items in the 'Operational Tradeoffs' section for details. Would you like me to highlight the biggest tradeoff?`;
         } else {
             return "Please select a trajectory first to discuss its tradeoffs.";
         }
    }
     if (lowerMessage.includes('best') || lowerMessage.includes('recommend')) {
         if (selectedKPIs.size > 0) {
             // Find trajectory with highest score (simple recommendation)
             const bestTraj = trajectoryData.reduce((best, current) => (current.score > best.score) ? current : best, trajectoryData[0]);
             return `Based on the overall score, **Trajectory #${bestTraj.id}** (Score: ${bestTraj.score}) appears to be the most balanced optimization. However, the 'best' option depends on your strategic priorities regarding cost vs. performance improvements. Review the details for each trajectory.`;
         } else {
             return "Please select the KPIs you want to optimize first so I can analyze relevant trajectories.";
         }
     }

    // Default responses
    const responses = [
        "I can help analyze the optimization trajectories. Select KPIs and click 'Start Optimization', then choose a trajectory to explore.",
        "Each trajectory balances improvements in selected KPIs against operational tradeoffs like cost and capacity. Which aspect are you most interested in?",
        "Ask me to 'explain trajectory #' or about specific tradeoffs like 'impact on logistics cost'.",
        "Remember to review the contextual impact to see how a trajectory might affect different regions or product lines.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}


// ========== NEWS FUNCTIONS ==========
function populateNewsCards() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = newsData.map((article, index) => `
        <div class="news-card ${article.read ? 'read' : ''}" onclick="selectNewsArticle(this, ${index})">
             <div class="news-content">
                <div class="news-header">
                    <div class="news-date">${article.date}</div>
                     ${article.read ? '<span class="read-indicator">✓ Read</span>' : ''}
                </div>
                <div class="news-item-title">${article.title}</div>
                <div class="news-snippet">${article.snippet}</div>
             </div>
             <span class="read-more" onclick="event.stopPropagation(); window.open('https://example.com/news${index+1}', '_blank');">Read Full →</span>
        </div>
    `).join('');
}

function selectNewsArticle(element, index) {
    const article = newsData[index];
    if (!article) return;

    // Highlight selected card
    document.querySelectorAll('.news-card.selected').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');


    // Mark as read if not already
    if (!article.read) {
        article.read = true;
        element.classList.add('read'); // Update UI immediately
        // Consider updating the read indicator if it exists separately
         const indicator = element.querySelector('.read-indicator');
         if (indicator) indicator.style.display = 'inline-block';
         else { // Add indicator if not present initially
            const header = element.querySelector('.news-header');
            if(header) header.insertAdjacentHTML('beforeend', '<span class="read-indicator">✓ Read</span>');
         }
    }

    // Generate and display analysis
    const analysis = generateNewsAnalysis(article);
    addNewsChatMessage('assistant', analysis);
}


function generateNewsAnalysis(article) {
     let analysis = `<b>Analysis for "${article.title}":</b><br><br>`;
     analysis += `<em>${article.snippet}</em><br><br>`;

     analysis += `<b>Potential KPI Correlations:</b><br>`;
     let foundCorrelation = false;

     if (article.title.toLowerCase().includes('chip shortage') || article.title.toLowerCase().includes('semiconductor')) {
        analysis += ` • **Supplier OTD & Lead Time:** Easing shortages could slightly improve Supplier OTD (currently ${kpiData['Supplier OTD'].current}%) and reduce Lead Time (currently ${kpiData['Lead Time'].current} days), though port congestion remains a bigger issue.<br>`;
        analysis += ` • **Cost Per Unit:** May lead to stabilization or slight reduction in component costs within Cost Per Unit (currently $${kpiData['Cost Per Unit'].current}).<br>`;
         foundCorrelation = true;
     }
     if (article.title.toLowerCase().includes('port congestion') || article.title.toLowerCase().includes('west coast')) {
         analysis += ` • **Lead Time:** Directly impacts Lead Time, keeping it elevated above the ${kpiData['Lead Time'].target} day target.<br>`;
         analysis += ` • **OTIF:** Contributes negatively to OTIF (currently ${kpiData['OTIF'].current}%) due to unpredictable inbound delays.<br>`;
         analysis += ` • **Stock Out Rate:** Increases risk of Stock Outs (currently ${kpiData['Stock Out Rate'].current}%) if safety stock isn't sufficient.<br>`;
         foundCorrelation = true;
     }
     if (article.title.toLowerCase().includes('carbon emissions') || article.title.toLowerCase().includes('regulations')) {
         analysis += ` • **Cost Per Unit:** Likely to increase Cost Per Unit ($${kpiData['Cost Per Unit'].current}) due to higher transportation/logistics costs.<br>`;
         analysis += ` • **Lead Time:** Potential minor impact on Lead Time if carriers change routes or modes.<br>`;
         foundCorrelation = true;
     }
     if (article.title.toLowerCase().includes('demand') && article.title.toLowerCase().includes('electronics')) {
         analysis += ` • **Forecast Accuracy:** High demand challenges Forecast Accuracy (currently ${kpiData['Forecast Accuracy'].current}%).<br>`;
         analysis += ` • **Stock Out Rate:** Increases pressure on inventory, potentially worsening the Stock Out Rate (${kpiData['Stock Out Rate'].current}%).<br>`;
         analysis += ` • **OTIF:** High demand and potential stock issues could further depress OTIF (${kpiData['OTIF'].current}%).<br>`;
         foundCorrelation = true;
     }
      if (article.title.toLowerCase().includes('raw material') || article.title.toLowerCase().includes('volatility')) {
         analysis += ` • **Cost Per Unit:** Volatility directly impacts Cost Per Unit ($${kpiData['Cost Per Unit'].current}), contributing to the current overrun.<br>`;
         analysis += ` • **Production Efficiency:** May indirectly impact Production Efficiency (${kpiData['Production Efficiency'].current}%) if material availability fluctuates.<br>`;
          foundCorrelation = true;
     }


     if (!foundCorrelation) {
         analysis += ` • No direct strong correlation identified with current critical KPIs. Monitor for potential secondary effects.<br>`;
     }

     analysis += `<br><b>Recommendation:</b><br>`;
      if (article.title.toLowerCase().includes('port congestion')) {
         analysis += ` • Review safety stock levels for items impacted by West Coast ports. Explore alternative routing options if feasible. Account for extended lead times in planning.`;
     } else if (article.title.toLowerCase().includes('demand')) {
          analysis += ` • Increase forecast monitoring frequency. Consider short-term inventory reallocation. Collaborate closely with sales on promotion timings.`;
     } else if (article.title.toLowerCase().includes('raw material')) {
          analysis += ` • Review hedging strategies or long-term contracts for critical materials. Explore alternative material options with suppliers.`;
     }
     else {
          analysis += ` • Monitor the situation. Currently, no immediate action required based on direct KPI impact, but be aware of potential downstream effects.`;
     }

    return analysis;
}


function addNewsChatMessage(role, content) {
    const messagesContainer = document.getElementById('news-chat-messages');
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
         if (role === 'user') {
            bubble.textContent = content;
        } else {
             bubble.innerHTML = content.replace(/\n/g, '<br>');
        }
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}


// ========== IMPROVEMENT COACH CHAT FUNCTIONS ==========
function addImprovementChatMessage(role, content) {
    const messagesContainer = document.getElementById('improvement-chat-messages');
    if (!messagesContainer) {
        console.warn('improvement-chat-messages container not found');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (role === 'user') {
        bubble.textContent = content;
    } else {
        // allow basic HTML formatting in assistant messages
        bubble.innerHTML = content.replace(/\n/g, '<br>');
    }

    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function populateImprovementCoachFromInsight(card) {
    if (!card || !card.getAttribute) {
        console.warn('Invalid card element passed to populateImprovementCoachFromInsight');
        return;
    }

    const insightId = card.getAttribute('data-insight-id');
    if (!insightId) {
        console.warn('Card missing data-insight-id attribute');
        return;
    }

    // Check if insightDetails exists
    if (typeof insightDetails === 'undefined' || !insightDetails || !insightDetails[insightId]) {
        console.warn(`No insight details found for ID: ${insightId}`);
        // Post a generic message
        addImprovementChatMessage('assistant', `<b>Insight Selected</b><br>ID: ${insightId}<br><br>Detailed analysis for this insight is being prepared.`);
        return;
    }

    const detail = insightDetails[insightId];

    const messageParts = [];

    // Title
    messageParts.push(`<b>${detail.title}</b>`);

    // Type + short description
    if (detail.type) {
        messageParts.push(`<br><span style="font-size:0.9em;opacity:0.85;">Type: ${detail.type}</span>`);
    }
    if (detail.description) {
        messageParts.push(`<br><br>${detail.description}`);
    }

    // Metrics
    if (detail.metrics) {
        messageParts.push('<br><br><b>Key Metrics:</b><br>');
        Object.keys(detail.metrics).forEach(key => {
            messageParts.push(`• ${key}: ${detail.metrics[key]}<br>`);
        });
    }

    // Analysis
    if (detail.analysis) {
        messageParts.push('<br><b>What this means for you:</b><br>');
        messageParts.push(detail.analysis);
    }

    // Suggested actions
    if (detail.actions && detail.actions.length) {
        messageParts.push('<br><br><b>Suggested Next Actions:</b><br>');
        detail.actions.forEach(action => {
            messageParts.push(`• ${action}<br>`);
        });
    }

    const finalMessage = messageParts.join('');

    // Post to Improvement Coach chat
    addImprovementChatMessage('assistant', finalMessage);
    console.log(' Improvement Coach populated for insight:', insightId);
}

function handleNewsChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendNewsChatMessage();
    }
}

function sendNewsChatMessage() {
    const input = document.querySelector('#news-insights .chat-input-field');
    const message = input.value.trim();
    if (!message) return;

    addNewsChatMessage('user', message);
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const response = generateNewsAIResponse(message);
        addNewsChatMessage('assistant', response);
    }, 850);
}

function generateNewsAIResponse(message) {
     const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('impact') && (lowerMessage.includes('port') || lowerMessage.includes('congestion'))) {
         return "Port congestion primarily impacts **Lead Time** (making it longer) and **OTIF** (making it harder to meet). It can also increase the **Stock Out Rate** if delays are significant. Current Lead Time is 12.3 days.";
     }
      if (lowerMessage.includes('effect') && lowerMessage.includes('demand surge')) {
          return "The pre-holiday demand surge puts pressure on **Forecast Accuracy**, potentially increases the **Stock Out Rate**, and could negatively affect **OTIF** if inventory or production can't keep up.";
      }
       if (lowerMessage.includes('cost') && (lowerMessage.includes('material') || lowerMessage.includes('carbon'))) {
           return "Both raw material volatility and potential carbon regulations are likely to increase the **Cost Per Unit**, which is already above target at $24.50. Addressing this is covered in TKT-004.";
       }

    // Generic responses
    const responses = [
        "I track external events like port status, material prices, and demand shifts. Click an article on the left or ask about a specific topic (e.g., 'impact of chip shortage').",
        "The current news suggests continued pressure on lead times due to port issues and potential cost increases from material volatility. How would you like to explore this?",
        "I can correlate news events with specific KPIs. For example, the demand surge impacts inventory levels and OTIF.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// News Status Management
function toggleReadStatus(event) {
  event.stopPropagation();
  const card = event.target.closest('.news-card');
  const newsId = card.dataset.newsId;
  card.classList.toggle('read');
  // Save to localStorage
}

function toggleSaveStatus(event) {
  event.stopPropagation();
  const card = event.target.closest('.news-card');
  const newsId = card.dataset.newsId;
  card.classList.toggle('saved');
}

function shareToSlack(event) {
  event.stopPropagation();
  const card = event.target.closest('.news-card');
  // Open Slack discussion modal like Discuss button
  openSlackDiscussionModal(card);
}

// Filtering & Sorting
function filterNewsByStatus(status) {
  const cards = document.querySelectorAll('.news-card');
  cards.forEach(card => {
    const isRead = card.classList.contains('read');
    const isSaved = card.classList.contains('saved');
    
    let show = true;
    if (status === 'read') show = isRead;
    else if (status === 'unread') show = !isRead;
    else if (status === 'saved') show = isSaved;
    
    card.style.display = show ? 'flex' : 'none';
  });
  
  // Update filter button active state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function sortNews(sortBy) {
  const container = document.querySelector('.news-cards-container');
  const cards = Array.from(document.querySelectorAll('.news-card'));
  
  if (sortBy === 'date-desc') {
    // Sort by date descending
  } else if (sortBy === 'date-asc') {
    // Sort by date ascending
  } else if (sortBy === 'relevance') {
    // Sort by relevance score
  }
  
  cards.forEach(card => container.appendChild(card));
}

// Bulk Actions
function updateBulkSelection() {
  const selected = document.querySelectorAll('.news-checkbox:checked').length;
  const bar = document.getElementById('bulkActionsBar');
  const count = document.getElementById('selectedCount');
  
  if (selected > 0) {
    bar.style.display = 'flex';
    count.textContent = `${selected} selected`;
  } else {
    bar.style.display = 'none';
  }
}

function bulkMarkRead() {
  document.querySelectorAll('.news-checkbox:checked').forEach(checkbox => {
    const card = checkbox.closest('.news-card');
    card.classList.add('read');
  });
}

// Show News Detail in Chatbot
function showNewsDetail(cardBody) {
  const card = cardBody.closest('.news-card');
  const title = card.querySelector('.news-item-title').textContent;
  const snippet = card.querySelector('.news-snippet').textContent;
  
  // Create message with:
  // - News summary
  // - Impact on company
  // - Risks
  // - Opportunities
  // - Recommended actions
  // - Accept/Reject buttons
  
  const message = `
    <div class="news-detail-message">
      <h4>${title}</h4>
      <p><strong>Summary:</strong> ${snippet}</p>
      <p><strong>Impact on Company:</strong> Port congestion will increase lead times by 15-20%...</p>
      <p><strong>Risks:</strong> OTIF targets at risk, customer SLA breaches...</p>
      <p><strong>Opportunities:</strong> Diversify supplier base, activate alternative ports...</p>
      <p><strong>Recommended Actions:</strong> Expedite orders, activate buffer inventory...</p>
      <div class="action-buttons">
        <button class="accept-btn" onclick="acceptNewsAction()">Accept Action</button>
        <button class="reject-btn" onclick="rejectNewsAction()">Reject Action</button>
      </div>
    </div>
  `;
  
  // Add to news chat messages
  const newsChat = document.getElementById('news-chat-messages');
  newsChat.innerHTML += `<div class="message assistant"><div class="message-bubble">${message}</div></div>`;
}




// ============ NEWS DATA GENERATION ============
const newsArticles = [
    {
        id: 'news-1',
        title: 'Supply Chain Disruption in Southeast Asia',
        snippet: 'Port congestion in Singapore has escalated to unprecedented levels, affecting 40% of container shipments. Authorities report that terminal capacity is operating at 120% due to increased trade activity. Shipping companies are diverting vessels to alternative ports, adding 5-7 days to delivery times. The situation is expected to continue through Q4 2025 as holiday demand peaks. Logistics experts predict a 15-20% increase in overall shipping costs. Industry observers are closely monitoring port operations.',
        source: 'Reuters',
        date: 'Nov 12, 2025',
        relevance: '89% Relevant',
        impact: 'Critical',
        read: false,
        saved: false
    },
    {
        id: 'news-2',
        title: 'Shipping Rates Hit 3-Year High',
        snippet: 'Container shipping rates have surged to their highest levels in three years due to increased demand and port congestion. The Shanghai Containerized Freight Index shows rates up 35% from last quarter. Major carriers are implementing temporary surcharges on Asian routes. Supply chain disruptions from other ports are pushing additional volume through already congested terminals. Industry analysts expect rates to stabilize by Q1 2026 as capacity expands. Companies should budget accordingly for higher logistics costs.',
        source: 'Bloomberg',
        date: 'Nov 11, 2025',
        relevance: '85% Relevant',
        impact: 'Critical',
        read: false,
        saved: false
    },
    {
        id: 'news-3',
        title: 'New Trade Agreement Signed',
        snippet: 'Major trade agreement between regional partners expected to reduce tariffs by 15% starting next quarter. This agreement will eliminate customs barriers on manufactured goods and agricultural products. Logistics providers anticipate simplified clearance procedures and faster border crossings. The deal is expected to boost regional trade volume by 25-30% over the next two years. Companies should update compliance procedures to take advantage of new tariff classifications. Market analysts view this as positive for supply chain efficiency.',
        source: 'Financial Times',
        date: 'Nov 10, 2025',
        relevance: '82% Relevant',
        impact: 'Positive',
        read: false,
        saved: false
    },
    {
        id: 'news-4',
        title: 'Port Strike Averted',
        snippet: 'Last-minute negotiations prevent port strike, ensuring supply chain stability through Q4 2025. Union representatives and port management reached agreement on wage increases and working conditions. The deal includes provisions for automation and job protection for affected workers. Industry observers credit proactive dialogue between stakeholders for avoiding potential disruptions. Supply chain managers can now proceed with holiday season planning without strike contingencies. Worker satisfaction is expected to improve significantly.',
        source: 'WSJ',
        date: 'Nov 9, 2025',
        relevance: '88% Relevant',
        impact: 'Critical',
        read: false,
        saved: false
    },
    {
        id: 'news-5',
        title: 'AI Logistics Solution Launched',
        snippet: 'New AI-powered logistics platform claims to reduce delivery times by 25% and optimize routes automatically. The system uses machine learning to predict port congestion and suggest optimal routing. Beta testing with major retailers shows significant improvements in last-mile delivery efficiency. The platform integrates with existing warehouse management systems and TMS solutions. Adoption is expected to accelerate as more companies recognize the competitive advantage. Early adopters report improved customer satisfaction and reduced operational costs.',
        source: 'TechCrunch',
        date: 'Nov 8, 2025',
        relevance: '76% Relevant',
        impact: 'Opportunity',
        read: false,
        saved: false
    },
    {
        id: 'news-6',
        title: 'Warehouse Automation Growing',
        snippet: 'Investment in warehouse automation increases by 40% as companies adapt to labor shortages. Modern automated systems include robotics, conveyor systems, and AI-powered inventory management. Companies report 20-30% improvements in order fulfillment accuracy and speed. The automation trend is particularly strong in e-commerce and food distribution sectors. Labor savings are being redirected to customer service and quality assurance roles. Industry experts predict continued growth in automation investments.',
        source: 'Supply Chain Dive',
        date: 'Nov 7, 2025',
        relevance: '79% Relevant',
        impact: 'Opportunity',
        read: false,
        saved: false
    },
    {
        id: 'news-7',
        title: 'Demand Forecast Revised Down',
        snippet: 'Q4 consumer demand forecast revised downward by 8%, potentially easing supply chain pressure. Economists cite economic uncertainty and changing consumer spending patterns for the revision. Retailers are adjusting inventory levels and reducing orders for next quarter. This adjustment provides relief for overwhelmed ports and shipping lines. Companies should monitor forecasts closely as holiday promotions may impact demand. Economic indicators suggest stabilization by Q1 2026.',
        source: 'Reuters',
        date: 'Nov 6, 2025',
        relevance: '81% Relevant',
        impact: 'Risk',
        read: false,
        saved: false
    },
    {
        id: 'news-8',
        title: 'Supplier Risk Alert',
        snippet: 'Major component supplier reports production delays due to raw material shortage. The shortage affects semiconductor and electronics manufacturing across multiple industries. Affected companies are seeking alternative suppliers and increasing safety stock levels. Production delays are expected to extend through Q1 2026 for some product lines. Supply chain teams should evaluate single-supplier risks and diversify sourcing strategies. Industry groups are coordinating efforts to address the shortage.',
        source: 'Supply Chain Journal',
        date: 'Nov 5, 2025',
        relevance: '84% Relevant',
        impact: 'Critical',
        read: false,
        saved: false
    },
    {
        id: 'news-9',
        title: 'Sustainability Initiative Launched',
        snippet: 'Leading logistics companies commit to carbon-neutral operations by 2030. Initiatives include fleet electrification, sustainable fuel adoption, and renewable energy investments. The commitment is expected to cost $50+ billion across the industry but offers long-term savings. Regulatory bodies are supporting the transition through tax incentives and infrastructure investments. Early adopters expect competitive advantages as environmental regulations tighten. Sustainability is becoming a key differentiator in the logistics industry.',
        source: 'Green Business',
        date: 'Nov 4, 2025',
        relevance: '72% Relevant',
        impact: 'Opportunity',
        read: false,
        saved: false
    },
    {
        id: 'news-10',
        title: 'Regional Logistics Hub Opens',
        snippet: 'New distribution center in Southeast Asia expected to improve delivery times by 30%. The facility will serve as a regional hub for e-commerce fulfillment and B2B logistics. Location selection was based on proximity to key markets and port access. Opening is scheduled for Q2 2026 with initial capacity for 500,000 SKUs. The hub is expected to attract additional investment in the region. Regional logistics networks will benefit significantly from this expansion.',
        source: 'Logistics Today',
        date: 'Nov 3, 2025',
        relevance: '83% Relevant',
        impact: 'Positive',
        read: false,
        saved: false
    }
];

// Function to generate news cards on page load
function initializeNewsCards() {
    const container = document.querySelector('.news-cards-container');
    if (!container) return;

    // Clear existing cards
    container.innerHTML = '';

    // Generate cards for all articles
    newsArticles.forEach(article => {
        const card = createNewsCard(article);
        container.appendChild(card);
    });

    console.log(`Generated ${newsArticles.length} news cards`);
}

// Function to create a news card element
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.newsId = article.id;
    if (article.read) card.classList.add('read');
    if (article.saved) card.classList.add('saved');

    const impactColor = article.impact === 'Critical' ? 'critical' : 
                       article.impact === 'Risk' ? 'warning' : 
                       article.impact === 'Opportunity' ? 'affects' : 'affects';

    card.innerHTML = `
        <div class="news-card-header">
            <div class="news-card-title-section">
                <input type="checkbox" class="news-checkbox" onchange="updateBulkSelection()">
                <h3 class="news-item-title">${article.title}</h3>
            </div>
            <div class="news-actions">
                <button class="news-icon-btn read-btn" onclick="toggleReadStatus(event)" title="Mark as Read">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64"/><path d="M3.51 15A9 9 0 0 0 18.36 18.36"/></svg>
                </button>
                <button class="news-icon-btn save-btn" onclick="toggleSaveStatus(event)" title="Save Article">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
                </button>
                <button class="news-icon-btn share-btn" onclick="shareToSlack(event)" title="Share to Slack">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
            </div>
        </div>
        <div class="news-meta">
            <span class="news-date">${article.date}</span>
            <span class="news-source">${article.source}</span>
        </div>
        <div class="news-card-body" onclick="showNewsDetail(this)">
            <p class="news-snippet">${article.snippet}</p>
            <div class="news-read-indicator"><a href="#" class="read-more">Read Full →</a></div>
        </div>
    `;

    return card;
}

// Call on page load
window.addEventListener('load', function() {
    if (document.querySelector('.news-cards-container')) {
        initializeNewsCards();
    }
});



// ============ BULK MARK UNREAD ============
function bulkMarkUnread() {
    document.querySelectorAll('.news-checkbox:checked').forEach(checkbox => {
        const card = checkbox.closest('.news-card');
        if (card) {
            card.classList.remove('read');
            checkbox.checked = false;
        }
    });
    updateBulkSelection();
    console.log('Marked selected articles as unread');
}

// ============ CLEAR SELECTION ============
function clearSelection() {
    document.querySelectorAll('.news-checkbox:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateBulkSelection();
    console.log('Cleared all selections');
}


// ============ BULK SAVE ============
function bulkSave() {
    document.querySelectorAll('.news-checkbox:checked').forEach(checkbox => {
        const card = checkbox.closest('.news-card');
        if (card) {
            card.classList.add('saved');
            const saveBtn = card.querySelector('.save-btn');
            if (saveBtn) saveBtn.classList.add('saved');
            checkbox.checked = false;
        }
    });
    updateBulkSelection();
    console.log('Saved selected articles');
}

// ============ BULK SHARE ============
function bulkShare() {
    const selectedCount = document.querySelectorAll('.news-checkbox:checked').length;
    if (selectedCount === 0) {
        console.log('No articles selected');
        return;
    }

    // Open Slack discussion modal
    const modal = document.getElementById('discussModal');
    if (modal) {
        const titleEl = modal.querySelector('h2');
        const contentEl = modal.querySelector('p');

        if (titleEl) titleEl.textContent = `Share ${selectedCount} Articles to Slack`;
        if (contentEl) contentEl.textContent = `Do you want to share ${selectedCount} selected news articles to Slack?`;

        const backdrop = document.getElementById('discussModalBackdrop');
        if (backdrop) backdrop.style.display = 'flex';
    }

    // Clear selection after sharing
    document.querySelectorAll('.news-checkbox:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateBulkSelection();
    console.log('Shared', selectedCount, 'articles to Slack');
}

// ============ NEWS SEARCH ============
function searchNews(searchText) {
    const cards = document.querySelectorAll('.news-card');
    const searchLower = searchText.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.news-item-title')?.textContent.toLowerCase() || '';
        const snippet = card.querySelector('.news-snippet')?.textContent.toLowerCase() || '';
        const source = card.querySelector('.news-source')?.textContent.toLowerCase() || '';

        // Check if any field matches the search term
        const matches = title.includes(searchLower) || 
                       snippet.includes(searchLower) || 
                       source.includes(searchLower);

        if (searchText === '' || matches) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    console.log(`Search: showing ${visibleCount} of ${cards.length} articles`);
}


// ============ CONTROL AGENT FUNCTIONS ============
var ctrlTickets = []; // Holds the raw ticket data
var ctrlCurrentId = null; // ID of the ticket being viewed in detail
var ctrlUsers = []; // List of users for assignment dropdowns
var ctrlTeams = []; // List of teams for assignment dropdowns

// Sample Data (Replace with actual data fetching/management)
function loadControlAgentData() {
    ctrlTickets = [
      {id:'TKT-001',title:'Reduce Stock Out Rate',status:'open',priority:'high', assignee:{name:'Sarah Chen',avatar:'SC'},assignor:{name:'Planning Agent'}, teamName:'Inventory',contextName:'Stock Out Rate',recommendedAction:'Implement buffer strategies for top 20 SKUs', description:'Rate is 4.8%, 140% above target (2%). Causing $280K/month lost sales. Linked to forecast inaccuracy and supplier delays.',skillsNeeded:['Inventory Management','Demand Forecasting','Safety Stock Calculation'], comments:[{user:'AI Control Agent', text:'Priority raised due to direct impact on OTIF and revenue.', timestamp:'2025-10-22 10:15'}], history:[{action:'Created', user:'Planning Agent', timestamp:'2025-10-21 14:30'}, {action:'Priority set to High', user:'AI Control Agent', timestamp:'2025-10-22 10:15'}], attachments:[]},
      {id:'TKT-002',title:'Improve Supplier Delivery',status:'in-progress',priority:'high', assignee:{name:'Michael Torres',avatar:'MT'},assignor:{name:'Planning Agent'}, teamName:'Procurement',contextName:'Supplier OTD',recommendedAction:'Conduct QBR with bottom quartile suppliers', description:'Supplier OTD at 91.5% vs 98% target. Bottom quartile at 87%. Focus on 3 critical suppliers below 90%.',skillsNeeded:['Supplier Relationship Management', 'Negotiation', 'Performance Analysis'], comments:[{user:'Michael Torres', text:'Scheduled reviews with Suppliers A & B. Supplier C unresponsive.', timestamp:'2025-10-23 09:00'}], history:[{action:'Created', user:'Planning Agent', timestamp:'2025-10-21 14:35'}, {action:'Assigned to M. Torres', user:'Ops Manager', timestamp:'2025-10-21 16:00'}, {action:'Status changed to In Progress', user:'Michael Torres', timestamp:'2025-10-22 08:45'}], attachments:[]},
      {id:'TKT-003',title:'Optimize Lead Time',status:'in-progress',priority:'medium', assignee:{name:'David Park',avatar:'DP'},assignor:{name:'Ops Manager'}, teamName:'Operations',contextName:'Lead Time',recommendedAction:'Map value stream for order fulfillment process', description:'Lead time is 12.3 days vs 8 target. Investigate bottlenecks in supplier processing and internal handling.',skillsNeeded:['Process Improvement','Value Stream Mapping', 'Lean Six Sigma'], comments:[], history:[{action:'Created', user:'Ops Manager', timestamp:'2025-10-22 11:00'}, {action:'Assigned to D. Park', user:'Ops Manager', timestamp:'2025-10-22 11:05'}, {action:'Status changed to In Progress', user:'David Park', timestamp:'2025-10-22 13:00'}], attachments:[]},
      {id:'TKT-004',title:'Unit Cost Reduction Analysis',status:'open',priority:'medium', assignee:{name:'Lisa Anderson',avatar:'LA'},assignor:{name:'Planning Agent'}, teamName:'Finance',contextName:'Cost Per Unit',recommendedAction:'Analyze cost drivers (materials, labor, energy) and identify saving opportunities', description:'Unit cost at $24.50 vs $22 target. Need to identify primary drivers for cost overrun beyond market inflation.',skillsNeeded:['Cost Accounting','Financial Analysis', 'Supply Chain Finance'], comments:[], history:[{action:'Created', user:'Planning Agent', timestamp:'2025-10-23 14:00'}], attachments:[]}
    ];

    ctrlUsers = [
      {name:'Sarah Chen',email:'sarah.chen@example.com',avatar:'SC', team:'Inventory'},
      {name:'Michael Torres',email:'michael.torres@example.com',avatar:'MT', team:'Procurement'},
      {name:'David Park',email:'david.park@example.com',avatar:'DP', team:'Operations'},
      {name:'Lisa Anderson',email:'lisa.anderson@example.com',avatar:'LA', team:'Finance'},
      {name:'John Doe',email:'john.doe@example.com',avatar:'JD', team:'Management'},
      {name:'AI Control Agent', email:'ai@example.com', avatar:'AI', team:'System'}
    ];

    ctrlTeams = ['Inventory','Procurement','Operations','Finance', 'Logistics', 'Management', 'System'];
}


function initCtrl() {
    loadControlAgentData(); // Load initial data
    renderCtrlKanban(); // Render the initial Kanban board
    // Initialize dropdowns or other static elements if needed
}

function renderCtrlKanban(filteredTickets) {
    const ticketsToRender = filteredTickets || ctrlTickets;

    // Clear current columns
    const columns = ['open', 'progress', 'resolved', 'closed'];
    columns.forEach(statusKey => {
        const colBody = document.getElementById(`ctrl-${statusKey}`);
        if(colBody) colBody.innerHTML = '';
    });

    let counts = { open: 0, progress: 0, resolved: 0, closed: 0 };
    let activeCount = 0;

    ticketsToRender.forEach(ticket => {
        const statusKey = ticket.status === 'in-progress' ? 'progress' : ticket.status;
        if (counts.hasOwnProperty(statusKey)) {
            counts[statusKey]++;
            if (ticket.status === 'open' || ticket.status === 'in-progress') {
                activeCount++;
            }

            const colBody = document.getElementById(`ctrl-${statusKey}`);
            if (colBody) {
                colBody.appendChild(createCtrlCardElement(ticket));
            }
        }
    });

    // Update counts
    document.getElementById('ctrl-open-count').textContent = counts.open;
    document.getElementById('ctrl-progress-count').textContent = counts.progress;
    document.getElementById('ctrl-resolved-count').textContent = counts.resolved;
    document.getElementById('ctrl-closed-count').textContent = counts.closed;
    document.getElementById('ctrl-total').textContent = ticketsToRender.length;
    document.getElementById('ctrl-active').textContent = activeCount;
}

function createCtrlCardElement(ticket) {
    const card = document.createElement('div');
    card.className = `ctrl-card pri-${ticket.priority}`;
    card.onclick = () => openCtrlDetail(ticket.id);
    card.innerHTML = `
        <div class="ctrl-card-id">${ticket.id}</div>
        <div class="ctrl-card-title">${ticket.title}</div>
        <div class="ctrl-card-meta">
            <span class="ctrl-avatar" title="${ticket.assignee.name}">${ticket.assignee.avatar}</span>
            <span class="ctrl-assignee-name">${ticket.assignee.name}</span>
            <span class="ctrl-badge ${ticket.priority}">${ticket.priority.toUpperCase()}</span>
        </div>
        <div class="ctrl-card-tag">${ticket.contextName}</div>`;
    return card;
}


function searchCtrlTickets(query) {
    const clearBtn = document.getElementById('ctrl-clear-btn');
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
        if(clearBtn) clearBtn.style.display = 'none';
        renderCtrlKanban(); // Render all tickets
        return;
    }

    if(clearBtn) clearBtn.style.display = 'inline-block'; // Show clear button

    const filtered = ctrlTickets.filter(t =>
        t.id.toLowerCase().includes(lowerQuery) ||
        t.title.toLowerCase().includes(lowerQuery) ||
        t.assignee.name.toLowerCase().includes(lowerQuery) ||
        t.contextName.toLowerCase().includes(lowerQuery) ||
        t.description.toLowerCase().includes(lowerQuery)
    );
    renderCtrlKanban(filtered);
}

function clearCtrlSearch() {
    const searchInput = document.getElementById('ctrl-search-input');
    const clearBtn = document.getElementById('ctrl-clear-btn');
    if(searchInput) searchInput.value = '';
    if(clearBtn) clearBtn.style.display = 'none';
    renderCtrlKanban(); // Render all tickets
}

function openCtrlDetail(id) {
    ctrlCurrentId = id;
    const ticket = ctrlTickets.find(t => t.id === id);
    if (!ticket) return;

    // Switch views
    document.getElementById('kanban-view-ctrl').classList.remove('active');
    document.getElementById('detail-view-ctrl').classList.add('active');

    // Populate header
    document.getElementById('detail-id').textContent = ticket.id;
    document.getElementById('detail-title').textContent = ticket.title;

    // Populate main details form
    document.getElementById('f-id').value = ticket.id;
    document.getElementById('f-status').value = ticket.status; // Now an input, not select
    document.getElementById('f-context').value = ticket.contextName;
    document.getElementById('f-assignor').value = ticket.assignor.name;
    document.getElementById('f-action').value = ticket.recommendedAction || '';
    document.getElementById('f-desc').value = ticket.description || '';

    // Populate Assignee dropdown
    const assigneeSelect = document.getElementById('f-assignee');
    assigneeSelect.innerHTML = ctrlUsers.map(u => `<option value="${u.email}" ${u.name === ticket.assignee.name ? 'selected' : ''}>${u.name}</option>`).join('');

    // Populate Team dropdown
    const teamSelect = document.getElementById('f-team');
    teamSelect.innerHTML = ctrlTeams.map(tm => `<option value="${tm}" ${tm === ticket.teamName ? 'selected' : ''}>${tm}</option>`).join('');

     // Render skills, activity
     renderCtrlSkills(ticket);
     renderCtrlActivity(ticket); // Render 'All' tab initially
     switchCtrlTab('all'); // Ensure 'All' tab is visibly active

    // Set action button based on status
    const actionBtn = document.getElementById('detail-action');
     actionBtn.style.display = 'block'; // Show button by default unless closed
     actionBtn.onclick = null; // Clear previous handler

     switch (ticket.status) {
         case 'open':
             actionBtn.textContent = 'Start Progress';
             actionBtn.onclick = () => updateCtrlStatus(id, 'in-progress');
             break;
         case 'in-progress':
             actionBtn.textContent = 'Mark Resolved';
             actionBtn.onclick = () => updateCtrlStatus(id, 'resolved');
             break;
         case 'resolved':
             actionBtn.textContent = 'Close Ticket';
             actionBtn.onclick = () => updateCtrlStatus(id, 'closed');
             break;
         case 'closed':
             actionBtn.style.display = 'none'; // Hide button if closed
             break;
     }

    // Setup watch and share buttons
    const watchBtn = document.getElementById('watch-btn');
    const shareBtn = document.getElementById('share-btn');

    if (watchBtn) {
        watchBtn.onclick = () => toggleWatchTicket(ticket.id);
        // Set active state if already watched
        if (watchedTickets.has(ticket.id)) {
            watchBtn.classList.add('active');
        } else {
            watchBtn.classList.remove('active');
        }
    }

    if (shareBtn) {
        shareBtn.onclick = () => shareTicket(ticket.id);
    }

     // Ensure sections are expanded by default when opening
     document.querySelectorAll('#detail-view-ctrl .ctrl-section').forEach(sec => {
         sec.classList.remove('collapsed');
         const arrow = sec.querySelector('.ctrl-toggle span');
         if (arrow) arrow.textContent = '▼';
     });
}

function closeCtrlDetail() {
    document.getElementById('detail-view-ctrl').classList.remove('active');
    document.getElementById('kanban-view-ctrl').classList.add('active');
    ctrlCurrentId = null; // Clear current ID
    // Optionally, refresh Kanban view if data could have changed
    renderCtrlKanban(); // Refresh kanban to show status changes
}

function updateCtrlStatus(id, newStatus) {
    const ticket = ctrlTickets.find(t => t.id === id);
    if (!ticket) return;

    const oldStatus = ticket.status;
    ticket.status = newStatus;

    // Add history entry
     const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
     ticket.history = ticket.history || [];
     ticket.history.push({ action: `Status changed from ${oldStatus} to ${newStatus}`, user: 'John Doe', timestamp }); // Use logged-in user

    // Refresh detail view if currently viewing this ticket
    if (ctrlCurrentId === id) {
        openCtrlDetail(id); // Re-render detail view with updated status and button
    }
     addCtrlChatMessage('assistant', `Ticket ${id} status updated to ${newStatus}.`); // AI confirmation
     // No need to call renderCtrlKanban here, happens when closing detail view
}


function renderCtrlSkills(ticket) {
    const container = document.getElementById('f-skills');
    if (!container) return;
    container.innerHTML = (ticket.skillsNeeded || [])
        .map(skill => `<span class="ctrl-chip">${skill}<button onclick="removeCtrlSkill('${skill}')">&times;</button></span>`)
        .join('');
}

function addCtrlSkill() {
    const input = document.getElementById('skill-input');
    const skill = input.value.trim();
    if (!skill || !ctrlCurrentId) return;

    const ticket = ctrlTickets.find(t => t.id === ctrlCurrentId);
    if (!ticket) return;

    ticket.skillsNeeded = ticket.skillsNeeded || [];
    if (!ticket.skillsNeeded.includes(skill)) {
        ticket.skillsNeeded.push(skill);
        renderCtrlSkills(ticket); // Re-render skills
         logCtrlHistory(`Added skill: ${skill}`);
    }
    input.value = ''; // Clear input
}

function removeCtrlSkill(skillToRemove) {
    if (!ctrlCurrentId) return;
    const ticket = ctrlTickets.find(t => t.id === ctrlCurrentId);
    if (!ticket || !ticket.skillsNeeded) return;

    ticket.skillsNeeded = ticket.skillsNeeded.filter(skill => skill !== skillToRemove);
    renderCtrlSkills(ticket); // Re-render skills
     logCtrlHistory(`Removed skill: ${skillToRemove}`);
}

function toggleCtrlSection(toggleElement) {
    const section = toggleElement.closest('.ctrl-section');
    const arrow = toggleElement.querySelector('span');
    if (section && arrow) {
        const isCollapsed = section.classList.toggle('collapsed');
        arrow.textContent = isCollapsed ? '▶' : '▼';
    }
}


function switchCtrlTab(tabName) {
     const tabContext = document.getElementById('detail-view-ctrl'); // Context for selectors
    if (!tabContext) return;

    // Deactivate all buttons and panes within the detail view context
    tabContext.querySelectorAll('.ctrl-tabs button').forEach(btn => btn.classList.remove('active'));
    tabContext.querySelectorAll('.ctrl-tab-pane').forEach(pane => pane.classList.remove('active'));

    // Activate the selected button and pane
     const activeButton = tabContext.querySelector(`.ctrl-tabs button[onclick*="switchCtrlTab('${tabName}')"]`);
     const activePane = tabContext.querySelector(`#tab-${tabName}`);

     if (activeButton) activeButton.classList.add('active');
     if (activePane) activePane.classList.add('active');

    // Optionally re-render content if needed (e.g., if data updates frequently)
    const ticket = ctrlTickets.find(t => t.id === ctrlCurrentId);
    if (!ticket) return;
     if (tabName === 'all') renderCtrlActivity(ticket);
     if (tabName === 'comments') renderCtrlComments(ticket); // Make sure comment list is up-to-date
     if (tabName === 'history') renderCtrlHistory(ticket); // Make sure history list is up-to-date
}

function renderCtrlActivity(ticket) {
    const container = document.getElementById('tab-all');
    if (!container) return;

    const comments = ticket.comments || [];
    const history = ticket.history || [];
    const combined = [
        ...comments.map(c => ({ ...c, type: 'comment' })),
        ...history.map(h => ({ ...h, type: 'history' }))
    ];

    // Sort by timestamp descending (most recent first)
    combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    container.innerHTML = combined.map(item => `
        <div class="ctrl-timeline-item">
             <div class="ctrl-timeline-header">
                 <strong>${item.user}</strong>
                 <span class="ctrl-time">${formatTimestamp(item.timestamp)}</span>
            </div>
            <div class="ctrl-timeline-body">
                ${item.type === 'comment' ? item.text : `<em>${item.action}</em>`}
            </div>
        </div>`).join('');
}

function renderCtrlComments(ticket) {
     const container = document.getElementById('comments-list');
     if (!container) return;
     const comments = (ticket.comments || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort recent first

     container.innerHTML = comments.map(c => `
         <div class="ctrl-timeline-item">
             <div class="ctrl-timeline-header">
                 <strong>${c.user}</strong>
                 <span class="ctrl-time">${formatTimestamp(c.timestamp)}</span>
             </div>
             <div class="ctrl-timeline-body">${c.text}</div>
         </div>`).join('') || '<p>No comments yet.</p>'; // Show message if empty
}

function renderCtrlHistory(ticket) {
     const container = document.getElementById('history-list');
      if (!container) return;
     const history = (ticket.history || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort recent first

     container.innerHTML = history.map(h => `
         <div class="ctrl-timeline-item">
              <div class="ctrl-timeline-header">
                 <strong>${h.user}</strong>
                 <span class="ctrl-time">${formatTimestamp(h.timestamp)}</span>
             </div>
             <div class="ctrl-timeline-body"><em>${h.action}</em></div>
         </div>`).join('') || '<p>No history yet.</p>'; // Show message if empty
}

function addCtrlComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text || !ctrlCurrentId) return;

    const ticket = ctrlTickets.find(t => t.id === ctrlCurrentId);
    if (!ticket) return;

     const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    ticket.comments = ticket.comments || [];
    ticket.comments.push({ user: 'John Doe', text: text, timestamp }); // Use logged-in user

    input.value = ''; // Clear input

    // Re-render comments and 'All' tab immediately
    renderCtrlComments(ticket);
    renderCtrlActivity(ticket);
    // Also log history
     logCtrlHistory('Added a comment');
}

function logCtrlHistory(action) {
     if (!ctrlCurrentId) return;
     const ticket = ctrlTickets.find(t => t.id === ctrlCurrentId);
     if (!ticket) return;
     const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
     ticket.history = ticket.history || [];
     ticket.history.push({ action: action, user: 'John Doe', timestamp }); // Use logged-in user
    // Re-render history and 'All' tab
     renderCtrlHistory(ticket);
     renderCtrlActivity(ticket);
}

// Helper to format timestamp
function formatTimestamp(isoString) {
     if (!isoString) return '';
    try {
        const date = new Date(isoString);
         // Format: Oct 23, 2025, 4:30 PM
         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' +
                date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch (e) {
        return isoString; // Fallback to original string if parsing fails
    }
}


// ========== CONTROL AGENT CHAT FUNCTIONS ==========
// Handles chat in both Control Agent Tab and Analytics Studio Tab
function addCtrlChatMessage(role, content, context = 'control') {
    const messagesId = context === 'analytics' ? 'ctrl-chat-messages-analytics' : 'ctrl-chat-messages';
    const messagesContainer = document.getElementById(messagesId);
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        if (role === 'user') {
            bubble.textContent = content;
        } else {
             bubble.innerHTML = content.replace(/\n/g, '<br>');
        }
         messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function handleCtrlChatKeyPress(event, context = 'control') {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendCtrlChatMessage(context);
    }
}

function sendCtrlChatMessage(context = 'control') {
     // Determine the correct input field based on context
     const inputSelector = context === 'analytics'
         ? '#analytics-studio .chat-panel .chat-input-field'
         : '#control-agent .chat-panel .chat-input-field'; // Changed #placeholder1 to #control-agent
     const input = document.querySelector(inputSelector);

    if (!input) {
        console.error(`Chat input not found for context: ${context}`);
        return;
    }
    const message = input.value.trim();
    if (!message) return;

    addCtrlChatMessage('user', message, context);
    input.value = '';

    setTimeout(() => {
        const response = generateCtrlAIResponse(message);
        addCtrlChatMessage('assistant', response, context);
    }, 800);
}

function generateCtrlAIResponse(message) {
     const lowerMessage = message.toLowerCase();
     const ticketMatch = lowerMessage.match(/tkt-(\d{3})/); // Find ticket ID like TKT-XXX

    if (ticketMatch) {
         const ticketId = `TKT-${ticketMatch[1]}`;
         const ticket = ctrlTickets.find(t => t.id === ticketId);
         if (ticket) {
             return `<b>Ticket ${ticket.id} (${ticket.title}):</b><br>
                    • Status: ${ticket.status}<br>
                    • Assignee: ${ticket.assignee.name} (${ticket.teamName})<br>
                    • Priority: ${ticket.priority}<br>
                    • Context: ${ticket.contextName}<br>
                    • Recommendation: ${ticket.recommendedAction}<br>
                     Would you like to see recent comments or history?`;
         } else {
             return `Sorry, I couldn't find ticket ${ticketId}. Please check the ID.`;
         }
     }

     if (lowerMessage.includes('priority') || lowerMessage.includes('urgent') || lowerMessage.includes('important')) {
         const highPriority = ctrlTickets.filter(t => t.priority === 'high' && t.status !== 'closed' && t.status !== 'resolved');
         if (highPriority.length > 0) {
              return `Currently, there are ${highPriority.length} high priority tickets requiring attention:<br>` +
                     highPriority.map(t => ` • <b>${t.id}</b> (${t.title}) - Status: ${t.status}`).join('<br>');
         } else {
              return "There are currently no open high priority tickets.";
         }
     }
      if (lowerMessage.includes('assign') || lowerMessage.includes('who should take')) {
           // Simple suggestion logic (can be much more complex)
           if (lowerMessage.includes('tkt-001') || lowerMessage.includes('stock out')) return "TKT-001 involves Inventory Management and Forecasting. Sarah Chen (Inventory) is assigned. David Park (Operations) could also assist.";
           if (lowerMessage.includes('tkt-004') || lowerMessage.includes('cost')) return "TKT-004 requires Financial Analysis. Lisa Anderson (Finance) is assigned, which seems appropriate.";
           return "Which ticket are you asking about assigning? Knowing the required skills helps me suggest the best person.";
      }
       if (lowerMessage.includes('skills for') && ticketMatch) {
            const ticketId = `TKT-${ticketMatch[1]}`;
            const ticket = ctrlTickets.find(t => t.id === ticketId);
           if (ticket && ticket.skillsNeeded && ticket.skillsNeeded.length > 0) {
               return `Ticket ${ticket.id} requires skills in: ${ticket.skillsNeeded.join(', ')}.`;
           } else if (ticket) {
                return `No specific skills listed for Ticket ${ticket.id}. You might want to add some based on the description.`;
           } else {
                return `Sorry, I couldn't find ticket ${ticketId}.`;
           }
       }


     // Generic fallback
     const responses = [
         "I can provide details on specific tickets (e.g., 'status of TKT-002'), find urgent tasks ('show high priority tickets'), or suggest assignees based on skills. How can I help?",
         "The Control Agent helps manage actions derived from KPI analysis. What information do you need?",
         "Ask me about ticket details, priorities, assignments, or required skills.",
     ];
     return responses[Math.floor(Math.random() * responses.length)];
}


// ========== SIMULATION CODE (Ported from app.js with 'sim' prefix) ==========

const simAppData = {
  "kpis": [
    // Using subset related to Supply Chain from main data, add targets/types
    { id: "OTIF", name: "OTIF Performance", target: 95, current: 87.2, predicted: 87.2, unit: "%", status: "Below Target", type: "positive" },
    { id: "Stock Out Rate", name: "Stock Out Rate", target: 2, current: 4.8, predicted: 4.8, unit: "%", status: "Above Target", type: "negative" },
    { id: "Lead Time", name: "Lead Time", target: 8, current: 12.3, predicted: 12.3, unit: "days", status: "Above Target", type: "negative" },
    { id: "Cost Per Unit", name: "Cost Per Unit", target: 22, current: 24.50, predicted: 24.50, unit: "$", status: "Above Target", type: "negative" },
    { id: "Production Efficiency", name: "Production Efficiency", target: 85, current: 78.9, predicted: 78.9, unit: "%", status: "Below Target", type: "positive" },
    { id: "Warehouse Utilization", name: "Warehouse Utilization", target: 88, current: 92.1, predicted: 92.1, unit: "%", status: "Above Target", type: "positive"}
   ],
  "sliders": [
    // More relevant sliders for Supply Chain
     { id: "supplier_reliability", label: "Supplier Reliability", min: 80, max: 100, current: 91.5, unit: "% OTD", affects: ["OTIF", "Stock Out Rate", "Lead Time"] },
     { id: "inventory_levels", label: "Safety Stock Factor", min: 1.0, max: 3.0, current: 1.5, unit: "x StdDev", affects: ["Stock Out Rate", "Cost Per Unit", "Warehouse Utilization"] },
     { id: "forecast_accuracy", label: "Forecast Accuracy", min: 70, max: 95, current: 82.7, unit: "%", affects: ["Stock Out Rate", "OTIF", "Inventory Turnover"] }, // Assumes Inv Turnover KPI exists if used
     { id: "production_uptime", label: "Production Uptime", min: 80, max: 99, current: 92, unit: "%", affects: ["Production Efficiency", "Cost Per Unit", "Lead Time"] },
     { id: "logistics_speed", label: "Logistics Speed", min: 1, max: 5, current: 3, unit: " Index", affects: ["Lead Time", "OTIF", "Cost Per Unit"] },
     { id: "labor_efficiency", label: "Labor Efficiency", min: 70, max: 110, current: 95, unit: "% vs Std", affects: ["Production Efficiency", "Cost Per Unit", "Warehouse Utilization"]}
  ],
   "recommendationTemplates": [
     { id: "improve_forecast", title: "Improve Forecast Accuracy", description: "Invest in demand sensing tools to increase forecast accuracy to {{value}}%", impact: "Expected reduction in Stock Out Rate by ~{{impact}}%", trigger: "forecast_accuracy", condition: "below_85_and_sor_above_target", targetValue: 88, targetKPI: "Stock Out Rate" },
     { id: "increase_safety_stock", title: "Increase Safety Stock", description: "Adjust safety stock factor to {{value}}x StdDev to mitigate stockouts", impact: "Expected decrease in Stock Out Rate by ~{{impact}}%", trigger: "inventory_levels", condition: "below_2_and_sor_above_target", targetValue: 2.0, targetKPI: "Stock Out Rate" },
     { id: "enhance_supplier_collab", title: "Enhance Supplier Collaboration", description: "Implement supplier portal & scorecards to target {{value}}% OTD", impact: "Expected improvement in OTIF by ~{{impact}}%", trigger: "supplier_reliability", condition: "below_95_and_otif_below_target", targetValue: 96, targetKPI: "OTIF" },
     { id: "optimize_logistics", title: "Optimize Logistics Network", description: "Engage logistics partners to improve speed index to {{value}}", impact: "Expected reduction in Lead Time by ~{{impact}} days", trigger: "logistics_speed", condition: "above_2_and_lt_above_target", targetValue: 4, targetKPI: "Lead Time" },
     { id: "boost_prod_uptime", title: "Boost Production Uptime", description: "Invest in predictive maintenance to reach {{value}}% uptime", impact: "Expected increase in Production Efficiency by ~{{impact}}%", trigger: "production_uptime", condition: "below_95_and_pe_below_target", targetValue: 97, targetKPI: "Production Efficiency" }
 ]
};

// Current slider values and recommendations state for Simulation
let simCurrentValues = {};
let simBaselineValues = {};
let simPreviousKPIValues = {};
// let simActiveRecommendations = []; // This wasn't used in original app.js logic
let simRecommendationStates = {}; // Track accepted/rejected states for Simulation

// Business Logic Functions (Prefixed with sim)
function simCalculateImpact(sliderId, newValue, originalValue) {
  const impact = {};
  const change = newValue - originalValue;

   // More relevant impact logic for Supply Chain sliders
  switch(sliderId) {
    case 'supplier_reliability':
      impact["OTIF"] = (change / 2); // Direct impact
      impact["Stock Out Rate"] = (change / 3) * -1; // Higher reliability reduces stockouts
      impact["Lead Time"] = (change / 4) * -1; // More reliable suppliers might be faster overall
      break;

    case 'inventory_levels': // Safety Stock Factor
      impact["Stock Out Rate"] = (change / 0.2) * -1.5; // Higher factor drastically reduces stockouts
      impact["Cost Per Unit"] = (change / 0.5) * 0.5; // Higher inventory increases holding cost -> unit cost
      impact["Warehouse Utilization"] = (change / 0.5) * 1.2; // More stock uses more space
      break;

    case 'forecast_accuracy':
      impact["Stock Out Rate"] = (change / 3) * -1.2; // Better forecast reduces stockouts
      impact["OTIF"] = (change / 5); // Better forecast helps meet demand on time
      // impact["Inventory Turnover"] = (change / 5); // Needs Inventory Turnover KPI
      break;

    case 'production_uptime':
      impact["Production Efficiency"] = (change / 2); // Direct link
      impact["Cost Per Unit"] = (change / 3) * -0.8; // More uptime, lower cost per unit usually
      impact["Lead Time"] = (change / 5) * -0.5; // Less downtime can shorten production lead time
      break;

     case 'logistics_speed': // Index 1 (slow) to 5 (fast)
         const speedChange = newValue - originalValue; // Higher value means faster
         impact["Lead Time"] = speedChange * -0.8; // Faster speed reduces lead time
         impact["OTIF"] = speedChange * 0.5; // Faster speed helps OTIF
         impact["Cost Per Unit"] = speedChange * 0.3; // Faster speed usually costs more
         break;

     case 'labor_efficiency': // % vs Standard
         impact["Production Efficiency"] = (change / 5);
         impact["Cost Per Unit"] = (change / 5) * -0.7;
         impact["Warehouse Utilization"] = (change / 10) * -0.5; // More efficient labor might optimize space use
         break;
  }

  return impact;
}


function simCalculateAllImpacts() {
  const totalImpacts = {};
  simAppData.kpis.forEach(kpi => { totalImpacts[kpi.id] = 0; });

  simAppData.sliders.forEach(slider => {
    const impact = simCalculateImpact(slider.id, simCurrentValues[slider.id], simBaselineValues[slider.id]);
    Object.keys(impact).forEach(kpiId => {
      if (totalImpacts[kpiId] !== undefined) {
        totalImpacts[kpiId] += impact[kpiId];
      }
    });
  });
  return totalImpacts;
}

function simGetStatus(kpi, newValue) {
    const target = kpi.target;
    const isPositive = kpi.type === 'positive'; // Higher is better

    if (isPositive) {
        if (newValue >= target) return 'Above Target'; // Good
        if (newValue >= target * 0.9) return 'Near Target'; // Okay
        return 'Below Target'; // Bad
    } else { // Negative type (lower is better)
        if (newValue <= target) return 'Below Target'; // Good
        if (newValue <= target * 1.1) return 'Near Target'; // Okay
        return 'Above Target'; // Bad
    }
}

function simFormatValue(value, unit) {
  if (!unit) return Math.round(value * 10) / 10; // Default if no unit
  if (unit === 'customers' || unit === ' Index' || unit === 'x StdDev') {
     // Format without decimals for index, factor, or integer units
     if (unit === 'x StdDev') return (Math.round(value * 10) / 10) + unit; // Keep one decimal for factor
     return Math.round(value) + unit;
  }
   if (unit === '$') {
       return unit + value.toFixed(2); // Keep two decimals for currency
   }
  return (Math.round(value * 10) / 10) + unit; // Default: one decimal
}


function simFormatChangeValue(change, unit) {
  const formattedChange = simFormatValue(Math.abs(change), unit).replace(unit, '').trim(); // Format absolute value, remove unit temporarily
  const sign = change >= 0 ? '+' : '-';

   // Re-add unit correctly based on type
    if (unit === '$') {
       return `${sign}${unit}${formattedChange}`;
   } else if (unit) {
       return `${sign}${formattedChange}${unit}`;
   } else {
        return `${sign}${formattedChange}`;
   }
}


function simCalculateImprovementPercentage(current, predicted, target, type) {
    // Avoid division by zero or nonsensical calculation if current already meets target significantly
     const tolerance = 0.01; // Small tolerance
    if (type === 'positive') {
         if (current >= target - tolerance) return 0; // Already at or above target
         const potentialGain = target - current;
         const actualGain = predicted - current;
         if (potentialGain <= 0) return actualGain > 0 ? 100 : 0; // Handle edge case where target is below current
         return Math.max(-100, Math.min(100, (actualGain / potentialGain) * 100)); // Cap at +/- 100%
    } else { // Negative type (lower is better)
         if (current <= target + tolerance) return 0; // Already at or below target
         const potentialReduction = current - target;
         const actualReduction = current - predicted;
         if (potentialReduction <= 0) return actualReduction > 0 ? 100 : 0; // Handle edge case where target is above current
         return Math.max(-100, Math.min(100, (actualReduction / potentialReduction) * 100)); // Cap at +/- 100%
    }
}


// Recommendation Logic (Prefixed with sim)
function simCheckRecommendationCondition(template) {
     const currentValue = simCurrentValues[template.trigger];
     const kpi = simAppData.kpis.find(k => k.id === template.targetKPI); // Use targetKPI from template

     if (!kpi) return false;

     switch (template.condition) {
         case 'below_85_and_sor_above_target':
             return currentValue < 85 && kpi.predicted > kpi.target;
         case 'below_2_and_sor_above_target':
             return currentValue < 2.0 && kpi.predicted > kpi.target;
         case 'below_95_and_otif_below_target':
             return currentValue < 95 && kpi.predicted < kpi.target;
          case 'above_2_and_lt_above_target': // For logistics speed (higher index is better, but affects LT negatively)
              // Condition needs review: Trigger value is speed index (higher=better). Target KPI is Lead Time (lower=better)
              // Let's assume the condition means speed index is low (<4) AND lead time is high (> target)
              return currentValue < 4 && kpi.predicted > kpi.target;
          case 'below_95_and_pe_below_target':
             return currentValue < 95 && kpi.predicted < kpi.target;
         default:
             return false;
     }
}

function simGenerateRecommendations() {
    const newRecommendations = [];
    simAppData.recommendationTemplates.forEach(template => {
        if (simRecommendationStates[template.id]) return; // Skip if already actioned

        if (simCheckRecommendationCondition(template)) {
            const slider = simAppData.sliders.find(s => s.id === template.trigger);
            if (!slider) return;

             // Calculate rough impact estimate for display
             const kpi = simAppData.kpis.find(k => k.id === template.targetKPI);
             let impactValue = 0;
             if(kpi) {
                 const currentSimVal = simCurrentValues[template.trigger];
                 const targetSimVal = template.targetValue;
                 const impactPerUnit = simCalculateImpact(template.trigger, currentSimVal + 1, currentSimVal)[template.targetKPI] || 0; // Estimate impact of 1 unit change
                 impactValue = Math.abs(impactPerUnit * (targetSimVal - currentSimVal));

                 // Adjust impact display for Lead Time
                  if (template.targetKPI === 'Lead Time') {
                       impactValue = impactValue.toFixed(1); // Format days impact
                  } else {
                       impactValue = Math.round(impactValue); // Format percentage impact
                  }
             }


            const recommendation = {
                ...template,
                description: template.description.replace('{{value}}', template.targetValue),
                 impact: template.impact.replace('{{impact}}', impactValue), // Use calculated impact
                currentSliderValue: simCurrentValues[template.trigger],
                sliderUnit: slider?.unit || ''
            };
            newRecommendations.push(recommendation);
        }
    });
    return newRecommendations;
}


// Animation functions (Prefixed with sim) - Can potentially reuse existing ones if generic enough
function simAnimateValueChange(element, startValue, endValue, unit, duration = 600) { // Slightly faster duration
  const startTime = performance.now();
  const valueDiff = endValue - startValue;

  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 4); // Smoother easing (quartic)
    const currentValue = startValue + (valueDiff * easedProgress);

    element.textContent = simFormatValue(currentValue, unit); // Use sim formatter

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
         element.textContent = simFormatValue(endValue, unit); // Ensure final value is exact
    }
  }
  requestAnimationFrame(updateValue);
}


// UI Generation Functions (Prefixed with sim)
function simGenerateKPICard(kpi) {
  // Uses classes from the integrated styles.css (matching original app.js output)
  return `
    <div class="kpi-card" data-sim-kpi="${kpi.id}" data-kpi-type="${kpi.type}">
      <div class="kpi-header">
        <div class="kpi-name">${kpi.name}</div>
        <div class="kpi-status ${kpi.status.toLowerCase().replace(/ /g, '-')}" data-sim-status>
          ${kpi.status}
        </div>
      </div>

      <div class="kpi-values">
        <div class="kpi-current">
          <span class="current-label">Current:</span>
          <span class="current-value">${simFormatValue(kpi.current, kpi.unit)}</span>
        </div>

        <div class="kpi-predicted">
          <span class="predicted-label">Predicted:</span>
          <div class="predicted-value-container">
            <span class="predicted-value" data-sim-predicted>${simFormatValue(kpi.predicted, kpi.unit)}</span>
            <span class="change-arrow" data-sim-arrow></span>
          </div>
        </div>

        <div class="change-value" data-sim-change></div>
      </div>

      <div class="improvement-container">
        <div class="improvement-percentage neutral" data-sim-improvement>
          vs Target
        </div>
        <div class="target-indicator">
          Target: ${simFormatValue(kpi.target, kpi.unit)}
        </div>
      </div>
    </div>
  `;
}

function simGenerateSlider(slider) {
   // Uses classes from the integrated styles.css
  return `
    <div class="slider-group" data-sim-slider="${slider.id}">
      <div class="slider-label">
        <span class="slider-name">${slider.label}</span>
        <span class="slider-value" data-sim-value>${simFormatValue(slider.current, slider.unit)}</span>
      </div>
      <input
        type="range"
        class="slider-input"
        data-sim-input
        min="${slider.min}"
        max="${slider.max}"
        value="${slider.current}"
        step="${slider.unit === ' Index' || slider.unit === 'x StdDev' ? 0.1 : (slider.unit === '%' ? 0.5 : 1)}"
      >
      <div class="slider-range">
        <span>${simFormatValue(slider.min, slider.unit)}</span>
        <span>${simFormatValue(slider.max, slider.unit)}</span>
      </div>
    </div>
  `;
}


function simGenerateRecommendationCard(recommendation) {
    const isAccepted = simRecommendationStates[recommendation.id] === 'accepted';
    const isRejected = simRecommendationStates[recommendation.id] === 'rejected';
     // Using btn classes from main styles.css
    return `
    <div class="recommendation-card ${isAccepted ? 'accepted' : ''} ${isRejected ? 'rejected' : ''}" data-sim-recommendation="${recommendation.id}">
        <div class="recommendation-header">
            <div class="recommendation-title">${recommendation.title}</div>
        </div>
        <div class="recommendation-body">
            <div class="recommendation-description">${recommendation.description}</div>
            <div class="recommendation-impact">${recommendation.impact}</div>
        </div>
        ${!isAccepted && !isRejected ? `
        <div class="recommendation-actions">
            <button class="reject-btn" data-sim-reject="${recommendation.id}">Reject</button> <button class="accept-btn" data-sim-accept="${recommendation.id}">Accept</button> </div>
        ` : isAccepted ? `
        <div class="recommendation-actions">
            <div style="color: var(--success-color); font-weight: 600;">✓ Accepted</div> </div>
        ` : `
        <div class="recommendation-actions">
            <div style="color: var(--warning-color); font-weight: 600;">✗ Rejected</div> </div>
        `}
    </div>
    `;
}

// Update Functions (Prefixed with sim)
function simUpdateKPIDisplay(kpiId) {
    const card = document.querySelector(`[data-sim-kpi="${kpiId}"]`);
    if (!card) return;

    const kpi = simAppData.kpis.find(k => k.id === kpiId);
    if (!kpi) return;

    const predictedElement = card.querySelector('[data-sim-predicted]');
    const arrowElement = card.querySelector('[data-sim-arrow]');
    const changeElement = card.querySelector('[data-sim-change]');
    const statusElement = card.querySelector('[data-sim-status]');
    const improvementElement = card.querySelector('[data-sim-improvement]');

    const newValue = kpi.predicted;
    const prevValue = simPreviousKPIValues[kpiId] || kpi.current; // Use previous predicted or initial current
    const actualChange = newValue - prevValue;

     // --- Animate Predicted Value and Show Arrow ---
     if (Math.abs(actualChange) > 0.01) { // Only animate if change is significant
         simAnimateValueChange(predictedElement, prevValue, newValue, kpi.unit);
         card.classList.add('changing');
         setTimeout(() => card.classList.remove('changing'), 600); // Animation duration

         arrowElement.classList.remove('visible', 'up', 'down');
         setTimeout(() => {
              const isPositiveChangeGood = kpi.type === 'positive';
              const isImproving = (isPositiveChangeGood && actualChange > 0) || (!isPositiveChangeGood && actualChange < 0);

             if (actualChange !== 0) {
                 arrowElement.textContent = actualChange > 0 ? '▲' : '▼'; // Use simpler arrows
                 arrowElement.classList.add('visible', actualChange > 0 ? 'up' : 'down');
                 card.classList.toggle('improving', isImproving);
                 card.classList.toggle('declining', !isImproving);
             }
         }, 100); // Delay for effect
     } else {
         predictedElement.textContent = simFormatValue(newValue, kpi.unit); // Update instantly if no animation
         arrowElement.classList.remove('visible');
         card.classList.remove('improving', 'declining');
     }

     // --- Update Total Change Display ---
     const totalChange = newValue - kpi.current;
     changeElement.textContent = simFormatChangeValue(totalChange, kpi.unit);
     changeElement.classList.remove('visible', 'positive', 'negative');
      if (Math.abs(totalChange) > 0.01) {
         setTimeout(() => {
             changeElement.classList.add('visible');
              const isPositiveChangeGood = kpi.type === 'positive';
              const isOverallImprovement = (isPositiveChangeGood && totalChange > 0) || (!isPositiveChangeGood && totalChange < 0);
             changeElement.classList.toggle('positive', isOverallImprovement);
             changeElement.classList.toggle('negative', !isOverallImprovement);
         }, 200); // Delay slightly
      }


    // --- Update Status ---
    const newStatus = simGetStatus(kpi, newValue);
    const oldStatus = kpi.status; // Store old status

    if (newStatus !== oldStatus) {
        statusElement.classList.add('changing-status');
        setTimeout(() => {
            statusElement.textContent = newStatus;
            // *** Ensure this line correctly generates the class name ***
            statusElement.className = `kpi-status ${newStatus.toLowerCase().replace(/ /g, '-')}`;
            kpi.status = newStatus; // Update data object
            setTimeout(() => statusElement.classList.remove('changing-status'), 400);
        }, 200);
    }
     else {
         // Ensure correct class even if status text is same (e.g., on initial load)
         statusElement.className = `kpi-status ${newStatus.toLowerCase().replace(/ /g, '-')}`;
         statusElement.textContent = newStatus;
     }

     // --- Update Improvement Percentage ---
     const improvementPercent = simCalculateImprovementPercentage(kpi.current, newValue, kpi.target, kpi.type);
     let improvementText, improvementClass;

      const roundedPercent = Math.round(improvementPercent);
      if (Math.abs(roundedPercent) < 1 || (kpi.type === 'positive' && kpi.current >= kpi.target) || (kpi.type === 'negative' && kpi.current <= kpi.target) ) {
           // If already meeting target or change is negligible
           improvementText = 'vs Target';
           improvementClass = 'neutral';
           // Check if PREDICTED value meets target
           if ((kpi.type === 'positive' && newValue >= kpi.target) || (kpi.type === 'negative' && newValue <= kpi.target)) {
               improvementText = 'Target Met';
               improvementClass = 'positive'; // Show as positive if target is met/exceeded
           }

      }
       else {
         const sign = roundedPercent > 0 ? '+' : '';
         improvementText = `${sign}${roundedPercent}% to Target`; // Show progress
         improvementClass = roundedPercent > 0 ? 'positive' : 'negative';
      }

      improvementElement.textContent = improvementText;
      improvementElement.className = `improvement-percentage ${improvementClass}`;

    simPreviousKPIValues[kpiId] = newValue;
}


function simUpdateAllKPIs() {
  const impacts = simCalculateAllImpacts();
  simAppData.kpis.forEach(kpi => {
    const impact = impacts[kpi.id] || 0;
    // Apply impact, ensuring value doesn't go below zero (or other logical floor)
      let newValue = kpi.current + impact;
      if (kpi.unit === '%' && newValue > 100) newValue = 100; // Cap % at 100
       if (newValue < 0 && kpi.id !== 'Cost Per Unit') newValue = 0; // Prevent negative values generally, allow for cost?
       // Add specific floors if needed (e.g., Lead Time shouldn't be negative)
       if (kpi.id === 'Lead Time' && newValue < 1) newValue = 1;

     kpi.predicted = newValue; // Update the predicted value in the data
     simUpdateKPIDisplay(kpi.id); // Trigger UI update for this KPI
  });
  simUpdateRecommendations(); // Update recommendations based on new predicted values
}


function simUpdateRecommendations() {
    const recommendations = simGenerateRecommendations();
    const container = document.getElementById('sim-recommendations-container');
    const noRecsElement = container.querySelector('.no-recommendations');

    if (recommendations.length === 0) {
        // Clear existing cards and show 'no recommendations' message
        container.innerHTML = `<div class="no-recommendations"><p>No specific recommendations based on the current scenario. Adjust controls further.</p></div>`;
    } else {
         // If 'no recommendations' message exists, remove it
         if (noRecsElement) {
            noRecsElement.remove();
        }
        // Generate and potentially update recommendation cards
        // Simple approach: Replace all cards
        container.innerHTML = recommendations.map(rec => simGenerateRecommendationCard(rec)).join('');
        simAttachRecommendationEventListeners(); // Re-attach listeners after regenerating cards
    }
}

function simHighlightAffectedKPIs(sliderAffects) {
  document.querySelectorAll('#sim-kpi-grid .kpi-card').forEach(card => { // Target only simulation KPIs
    card.classList.remove('highlight');
  });
  sliderAffects.forEach(kpiId => {
    const card = document.querySelector(`[data-sim-kpi="${kpiId}"]`); // Use data-sim-kpi
    if (card) card.classList.add('highlight');
  });
}

function simRemoveAllHighlights() {
  console.log("simRemoveAllHighlights called"); // Debugging
  document.querySelectorAll('#sim-kpi-grid .kpi-card').forEach(card => {
    card.classList.remove('highlight');
  });
}

// Event Handlers (Prefixed with sim)
function simHandleSliderChange(sliderId, newValueStr) {
    const slider = simAppData.sliders.find(s => s.id === sliderId);
    if (!slider) return;

    simHighlightAffectedKPIs(slider.affects || []); // Highlight affected KPIs on change

    // Parse value, handle potential step=0.1 for specific sliders
     let newValue = parseFloat(newValueStr);
     // Optional: Round to one decimal place if step is 0.1
     if (slider.unit === ' Index' || slider.unit === 'x StdDev') {
          newValue = Math.round(newValue * 10) / 10;
     } else if (slider.unit === '%') {
         newValue = Math.round(newValue * 10) / 10; // Allow half percentages maybe?
     }
      else {
          newValue = Math.round(newValue); // Round other units to whole numbers
     }


    simCurrentValues[sliderId] = newValue; // Update the current value store

    const sliderGroup = document.querySelector(`[data-sim-slider="${sliderId}"]`);
    if (sliderGroup) {
        const valueDisplay = sliderGroup.querySelector('[data-sim-value]');
        if (valueDisplay) {
            valueDisplay.textContent = simFormatValue(newValue, slider.unit); // Use sim formatter
        }
    }

    // Track pending changes - DON'T update KPIs yet
    const oldValue = simCurrentValues[sliderId] || simBaselineValues[sliderId] || newValue;
    if (!window.simPendingChanges) window.simPendingChanges = {};
    simPendingChanges[sliderId] = {
        oldValue: oldValue,
        newValue: newValue,
        label: slider.label,
        unit: slider.unit
    };

    // DON'T call simUpdateAllKPIs() here - wait for Simulate button click
}


function simHandleSliderHover(sliderId, isHovering) {
  // Fetch fresh slider data *every time* to ensure accuracy
  const slider = simAppData.sliders.find(s => s.id === sliderId);
  console.log(`Hover event: sliderId=${sliderId}, isHovering=${isHovering}, foundSlider=${!!slider}`); // Debugging log

  if (!slider) {
      console.error(`Slider data not found for ID: ${sliderId}`);
      simHideTooltip(); // Hide tooltip if slider data is missing
      return;
  }

  // Get the specific affects list for THIS slider
  const affectsList = slider.affects || []; // Use empty array as fallback
  console.log("Slider affects:", affectsList); // Debugging log

  if (isHovering) {
         const slider = simAppData.sliders.find(s => s.id === sliderId);
         if(slider) {
            console.log(`(simHandleSliderHover) Hover event: sliderId=${sliderId}`); // Debugging log
            const affectsList = slider.affects || [];
            simHighlightAffectedKPIs(affectsList);
            simShowTooltip(affectsList);
         }
     }
}

function simShowTooltip(affectedKPIs) {
    console.log("simShowTooltip received affects:", affectedKPIs); // Debugging log
    const tooltip = document.getElementById('sim-tooltip');
    const kpisList = document.getElementById('sim-tooltip-kpis');

    if (!tooltip || !kpisList) {
        // console.error("Tooltip elements (sim-tooltip or sim-tooltip-kpis) not found!");
        // FIX: Create tooltip elements if they don't exist (copy from missing function)
        if (!tooltip) {
            const newTooltip = document.createElement('div');
            newTooltip.id = 'sim-tooltip';
            newTooltip.className = 'tooltip'; // Add a general class if needed
            // Add basic tooltip styles if styles.css is missing .tooltip
            newTooltip.style.position = 'fixed';
            newTooltip.style.display = 'none';
            newTooltip.style.background = 'rgba(0,0,0,0.8)';
            newTooltip.style.color = 'white';
            newTooltip.style.padding = '8px 12px';
            newTooltip.style.borderRadius = '6px';
            newTooltip.style.zIndex = '3000';
            newTooltip.style.pointerEvents = 'none';
            newTooltip.style.transition = 'opacity 0.2s';
            
            newTooltip.innerHTML = `<div class="tooltip-title" id="sim-tooltip-title" style="color: var(--primary-color, #2DB2AA); border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 4px; margin-bottom: 4px;">Impacts</div><ul id="sim-tooltip-kpis" style="list-style: none; padding-left: 0; margin: 0; font-size: 0.85rem;"></ul>`;
            document.body.appendChild(newTooltip);
            // Re-run showTooltip after creating
            setTimeout(() => simShowTooltip(affectedKPIs), 0);
            return;
        }
         // This case should be covered by the creation logic above
         if (!kpisList) {
             console.error("kpisList not found even after tooltip creation.");
             return;
         }
    }


    // Clear previous list items before adding new ones
    kpisList.innerHTML = '';

    if (!Array.isArray(affectedKPIs) || affectedKPIs.length === 0) {
        kpisList.innerHTML = '<li>N/A</li>'; // Show N/A if no affects defined
    } else {
        // Map IDs to Names and create list items
        const kpiNames = affectedKPIs
            .map(id => {
                // Find the KPI name from the main kpiData or simAppData.kpis
                const kpiInfo = simAppData.kpis.find(k => k.id === id); // Check sim data first
                return kpiInfo ? kpiInfo.name : kpiData[id]?.name; // Fallback to main data if needed
            })
            .filter(name => name); // Filter out any null/undefined names

        if (kpiNames.length > 0) {
            // Use list items for better structure
            kpisList.innerHTML = kpiNames.map(name => `<li>- ${name}</li>`).join('');
        } else {
            // Handle case where affects list exists but IDs don't match known KPIs
            kpisList.innerHTML = '<li>Effect details unavailable</li>';
            console.warn("Could not find names for affected KPIs:", affectedKPIs);
        }
    }

    tooltip.style.display = 'block'; // Make tooltip visible
    tooltip.style.opacity = '1';
    tooltip.classList.add('visible'); // Make tooltip visible
    // Note: Position is handled by simUpdateTooltipPosition on mousemove
}

function simHideTooltip() {
  console.log("simHideTooltip called"); // Debugging
  const tooltip = document.getElementById('sim-tooltip');
  if (tooltip) {
      tooltip.classList.remove('visible');
      tooltip.style.opacity = '0';
      // Use setTimeout to ensure display:none happens *after* potential transitions
      setTimeout(() => {
          if (!tooltip.classList.contains('visible')) { // Double check
              tooltip.style.display = 'none';
              tooltip.style.left = '-1000px'; // Move off-screen
              tooltip.style.top = '-1000px';
          }
      }, 200); // Match CSS transition
  } else {
       console.log("simHideTooltip: Tooltip element not found"); // Debugging
  }
}

function simUpdateTooltipPosition(event) {
  const tooltip = document.getElementById('sim-tooltip');
  if (tooltip && tooltip.classList.contains('visible')) { // Only update if visible
      // Position tooltip relative to the viewport, slightly offset from cursor
      let x = event.clientX + 15;
      let y = event.clientY - 10; // Position above cursor slightly

       // Prevent tooltip from going off-screen
       const tooltipRect = tooltip.getBoundingClientRect(); // Get dimensions *after* content is added
       const viewportWidth = window.innerWidth;
       const viewportHeight = window.innerHeight;
       
       // Re-check dimensions if they seem off (can happen on first render)
       const rectWidth = tooltipRect.width > 0 ? tooltipRect.width : 150; // Estimate if 0
       const rectHeight = tooltipRect.height > 0 ? tooltipRect.height : 50; // Estimate if 0


       if (x + rectWidth > viewportWidth - 10) { // Check right edge
           x = event.clientX - rectWidth - 15; // Move to the left
       }
       if (y < 10) { // Check top edge
           y = event.clientY + 20; // Move below cursor
       }
        if (y + rectHeight > viewportHeight - 10) { // Check bottom edge
           y = event.clientY - rectHeight - 10; // Move significantly above cursor
       }


      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
       tooltip.style.position = 'fixed'; // Use fixed positioning relative to viewport
  }
}

function simHandleRecommendationAccept(recommendationId) {
    const template = simAppData.recommendationTemplates.find(t => t.id === recommendationId);
    if (!template) return;

    simRecommendationStates[recommendationId] = 'accepted'; // Mark as accepted
    const sliderData = simAppData.sliders.find(s => s.id === template.trigger); // Get slider data for label/unit
    
    // Apply the recommended slider value
    const targetSliderValue = template.targetValue;
    simCurrentValues[template.trigger] = targetSliderValue;

    // Update the UI for the slider
    const sliderGroup = document.querySelector(`[data-sim-slider="${template.trigger}"]`);
     if (sliderGroup) {
        const input = sliderGroup.querySelector('[data-sim-input]');
        const valueDisplay = sliderGroup.querySelector('[data-sim-value]');
        // const sliderData = simAppData.sliders.find(s => s.id === template.trigger); // Already fetched

        if (input) input.value = targetSliderValue;
        if (valueDisplay && sliderData) valueDisplay.textContent = simFormatValue(targetSliderValue, sliderData.unit);
     }


    simUpdateAllKPIs(); // Recalculate KPIs and potentially trigger new recommendations
     simAddChatMessage('assistant', `Recommendation "${template.title}" accepted. ${sliderData.label} adjusted to ${simFormatValue(targetSliderValue, sliderData.unit)}.`); // Add chat message
}

function simHandleRecommendationReject(recommendationId) {
     const modal = document.getElementById('sim-rejection-modal'); // Target the correct modal
     const modalBackdrop = document.getElementById('sim-modal-backdrop'); // Target backdrop
     
     if (modal && modalBackdrop) {
        modal.classList.remove('hidden'); // Show the modal
        modalBackdrop.style.display = 'flex'; // Show the backdrop
        modal.dataset.recommendationId = recommendationId; // Store which recommendation is being rejected
     }
}

function acceptWorkflowOrderRec(orderId, rec) {
    sendWorkflowChatMessage(true, `**Order ${orderId}:** Recommendation to '${rec}' has been accepted and executed.`);
    // In real app, this would trigger an API call
    // We can also update the mock data
    const order = mockOrderData.find(o => o.id === orderId);
    if(order) {
        order.recommendation = `Accepted: ${rec}`;
        order.slaStatus = 'At Risk'; // Move from Delayed to At Risk
        renderWorkflowTable(); // Refresh table
    }
}

function dismissWorkflowOrderRec(orderId) {
     sendWorkflowChatMessage(true, `**Order ${orderId}:** Recommendation has been dismissed.`);
     const order = mockOrderData.find(o => o.id === orderId);
    if(order) {
        order.recommendation = 'Dismissed';
        renderWorkflowTable(); // Refresh table
    }
}

// ========== IMPROVEMENT AGENT DATA ==========
const insightDetails = {
    'forecast-accuracy': {
        type: 'Learning',
        title: 'Forecast Accuracy Directly Impacts Stock-Out Rate',
        description: 'Over the past 6 weeks, you\'ve optimized forecast accuracy 4 times in the Planning Agent. Each 2% improvement in forecast accuracy (e.g., from 82% to 84%) resulted in a correlated 0.5% reduction in stock-out rate within the following 2 weeks.',
        metrics: {
            'Simulations Run': '4',
            'Avg. Accuracy Gain': '+2.0%',
            'Correlated Stock-Out Reduction': '-0.5%',
            'Confidence': '92%'
        },
        analysis: 'Your actions in the Planning Agent\'s Simulation Studio show a strong, causal link between proactive forecasting adjustments and inventory health. The 2-week lag suggests this is a reliable leading indicator. This learned pattern validates that continuing to refine forecast accuracy is a high-leverage activity for mitigating stock-outs, more so than reactive inventory level adjustments.',
        actions: ['Create automated alert for forecast deviations > 3%', 'Share insight with demand planning team']
    },
    'supplier-reactive': {
        type: 'Risk',
        title: 'Reactive Pattern on Supplier OTD Issues',
        description: 'You\'ve addressed supplier reliability (e.g., TKT-002) only *after* OTIF drops below 88%. Historical data shows early intervention when Supplier OTD first drops below 90% (even if OTIF is still stable) prevents 60% of critical stock-outs 3-4 weeks later.',
        metrics: {
            'Intervention Trigger': 'OTIF < 88%',
            'Missed Early Trigger': 'Supplier OTD < 90%',
            'Preventable Stock-Outs': '60%',
            'Impact': 'High'
        },
        analysis: 'Your current trigger for action is a lagging indicator (OTIF). The system has identified that Supplier OTD is a *leading* indicator. By waiting for OTIF to fall, you are missing the optimal window for intervention. This reactive pattern leads to larger, more costly disruptions (stock-outs) that could have been mitigated with earlier, smaller interventions.',
        actions: ['Set new alert in Control Agent: "Supplier OTD < 90%"', 'Review top 3 suppliers currently between 90-92% OTD']
    },
    'production-opportunity': {
        type: 'Opportunity',
        title: 'Untapped Production Efficiency Gains',
        description: 'Your focus has been 80% on inventory optimization (14 simulations run). However, the production efficiency improvements you implemented 3 months ago (TKT-008) had a 2.3x higher ROI ($180K/month savings vs. $78K/month from inventory tweaks).',
        metrics: {
            'Focus (30d)': '80% Inventory',
            'Inventory Action ROI': '1.0x (Avg)',
            'Production Action ROI': '2.3x (Avg)',
            'Potential': '~$102K/month'
        },
        analysis: 'You are successfully optimizing inventory, but your own data shows that your actions related to production efficiency (like TKT-008) yield a significantly higher return. Your focus on inventory may be a cognitive bias ("what I know best"). There is a clear opportunity to shift some focus back to production, where you have a proven track record of high-impact changes.',
        actions: ['Re-run Production Efficiency simulation in Planning Agent', 'Analyze Plant C (74.8% efficiency) for similar opportunities']
    },
    'safety-stock': {
        type: 'Learning',
        title: 'Optimal Safety Stock "Sweet Spot" Identified',
        description: 'Based on your 8 safety stock adjustments in the Simulation Agent, an optimal balance was achieved at a 2.0x StdDev factor. This specific level reduces stock-outs to 2.1% (near target) while keeping holding costs 7% lower than a more aggressive 2.5x factor.',
        metrics: {
            'Simulations Run': '8',
            'Optimal Factor': '2.0x',
            'Resulting Stock-Out': '2.1%',
            'Cost Saving': '7% (vs 2.5x)'
        },
        analysis: 'Your simulation trials have successfully identified a "sweet spot." Previously, you oscillated between 1.5x (causing stock-outs) and 2.5x (increasing costs). This 2.0x factor is a validated, data-driven rule you can now apply confidently. It represents a stable, learned heuristic for balancing service and cost.',
        actions: ['Save 2.0x as default parameter in Simulation Agent', 'Apply 2.0x factor to new "Product Line B" launch']
    },
    'cost-blind-spot': {
        type: 'Risk',
        title: 'Cost Optimization Blind Spot',
        description: 'You\'ve created 23 tickets in the Control Agent for service/delivery issues (OTIF, Stock-Outs) but only 2 for cost reduction. Cost per Unit is currently 11% above target ($24.50 vs $22).',
        metrics: {
            'Service Tickets': '23',
            'Cost Tickets': '2',
            'Cost vs. Target': '+11%',
            'Priority': 'Medium'
        },
        analysis: 'Your actions show a strong bias towards solving immediate service-level fires (OTIF, Stock-Outs), which is important. However, this has led to a blind spot in addressing the chronic, high-impact issue of cost overruns. The system flags this as a risk because persistent high costs can erode profitability just as much as service failures.',
        actions: ['Open Planning Agent to analyze Cost Per Unit drivers', 'Create new ticket in Control Agent for cost review']
    },

    'warehouse-success': {
        type: 'Opportunity',
        title: 'Warehouse Efficiency Success Formula',
        description: 'Your warehouse utilization (92.1%) exceeds target by 4.6%. Analysis shows this success came from 3 specific actions you took (TKT-011, TKT-014, Sim-Run #12). This 3-step formula can be applied to Plant C (currently 74.8% efficiency).',
        metrics: {
            'Success Metric': '92.1% Utilization',
            'Key Actions': '3',
            'Target Plant': 'Plant C (74.8%)',
            'Potential Uplift': '+10-15%'
        },
        analysis: 'The system has identified a reusable "success pattern" from your past actions. This isn\'t just a single learning; it\'s a formula (Action 1 -> Action 2 -> Action 3) that led to a positive outcome. This formula is highly transferable to another underperforming asset (Plant C), representing a low-risk, high-probability opportunity.',
        actions: ['View 3-Step Success Formula', 'Create implementation plan for Plant C']
    }
};

const trajectoryData = [
    {
        id: 1, 
        score: 0.78, 
        kpis: { 'OTIF': 91.2, 'Stock Out Rate': 3.1, 'Supplier OTD': 94.8, 'Lead Time': 10.2 },
        details: {
            "OTIF": { original: 95, current: 87.2, optimized: 91.2, diff: 4.0 },
            "Stock Out Rate": { original: 2, current: 4.8, optimized: 3.1, diff: -1.7 },
            "Supplier OTD": { original: 98, current: 91.5, optimized: 94.8, diff: 3.3 },
            "Lead Time": { original: 8, current: 12.3, optimized: 10.2, diff: -2.1 }
        },
        tradeoffs: {
            "Logistics Cost": { current: "$2.1M", optimized: "$2.3M", change: "+9.5%" },
            "Inventory Holding": { current: "$5.2M", optimized: "$4.8M", change: "-7.7%" },
            "Service Level": { current: "87.2%", optimized: "91.2%", change: "+4.6%" },
            "Production Capacity": { current: "78.9%", optimized: "82.1%", change: "+4.1%" },
            "Transportation Cost": { current: "$1.8M", optimized: "$2.0M", change: "+11.1%" },
            "Warehouse Efficiency": { current: "73.5%", optimized: "76.8%", change: "+4.5%" },
            "Labor Cost": { current: "$3.2M", optimized: "$3.4M", change: "+6.3%" },
            "Energy Consumption": { current: "850 MWh", optimized: "820 MWh", change: "-3.5%" }
        },
        contextImpact: {
            "North America OTIF": { current: "85.2%", optimized: "89.8%", change: "+4.6%" },
            "Europe Stock Out Rate": { current: "5.1%", optimized: "3.2%", change: "-37.3%" },
            "Plant A Lead Time": { current: "13.2 days", optimized: "10.8 days", change: "-18.2%" },
            "Product Line 1 OTIF": { current: "89.2%", optimized: "93.5%", change: "+4.8%" },
            "Asia Supplier OTD": { current: "89.3%", optimized: "92.1%", change: "+3.1%" },
            "Plant B Production Efficiency": { current: "76.2%", optimized: "79.5%", change: "+4.3%" },
            "Product Line 2 Quality Score": { current: "92.8%", optimized: "95.1%", change: "+2.5%" },
            "West Region Customer Satisfaction": { current: "84.7%", optimized: "88.2%", change: "+4.1%" }
        }
    },
    {
        id: 2, 
        score: 0.85, 
        kpis: { 'OTIF': 93.8, 'Stock Out Rate': 2.4, 'Supplier OTD': 96.2, 'Lead Time': 9.1 },
        details: {
            "OTIF": { original: 95, current: 87.2, optimized: 93.8, diff: 6.6 },
            "Stock Out Rate": { original: 2, current: 4.8, optimized: 2.4, diff: -2.4 },
            "Supplier OTD": { original: 98, current: 91.5, optimized: 96.2, diff: 4.7 },
            "Lead Time": { original: 8, current: 12.3, optimized: 9.1, diff: -3.2 }
        },
        tradeoffs: {
            "Logistics Cost": { current: "$2.1M", optimized: "$2.4M", change: "+14.3%" },
            "Inventory Holding": { current: "$5.2M", optimized: "$4.2M", change: "-19.2%" },
            "Service Level": { current: "87.2%", optimized: "93.8%", change: "+7.6%" },
            "Production Capacity": { current: "78.9%", optimized: "85.3%", change: "+8.1%" },
            "Transportation Cost": { current: "$1.8M", optimized: "$2.2M", change: "+22.2%" },
            "Warehouse Efficiency": { current: "73.5%", optimized: "81.2%", change: "+10.5%" },
            "Labor Cost": { current: "$3.2M", optimized: "$3.6M", change: "+12.5%" },
            "Energy Consumption": { current: "850 MWh", optimized: "780 MWh", change: "-8.2%" }
        },
        contextImpact: {
            "North America OTIF": { current: "85.2%", optimized: "91.5%", change: "+7.4%" },
            "Europe Stock Out Rate": { current: "5.1%", optimized: "2.8%", change: "-45.1%" },
            "Asia Lead Time": { current: "11.8 days", optimized: "9.2 days", change: "-22.0%" },
            "Product Line 2 Supplier OTD": { current: "90.1%", optimized: "95.8%", change: "+6.3%" },
            "Plant C Production Efficiency": { current: "74.8%", optimized: "82.6%", change: "+10.4%" },
            "East Region Customer Satisfaction": { current: "83.5%", optimized: "89.7%", change: "+7.4%" },
            "Product Line 3 Quality Score": { current: "91.4%", optimized: "96.2%", change: "+5.3%" },
            "South America OTIF": { current: "82.7%", optimized: "87.9%", change: "+6.3%" }
        }
    },
    {
        id: 3, 
        score: 0.92, 
        kpis: { 'OTIF': 96.1, 'Stock Out Rate': 1.8, 'Supplier OTD': 97.9, 'Lead Time': 7.8 },
        details: {
            "OTIF": { original: 95, current: 87.2, optimized: 96.1, diff: 8.9 },
            "Stock Out Rate": { original: 2, current: 4.8, optimized: 1.8, diff: -3.0 },
            "Supplier OTD": { original: 98, current: 91.5, optimized: 97.9, diff: 6.4 },
            "Lead Time": { original: 8, current: 12.3, optimized: 7.8, diff: -4.5 }
        },
        tradeoffs: {
            "Logistics Cost": { current: "$2.1M", optimized: "$2.6M", change: "+23.8%" },
            "Inventory Holding": { current: "$5.2M", optimized: "$3.8M", change: "-26.9%" },
            "Service Level": { current: "87.2%", optimized: "96.1%", change: "+10.2%" },
            "Production Capacity": { current: "78.9%", optimized: "88.7%", change: "+12.4%" },
            "Transportation Cost": { current: "$1.8M", optimized: "$2.4M", change: "+33.3%" },
            "Warehouse Efficiency": { current: "73.5%", optimized: "86.9%", change: "+18.2%" },
            "Labor Cost": { current: "$3.2M", optimized: "$3.9M", change: "+21.9%" },
            "Energy Consumption": { current: "850 MWh", optimized: "720 MWh", change: "-15.3%" }
        },
        contextImpact: {
            "North America OTIF": { current: "85.2%", optimized: "93.8%", change: "+10.1%" },
            "Europe Stock Out Rate": { current: "5.1%", optimized: "1.9%", change: "-62.7%" },
            "Asia Supplier OTD": { current: "88.5%", optimized: "96.8%", change: "+9.4%" },
            "Plant B Lead Time": { current: "12.8 days", optimized: "8.1 days", change: "-36.7%" },
            "Product Line 1 Quality Score": { current: "93.2%", optimized: "97.8%", change: "+4.9%" },
            "Central Region Customer Satisfaction": { current: "85.9%", optimized: "92.4%", change: "+7.6%" },
            "Plant D Production Efficiency": { current: "77.3%", optimized: "86.8%", change: "+12.3%" },
            "Product Line 4 Return Rate": { current: "3.8%", optimized: "2.1%", change: "-44.7%" }
        }
    },
    {
        id: 4, 
        score: 0.88, 
        kpis: { 'OTIF': 94.5, 'Stock Out Rate': 2.1, 'Supplier OTD': 96.8, 'Lead Time': 8.5 },
        details: {
            "OTIF": { original: 95, current: 87.2, optimized: 94.5, diff: 7.3 },
            "Stock Out Rate": { original: 2, current: 4.8, optimized: 2.1, diff: -2.7 },
            "Supplier OTD": { original: 98, current: 91.5, optimized: 96.8, diff: 5.3 },
            "Lead Time": { original: 8, current: 12.3, optimized: 8.5, diff: -3.8 }
        },
        tradeoffs: {
            "Logistics Cost": { current: "$2.1M", optimized: "$2.5M", change: "+19.0%" },
            "Inventory Holding": { current: "$5.2M", optimized: "$4.0M", change: "-23.1%" },
            "Service Level": { current: "87.2%", optimized: "94.5%", change: "+8.4%" },
            "Production Capacity": { current: "78.9%", optimized: "86.2%", change: "+9.3%" },
            "Transportation Cost": { current: "$1.8M", optimized: "$2.1M", change: "+16.7%" },
            "Warehouse Efficiency": { current: "73.5%", optimized: "79.3%", change: "+7.9%" },
            "Labor Cost": { current: "$3.2M", optimized: "$3.5M", change: "+9.4%" },
            "Energy Consumption": { current: "850 MWh", optimized: "790 MWh", change: "-7.1%" }
        },
        contextImpact: {
            "North America OTIF": { current: "85.2%", optimized: "92.1%", change: "+8.1%" },
            "Europe Lead Time": { current: "11.5 days", optimized: "8.8 days", change: "-23.5%" },
            "Plant C Stock Out Rate": { current: "4.2%", optimized: "2.3%", change: "-45.2%" },
            "Product Line 3 Supplier OTD": { current: "92.3%", optimized: "96.1%", change: "+4.1%" },
            "Asia Production Efficiency": { current: "75.6%", optimized: "83.2%", change: "+10.1%" },
            "North Region Customer Satisfaction": { current: "86.4%", optimized: "91.8%", change: "+6.3%" },
            "Plant E Quality Score": { current: "94.7%", optimized: "97.3%", change: "+2.7%" },
            "Product Line 5 Inventory Turnover": { current: "7.8x", optimized: "9.4x", change: "+20.5%" }
        }
    }
];

const newsData = [
    {
        title: 'New AI Regulations in Financial Sector',
        snippet: 'The Financial Conduct Authority has introduced new guidelines for AI implementation in banking services. These regulations mandate regular audits of automated decision-making systems and require transparency in customer-facing AI applications.',
        date: 'Monday, July 28, 2025',
        read: false
    },
    {
        title: 'Global Market Recovery Trends',
        snippet: 'Tech stocks lead market rebound with 8% average gains across major indices. Analysts predict sustained growth through Q1 2024, driven by innovation in renewable energy sectors and semiconductor manufacturing.',
        date: 'Sunday, July 27, 2025',
        read: false
    },
    {
        title: 'Blockchain Banking Solutions',
        snippet: 'Major banks collaborate on blockchain-based cross-border payment systems aiming to reduce transaction times from days to minutes while maintaining security standards.',
        date: 'Saturday, July 26, 2025',
        read: false
    },
    {
        title: 'Cybersecurity Compliance Update',
        snippet: 'New mandatory cybersecurity framework released for critical infrastructure sectors, requiring real-time threat monitoring and incident reporting within 24 hours of detection.',
        date: 'Friday, July 25, 2025',
        read: false
    },
    {
        title: 'Sustainable Investing Trends',
        snippet: 'ESG funds attract record $45B inflows in November as regulators introduce strict greenwashing prevention measures for investment products.',
        date: 'Thursday, July 24, 2025',
        read: false
    },
    {
        title: 'Remote Work Tech Advancements',
        snippet: 'New VR collaboration platforms gain traction as hybrid work becomes permanent, with Microsoft and Meta announcing enterprise metaverse solutions.',
        date: 'Wednesday, July 23, 2025',
        read: false
    },
    {
        title: 'Crypto Regulatory Framework',
        snippet: 'Global financial authorities agree on cryptocurrency oversight standards, focusing on stablecoin reserves and exchange transparency requirements.',
        date: 'Tuesday, July 22, 2025',
        read: false
    },
    {
        title: 'Healthcare Tech Merger',
        snippet: 'Major merger creates healthcare technology giant combining EHR systems and telemedicine platforms, aiming to dominate digital health market.',
        date: 'Monday, July 21, 2025',
        read: false
    }
];

function closeDetailView() {
    const detailView = document.getElementById('detailView');
    if (detailView) {
        detailView.classList.remove('visible');
    }
}

function takeAction() {
    // This is a placeholder. In a real app, this would trigger
    // a specific action based on the open insight.
    // We use a custom alert/modal logic if available, otherwise fallback.
    // Since we don't have a generic modal function, we'll use the placeholder.
    console.log('Action button clicked. This would trigger a workflow.');
    // Find a way to show a message without alert()
    // For now, we'll just log it and close the modal.
    closeDetailView();
}

// Add event listeners for the Improvement Agent tab
document.addEventListener('DOMContentLoaded', () => {
    // This listener attaches events for the Improvement Agent tab.
    
    // Attach listeners for the clickable insight cards
    document.querySelectorAll('#insights-grid .insight-card').forEach(card => {
        card.addEventListener('click', () => openDetailView(card));
    });

    // NOTE: Event listeners for '.filter-btn' are NOT needed here,
    // as they are already bound via 'onclick' attributes in the HTML.
    // Adding them here would cause the function to fire twice.

    // Add listeners for the detail view modal (close buttons, etc.)
    const detailCloseBtn = document.querySelector('#detailView .detail-close');
    if(detailCloseBtn) detailCloseBtn.addEventListener('click', closeDetailView);

    const detailViewBackdrop = document.getElementById('detailView');
    if(detailViewBackdrop) detailViewBackdrop.addEventListener('click', closeDetailView);

    const detailViewContent = document.querySelector('#detailView .detail-content');
    if(detailViewContent) detailViewContent.addEventListener('click', (e) => e.stopPropagation());

    const detailActionBtn = document.querySelector('#detailView .btn-primary-detail');
    if(detailActionBtn) detailActionBtn.addEventListener('click', takeAction);

    const detailCloseBtnSecondary = document.querySelector('#detailView .btn-secondary-detail');
    if(detailCloseBtnSecondary) detailCloseBtnSecondary.addEventListener('click', closeDetailView);
});

// ========== SIMULATION AGENT (Missing Functions) ==========

/**
 * Initializes the Simulation Studio application.
 * This function was missing, causing the tab to be non-functional.
 */
function simInitializeApp() {
    console.log("Simulation Studio Initializing...");
    const kpiGrid = document.getElementById('sim-kpi-grid');
    const slidersContainer = document.getElementById('sim-sliders-container');
    const resetBtn = document.getElementById('sim-reset-btn');
    const modalBackdrop = document.getElementById('sim-modal-backdrop');
    const modalClose = document.getElementById('sim-modal-close');
    const cancelRejectionBtn = document.getElementById('sim-cancel-rejection');
    const confirmRejectionBtn = document.getElementById('sim-confirm-rejection');

    if (!kpiGrid || !slidersContainer || !resetBtn) {
        console.error("Simulation Studio UI elements not found. Initialization failed.");
        return;
    }

    // 1. Store baseline and current values
    simAppData.sliders.forEach(slider => {
        simBaselineValues[slider.id] = slider.current;
        simCurrentValues[slider.id] = slider.current;
    });

    simAppData.kpis.forEach(kpi => {
        simPreviousKPIValues[kpi.id] = kpi.current; // Initialize previous values
    });

    // 2. Populate UI
    kpiGrid.innerHTML = simAppData.kpis.map(simGenerateKPICard).join('');
    slidersContainer.innerHTML = simAppData.sliders.map(simGenerateSlider).join('');

    // 3. Attach Event Listeners
    
    // Slider listeners
    slidersContainer.querySelectorAll('.slider-input').forEach(input => {
        const sliderId = input.closest('.slider-group').dataset.simSlider;
        // 'input' event fires continuously as slider moves
        input.addEventListener('input', (e) => {
            simHandleSliderChange(sliderId, e.target.value);
        });
        // 'mouseenter' for hover effect
        input.addEventListener('mouseenter', () => {
             simHandleSliderHover(sliderId, true);
        });
         // 'mouseleave' to remove hover effect
        input.addEventListener('mouseleave', () => {
             simHandleSliderHover(sliderId, false);
             simRemoveAllHighlights();
             simHideTooltip();
        });
    });

    // Tooltip position listener
    document.addEventListener('mousemove', simUpdateTooltipPosition);

    // Reset button
    resetBtn.addEventListener('click', () => {
        simAppData.sliders.forEach(slider => {
            simCurrentValues[slider.id] = simBaselineValues[slider.id];
            const sliderGroup = document.querySelector(`[data-sim-slider="${slider.id}"]`);
            if (sliderGroup) {
                sliderGroup.querySelector('[data-sim-input]').value = simBaselineValues[slider.id];
                sliderGroup.querySelector('[data-sim-value]').textContent = simFormatValue(simBaselineValues[slider.id], slider.unit);
            }
        });
        simUpdateAllKPIs(); // Recalculate all KPIs
        simRecommendationStates = {}; // Clear accepted/rejected states
        simUpdateRecommendations(); // Refresh recommendations
        simAddChatMessage('assistant', 'Simulation has been reset to the baseline values.');
    });

    // Recommendation button listeners (attached via a separate function)
    simAttachRecommendationEventListeners();

    // Modal listeners
    if (modalBackdrop) modalBackdrop.addEventListener('click', simCloseModal);
    if (modalClose) modalClose.addEventListener('click', simCloseModal);
    if (cancelRejectionBtn) cancelRejectionBtn.addEventListener('click', simCloseModal);
    if (confirmRejectionBtn) confirmRejectionBtn.addEventListener('click', simConfirmRejection);

    // Initial chat message
    simAddChatMessage('assistant', 'Simulation Studio is active. Adjust the controls to see predicted KPI impacts and receive smart recommendations.');

    // Simulate button listener with timeout to ensure DOM is ready
    setTimeout(() => {
        const simulateBtn = document.getElementById('sim-simulate-btn');
        if (simulateBtn) {
            simulateBtn.addEventListener('click', simRunSimulation);
            console.log('Simulate button listener attached');
        } else {
            console.warn('Simulate button not found - ensure HTML has id="sim-simulate-btn"');
        }
    }, 100);


// ========== SIMULATE BUTTON FUNCTION ==========
function simRunSimulation() {
    console.log('🎯 simRunSimulation called');
    console.log('Pending changes:', simPendingChanges);

    if (!simPendingChanges || Object.keys(simPendingChanges).length === 0) {
        simAddChatMessage('assistant', 'No changes to simulate. Please adjust the sliders first, then click Simulate.');
        return;
    }

    // Update KPIs based on pending changes
    simUpdateAllKPIs();
    console.log('KPIs updated');

    // Build chat summary message
    let message = '<b>Simulation Complete</b><br><br>';
    message += '<b>Control Changes Applied:</b><br>';

    for (const [sliderId, change] of Object.entries(simPendingChanges)) {
        message += `• ${change.label}: ${simFormatValue(change.oldValue, change.unit)} → ${simFormatValue(change.newValue, change.unit)}<br>`;
    }

    message += '<br><b>KPI values have been recalculated based on these scenario changes.</b>';

    simAddChatMessage('assistant', message);
    console.log('Chat message posted');

    // Clear pending changes
    simPendingChanges = {};
    console.log('Pending changes cleared');
}

}

/**
 * Attaches click listeners for accept/reject buttons on recommendation cards.
 * Must be called after recommendations are (re)rendered.
 */
function simAttachRecommendationEventListeners() {
    const container = document.getElementById('sim-recommendations-container');
    if (!container) return;

    container.querySelectorAll('[data-sim-accept]').forEach(button => {
        button.addEventListener('click', (e) => {
            const recommendationId = e.target.dataset.simAccept;
            simHandleRecommendationAccept(recommendationId);
        });
    });

    container.querySelectorAll('[data-sim-reject]').forEach(button => {
        button.addEventListener('click', (e) => {
            const recommendationId = e.target.dataset.simReject;
            simHandleRecommendationReject(recommendationId);
        });
    });
}

/**
 * Closes the simulation rejection modal.
 */
function simCloseModal() {
    const modal = document.getElementById('sim-rejection-modal');
    const modalBackdrop = document.getElementById('sim-modal-backdrop');
    if (modal && modalBackdrop) {
        modal.classList.add('hidden');
        modalBackdrop.style.display = 'none';
    }
}

/**
 * Confirms the rejection of a simulation recommendation.
 */
function simConfirmRejection() {
    const modal = document.getElementById('sim-rejection-modal');
    const reasonInput = document.getElementById('sim-rejection-reason');
    if (!modal || !reasonInput) return;

    const recommendationId = modal.dataset.recommendationId;
    const reason = reasonInput.value.trim();

    if (!recommendationId) return;

    simRecommendationStates[recommendationId] = 'rejected'; // Mark as rejected
    
    const template = simAppData.recommendationTemplates.find(t => t.id === recommendationId);
    if (template) {
         simAddChatMessage('assistant', `Recommendation "${template.title}" rejected. Feedback logged: "${reason}"`);
    }

    simUpdateRecommendations(); // Re-render recommendations to show rejected state
    simCloseModal(); // Close the modal
    reasonInput.value = ''; // Clear textarea
}


// ========== SIMULATION AGENT CHAT (Missing Functions) ==========

function simAddChatMessage(role, content) {
    const messagesContainer = document.getElementById('sim-chat-messages');
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        if (role === 'user') {
            bubble.textContent = content;
        } else {
            bubble.innerHTML = content.replace(/\n/g, '<br>'); // Allow simple HTML
        }
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function simHandleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        simSendChatMessage();
    }
}

function simSendChatMessage() {
    const input = document.querySelector('#simulation-agent-chat-panel .chat-input-field');
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;

    simAddChatMessage('user', message);
    input.value = '';

    setTimeout(() => {
        const response = simGenerateAIResponse(message);
        simAddChatMessage('assistant', response);
    }, 800);
}

function simGenerateAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('what if') || lowerMessage.includes('impact of')) {
        let response = "I can't change the sliders myself, but you can see the impact by trying these adjustments:\n";
        if (lowerMessage.includes('supplier') || lowerMessage.includes('otd')) {
            response += " • Try increasing the **Supplier Reliability** slider.\n";
        }
        if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
            response += " • Adjust the **Safety Stock Factor** slider.\n";
        }
        if (lowerMessage.includes('forecast')) {
            response += " • Increase the **Forecast Accuracy** slider.\n";
        }
         if (response.length < 100) { // If no keywords hit
             response = "You can test that scenario by adjusting the sliders on the right. For example, to see the impact of better suppliers, increase the 'Supplier Reliability' slider.";
         }
        return response;
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
        return "I generate smart recommendations automatically based on the current simulation state. You can see them under the 'Smart Recommendations' panel.";
    }

    if (lowerMessage.includes('reset') || lowerMessage.includes('baseline')) {
        return "You can reset the simulation to its original state by clicking the **'Reset to Baseline'** button at the bottom of the controls.";
    }

    // Generic fallback
    return "I am the Simulation Agent. Use the sliders to explore 'what-if' scenarios. I will predict the impact on KPIs and provide actionable recommendations.";
}


// ========== WORKFLOW STUDIO (Missing Data & Functions) ==========

const mockOrderData = [
    { id: 'ORD-9001', stage: 'Quality Check', timeInStage: '22.5 Hrs', slaStatus: 'Delayed', bottleneck: 'Manual Inspection', recommendation: 'Automate QC (Vision Agent)', team: 'Quality', country: 'USA', region: 'North America', warehouse: 'WH-01' },
    { id: 'ORD-9002', stage: 'Processing', timeInStage: '1.8 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Operations', country: 'USA', region: 'North America', warehouse: 'WH-01' },
    { id: 'ORD-9003', stage: 'Shipping', timeInStage: '0.2 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Logistics', country: 'Germany', region: 'Europe', warehouse: 'WH-04' },
    { id: 'ORD-9004', stage: 'Quality Check', timeInStage: '20.1 Hrs', slaStatus: 'Delayed', bottleneck: 'Manual Inspection', recommendation: 'Expedite', team: 'Quality', country: 'China', region: 'Asia', warehouse: 'WH-08' },
    { id: 'ORD-9005', stage: 'Order Intake', timeInStage: '0.1 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Sales', country: 'Japan', region: 'Asia', warehouse: 'WH-09' },
    { id: 'ORD-9006', stage: 'Quality Check', timeInStage: '18.5 Hrs', slaStatus: 'At Risk', bottleneck: 'Staffing Shortage', recommendation: 'Re-assign resources', team: 'Quality', country: 'USA', region: 'South America', warehouse: 'WH-03' },
    { id: 'ORD-9007', stage: 'Processing', timeInStage: '1.2 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Operations', country: 'Germany', region: 'Europe', warehouse: 'WH-04' },
    { id: 'ORD-9008', stage: 'Processing', timeInStage: '0.5 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Operations', country: 'USA', region: 'North America', warehouse: 'WH-02' },
    { id: 'ORD-9009', stage: 'Quality Check', timeInStage: '23.1 Hrs', slaStatus: 'Delayed', bottleneck: 'Manual Inspection', recommendation: 'Automate QC (Vision Agent)', team: 'Quality', country: 'China', region: 'Asia', warehouse: 'WH-08' },
    { id: 'ORD-9010', stage: 'Shipping', timeInStage: '1.1 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Logistics', country: 'USA', region: 'North America', warehouse: 'WH-01' },
    { id: 'ORD-9011', stage: 'Quality Check', timeInStage: '15.0 Hrs', slaStatus: 'At Risk', bottleneck: 'Staffing Shortage', recommendation: 'Re-assign resources', team: 'Quality', country: 'Japan', region: 'Asia', warehouse: 'WH-09' },
    { id: 'ORD-9012', stage: 'Order Intake', timeInStage: '0.3 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Sales', country: 'USA', region: 'North America', warehouse: 'WH-02' },
    { id: 'ORD-9013', stage: 'Processing', timeInStage: '0.9 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Operations', country: 'Germany', region: 'Europe', warehouse: 'WH-04' },
    { id: 'ORD-9014', stage: 'Quality Check', timeInStage: '28.2 Hrs', slaStatus: 'Delayed', bottleneck: 'Machine Downtime', recommendation: 'Prioritize Maintenance TKT-QC-004', team: 'Quality', country: 'USA', region: 'South America', warehouse: 'WH-03' },
    { id: 'ORD-9015', stage: 'Shipping', timeInStage: '0.4 Hrs', slaStatus: 'On Track', bottleneck: 'None', recommendation: '', team: 'Logistics', country: 'China', region: 'Asia', warehouse: 'WH-08' },
];

let workflowFilters = {
    search: '',
    stage: '',
    status: '',
    country: '',
    region: '',
    warehouse: '',
    team: '',
};
let workflowCurrentPage = 1;
const workflowItemsPerPage = 10;

/**
 * Populates filter dropdowns based on mock data.
 */
function populateWorkflowFilters() {
    const filtersToPopulate = ['stage', 'country', 'region', 'warehouse', 'team'];
    const uniqueValues = {
        stage: new Set(),
        country: new Set(),
        region: new Set(),
        warehouse: new Set(),
        team: new Set(),
    };

    // Gather unique values
    mockOrderData.forEach(order => {
        uniqueValues.stage.add(order.stage);
        uniqueValues.country.add(order.country);
        uniqueValues.region.add(order.region);
        uniqueValues.warehouse.add(order.warehouse);
        uniqueValues.team.add(order.team);
    });

    // Populate dropdowns
    filtersToPopulate.forEach(key => {
        const select = document.getElementById(`workflow-filter-${key}`);
        if (select) {
            select.innerHTML = `<option value="">All ${key.charAt(0).toUpperCase() + key.slice(1)}s</option>`; // Reset
            uniqueValues[key].forEach(value => {
                select.innerHTML += `<option value="${value}">${value}</option>`;
            });
        }
    });

    // Add event listeners to filters
    document.getElementById('workflow-search-input').addEventListener('input', (e) => {
        workflowFilters.search = e.target.value.toLowerCase();
        workflowCurrentPage = 1; // Reset to first page
        renderWorkflowTable();
    });

    filtersToPopulate.forEach(key => {
        document.getElementById(`workflow-filter-${key}`).addEventListener('change', (e) => {
            workflowFilters[key] = e.target.value;
            workflowCurrentPage = 1; // Reset to first page
            renderWorkflowTable();
        });
    });
     // Status filter listener (was missing)
    document.getElementById('workflow-filter-status').addEventListener('change', (e) => {
            workflowFilters.status = e.target.value;
            workflowCurrentPage = 1; // Reset to first page
            renderWorkflowTable();
    });

    document.getElementById('workflow-clear-filters').addEventListener('click', () => {
        workflowFilters = { search: '', stage: '', status: '', country: '', region: '', warehouse: '', team: '' };
        workflowCurrentPage = 1;
        // Reset dropdown UI
        document.getElementById('workflow-search-input').value = '';
        document.getElementById('workflow-filter-stage').value = '';
        document.getElementById('workflow-filter-status').value = '';
        document.getElementById('workflow-filter-country').value = '';
        document.getElementById('workflow-filter-region').value = '';
        document.getElementById('workflow-filter-warehouse').value = '';
        document.getElementById('workflow-filter-team').value = '';
        renderWorkflowTable();
    });

     // Pagination listeners
    document.getElementById('workflow-prev-page').addEventListener('click', () => {
        if (workflowCurrentPage > 1) {
            workflowCurrentPage--;
            renderWorkflowTable();
        }
    });

    document.getElementById('workflow-next-page').addEventListener('click', () => {
        const filteredData = getFilteredWorkflowData();
        const totalPages = Math.ceil(filteredData.length / workflowItemsPerPage);
        if (workflowCurrentPage < totalPages) {
            workflowCurrentPage++;
            renderWorkflowTable();
        }
    });
}

/**
 * Filters the mock order data based on active filters.
 */
function getFilteredWorkflowData() {
    return mockOrderData.filter(order => {
        return (workflowFilters.search === '' || order.id.toLowerCase().includes(workflowFilters.search)) &&
               (workflowFilters.stage === '' || order.stage === workflowFilters.stage) &&
               (workflowFilters.status === '' || order.slaStatus === workflowFilters.status) &&
               (workflowFilters.country === '' || order.country === workflowFilters.country) &&
               (workflowFilters.region === '' || order.region === workflowFilters.region) &&
               (workflowFilters.warehouse === '' || order.warehouse === workflowFilters.warehouse) &&
               (workflowFilters.team === '' || order.team === workflowFilters.team);
    });
}

/**
 * Renders the workflow order table with pagination and filters.
 */
function renderWorkflowTable() {
    const tbody = document.getElementById('workflow-order-tbody');
    if (!tbody) return;

    const filteredData = getFilteredWorkflowData();
    
    // Pagination logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / workflowItemsPerPage);
    const startIndex = (workflowCurrentPage - 1) * workflowItemsPerPage;
    const endIndex = startIndex + workflowItemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Update pagination info
    document.getElementById('workflow-page-info').textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} orders`;
    document.getElementById('workflow-prev-page').disabled = (workflowCurrentPage === 1);
    document.getElementById('workflow-next-page').disabled = (workflowCurrentPage === totalPages || totalItems === 0);

    // Render table rows
    tbody.innerHTML = paginatedData.map(order => {
        let slaClass = '';
        if (order.slaStatus === 'On Track') slaClass = 'sla-status-on-track';
        if (order.slaStatus === 'At Risk') slaClass = 'sla-status-at-risk';
        if (order.slaStatus === 'Delayed') slaClass = 'sla-status-delayed';

        let recHtml = order.recommendation;
        // Add buttons if recommendation is actionable
        if (order.recommendation && !order.recommendation.startsWith('Accepted') && !order.recommendation.startsWith('Dismissed')) {
             const safeRec = order.recommendation.replace(/'/g, "\\'"); // Escape quotes for JS
             recHtml = `
                <span>${order.recommendation}</span>
                <div class="message-bubble action-buttons" style="padding: 5px; margin-top: 5px; border-top: none;">
                    <button class="accept-btn" style="padding: 4px 8px; font-size: 0.75rem;" onclick="acceptWorkflowOrderRec('${order.id}', '${safeRec}')">Accept</button>
                    <button class="reject-btn" style="padding: 4px 8px; font-size: 0.75rem;" onclick="dismissWorkflowOrderRec('${order.id}')">Dismiss</button>
                </div>`;
        }


        return `
            <tr onclick="selectWorkflowOrder(this, '${order.id}')">
                <td>${order.id}</td>
                <td>${order.stage}</td>
                <td>${order.timeInStage}</td>
                <td class="${slaClass}">${order.slaStatus}</td>
                <td>${order.bottleneck}</td>
                <td>${recHtml}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Highlights a selected order in the table and shows info in chat.
 */
function selectWorkflowOrder(rowElement, orderId) {
    // Highlight row
    document.querySelectorAll('#workflow-order-tbody tr').forEach(row => row.classList.remove('selected'));
    rowElement.classList.add('selected');

    // Send info to chat
    const order = mockOrderData.find(o => o.id === orderId);
    if (order) {
        let chatMsg = `<b>Order ${order.id} Status:</b>\n`;
        chatMsg += ` • <b>Stage:</b> ${order.stage}\n`;
        chatMsg += ` • <b>SLA:</b> ${order.slaStatus}\n`;
        chatMsg += ` • <b>Time in Stage:</b> ${order.timeInStage}\n`;
        if (order.bottleneck) {
            chatMsg += ` • <b>Bottleneck:</b> ${order.bottleneck}\n`;
        }
        if (order.recommendation) {
            chatMsg += ` • <b>Recommendation:</b> ${order.recommendation}\n`;
        }
        sendWorkflowChatMessage(true, chatMsg); // Send as assistant
    }
}


/**
 * Switches to the Order Detail view, optionally filtering by stage.
 */
function showOrderDetailView(stageName = '') {
    document.getElementById('vsm-view').style.display = 'none';
    document.getElementById('order-detail-view').style.display = 'flex'; // Use flex

    const title = document.getElementById('workflow-detail-title');
    const stageFilter = document.getElementById('workflow-filter-stage');

    if (stageName) {
        title.textContent = `Order Details: ${stageName}`;
        stageFilter.value = stageName;
    } else {
        title.textContent = 'All Order Details';
        stageFilter.value = '';
    }
    
    // Trigger filter update
    workflowFilters.stage = stageName;
    workflowCurrentPage = 1;
    renderWorkflowTable();
}

/**
 * Switches back to the VSM view.
 */
function showVSMView() {
    document.getElementById('order-detail-view').style.display = 'none';
    document.getElementById('vsm-view').style.display = 'flex'; // Use flex
}


// ========== WORKFLOW STUDIO CHAT (Missing Functions) ==========

function handleWorkflowChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendWorkflowChatMessage(false); // Send as user
    }
}

function sendWorkflowChatMessage(isAssistant = false, messageOverride = '') {
    const input = document.getElementById('workflow-input');
    const message = (messageOverride || input.value).trim();
    if (!message) return;

    const role = isAssistant ? 'assistant' : 'user';

    const messagesContainer = document.getElementById('workflow-chat-messages');
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = message.replace(/\n/g, '<br>'); // Allow HTML/formatting
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    if (!isAssistant) {
        input.value = '';
        setTimeout(() => {
            const response = generateWorkflowAIResponse(message);
            sendWorkflowChatMessage(true, response); // Send AI response
        }, 800);
    }
}

function generateWorkflowAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('bottleneck') || lowerMessage.includes('slow')) {
        return "The primary bottleneck is the **24.0 hour wait time** before the **Quality Check** stage. This stage also has a high WIP (30 units) and a low 94% C&A rate, suggesting it's both slow and error-prone.\n\nI recommend:\n 1. Automating QC with an AI vision agent.\n 2. Investigating the 92% uptime at the preceding 'Processing' stage, which is likely causing the backup.";
    }
    if (lowerMessage.includes('lead time')) {
        return "The total Lead Time is **42.5 hours**, but the actual Cycle Time (work being done) is only **5.8 hours**. This means 86% of the time is spent waiting.\n\nThe biggest wait times are:\n • **24.0 Hrs** before Quality Check\n • **8.0 Hrs** before Processing\n\nAddressing these wait times is the key to improving lead time.";
    }
    if (lowerMessage.includes('delayed orders') || lowerMessage.includes('sla')) {
        const delayedCount = mockOrderData.filter(o => o.slaStatus === 'Delayed').length;
        return `I've identified **${delayedCount} orders** that are currently 'Delayed'. Most of them are stuck at the 'Quality Check' stage.\n\nWould you like me to switch to the order detail view to see them?`;
    }
     if (lowerMessage.includes('accept') && lowerMessage.includes('recommendation')) {
         return "You can accept a recommendation by clicking the 'Create Ticket' button on the recommendation card, or by clicking 'Accept' on an individual order in the detail grid.";
     }

    // Generic fallback
    return "I can help analyze the workflow. Ask me about the 'bottleneck', 'total lead time', or to 'show delayed orders'.";
}

/**
 * Handles accepting a VSM-level recommendation.
 */
function workflowAcceptRec(ticketId) {
    // In a real app, this would create the ticket
    // For now, simulate it
    const recBox = document.getElementById(ticketId === 'TKT-QC-001' ? 'rec-qc-bottleneck' : 'rec-processing-uptime');
    if (recBox) {
         recBox.style.opacity = '0.5';
         recBox.style.borderColor = 'var(--success-color)';
         recBox.querySelector('.recommendation-actions').innerHTML = `<div style="color: var(--success-color); font-weight: 600;">✓ Ticket ${ticketId} Created</div>`;
    }
    sendWorkflowChatMessage(true, `Recommendation accepted. **Ticket ${ticketId}** has been created in the Control Agent.`);
}

/**
 * Handles rejecting a VSM-level recommendation.
 */
function workflowRejectRec(recId) {
     const recBox = document.getElementById(recId);
     if (recBox) {
         recBox.style.opacity = '0.5';
         recBox.querySelector('.recommendation-actions').innerHTML = `<div style="color: var(--medium-gray); font-weight: 600;">Recommendation Dismissed</div>`;
     }
     sendWorkflowChatMessage(true, "Recommendation has been dismissed and will be logged for future learning.");
}

// ============================================================================
// IMPROVEMENT AGENT - FILTER INSIGHTS
// ============================================================================

function filterInsights(type) {
    console.log('Filtering insights by type:', type);

    // Get all insight cards
    const allCards = document.querySelectorAll('.insight-card');

    // Show/hide based on type
    allCards.forEach(card => {
        const cardType = card.getAttribute('data-type');

        if (type === 'all' || cardType === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Update button states
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Set active button
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
}

// ============================================================================
// OPEN DETAIL VIEW
// ============================================================================

function openDetailView(cardOrId, type) {
    // Handle if called with card element or just ID
    let insightId, insightType;

    if (typeof cardOrId === 'object' && cardOrId.getAttribute) {
        // Called with card element
        insightId = cardOrId.getAttribute('data-insight-id');
        insightType = cardOrId.getAttribute('data-type');
        console.log('Opening detail view for card:', insightId, 'Type:', insightType);

        // Also populate Improvement Coach chat
        if (typeof populateImprovementCoachFromInsight === 'function') {
            populateImprovementCoachFromInsight(cardOrId);
        }
    } else {
        // Called with ID and type
        insightId = cardOrId;
        insightType = type;
        console.log('Opening detail view for ID:', insightId, 'Type:', insightType);
    }

    // Default type if still undefined
    if (!insightType) insightType = 'insight';

    // Get or create detail modal
    let modal = document.getElementById('insight-detail-modal');

    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'insight-detail-modal';
        modal.className = 'modal-backdrop';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal" onclick="event.stopPropagation()">
                <h2>${insightType.charAt(0).toUpperCase() + insightType.slice(1)} Detail</h2>
                <p>ID: ${id}</p>
                <p>Type: ${type}</p>
                <p>This is a placeholder. Implement full detail view here.</p>
                <div class="modal-buttons">
                    <button class="review-btn" onclick="closeInsightDetailModal()">Close</button>
                </div>
            </div>
        `;
        modal.onclick = closeInsightDetailModal;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }
}

function closeInsightDetailModal() {
    const modal = document.getElementById('insight-detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleRecommendation(action) {
    const messagesContainer = document.getElementById('summary-chat-messages');
    if (action === 'accept') {
        const ticketNo = 'TKT-004';
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message system';
        msgDiv.innerHTML = `<div class="message-bubble">Ticket ${ticketNo} is created and is being tracked by Control Agent.</div>`;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else if (action === 'reject') {
        document.getElementById('reject-reason-modal').style.display = 'block';
    }
}

function submitRejectReason() {
    const reason = document.getElementById('reject-reason').value.trim();
    document.getElementById('reject-reason-modal').style.display = 'none';
    const messagesContainer = document.getElementById('summary-chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message system';
    msgDiv.innerHTML = `<div class="message-bubble">Recommendation rejected. Reason: ${reason || 'No reason provided.'}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    document.getElementById('reject-reason').value = '';
}


// Function to show recommendation in copilot chat with Accept/Reject buttons
function showCopilotRecommendation(recommendationText) {
    const messagesContainer = document.getElementById('summary-chat-messages');
    // Remove existing recommendation messages if any
    const oldRec = document.getElementById('recommendation-message');
    if (oldRec) messagesContainer.removeChild(oldRec);

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message assistant';
    msgDiv.id = 'recommendation-message';

    msgDiv.innerHTML = `
        <div class="message-bubble">
            ${recommendationText}<br>
            <button class="recommend-btn" onclick="handleRecommendation('accept')">Accept</button>
            <button class="recommend-btn" onclick="handleRecommendation('reject')">Reject</button>
        </div>
    `;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Run this in browser console:
const backdrop = document.getElementById('tradeoff-modal-backdrop');
const modal = document.getElementById('tradeoff-impact-modal');

// ==========================================
// Watch and Share Ticket Functions
// ==========================================

// Track watched tickets
let watchedTickets = new Set();

// Toggle watch status for a ticket
function toggleWatchTicket(ticketId) {
    const ticket = actionItems.find(t => t.id === ticketId);
    if (!ticket) return;

    const watchBtn = document.getElementById('watch-btn');
    const isWatched = watchedTickets.has(ticketId);

    if (isWatched) {
        // Unwatch
        watchedTickets.delete(ticketId);
        if (watchBtn) {
            watchBtn.classList.remove('active');
        }

        // Add to history
        ticket.history.push({
            date: new Date().toISOString().split('T')[0],
            action: 'Unwatched',
            user: 'John Doe'
        });

        // Send message to Control Agent
        sendControlMessage(`Stopped watching ticket: ${ticket.title}`, 'system');
    } else {
        // Watch
        watchedTickets.add(ticketId);
        if (watchBtn) {
            watchBtn.classList.add('active');
        }

        // Add to history
        ticket.history.push({
            date: new Date().toISOString().split('T')[0],
            action: 'Started watching',
            user: 'John Doe'
        });

        // Send message to Control Agent
        sendControlMessage(`Now watching ticket: ${ticket.title}. You'll receive updates in your Control Agent view and Kanban board.`, 'system');
    }

    // Refresh the ticket detail view to show updated history
    openCtrlDetail(ticketId);
}

// Share ticket via email
function shareTicket(ticketId) {
    const ticket = actionItems.find(t => t.id === ticketId);
    if (!ticket) return;

    // Prompt for recipient email
    const email = prompt('Enter recipient email address:');

    if (!email) return;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Build email content
    const subject = encodeURIComponent(`Action Required: ${ticket.title}`);
    const body = encodeURIComponent(
        `Hi,\n\n` +
        `You've been invited to review the following action item:\n\n` +
        `Ticket: ${ticket.title}\n` +
        `ID: ${ticket.id}\n` +
        `Status: ${ticket.status}\n` +
        `Priority: ${ticket.priority}\n` +
        `Assignee: ${ticket.assignee}\n` +
        `Due Date: ${ticket.dueDate}\n` +
        `Team: ${ticket.team}\n\n` +
        `Description:\n${ticket.description}\n\n` +
        `Best regards,\n` +
        `John Doe`
    );

    // Open mailto link
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    // Log the share action
    ticket.history.push({
        date: new Date().toISOString().split('T')[0],
        action: `Shared with ${email}`,
        user: 'John Doe'
    });

    // Add comment
    ticket.comments.push({
        user: 'John Doe',
        date: new Date().toISOString().split('T')[0],
        text: `Shared this ticket with ${email}`
    });

    // Send message to Control Agent
    sendControlMessage(`Ticket "${ticket.title}" shared with ${email}`, 'system');

    // Refresh the ticket detail view
    openCtrlDetail(ticketId);
}

// ========== NOTIFICATION DROPDOWN ==========
function toggleNotificationDropdown() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationDropdown');
    const icon = document.querySelector('.notification-icon');
    
    if (dropdown && dropdown.classList.contains('active') && 
        !dropdown.contains(event.target) && 
        !icon.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});
