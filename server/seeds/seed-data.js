const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const HealthData = require('../models/HealthData.model');
const MarineData = require('../models/MarineData.model');
const CircularEconomy = require('../models/CircularEconomy.model');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indradhanu');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample Health Data
const healthDataSamples = [
  {
    region: 'South Asia',
    country: 'India',
    coordinates: { latitude: 20.5937, longitude: 78.9629 },
    diseaseType: 'respiratory',
    casesReported: 1245,
    populationAtRisk: 1400000000,
    weatherConditions: {
      temperature: 32,
      humidity: 65,
      precipitation: 150,
      airQuality: 180
    },
    predictions: {
      shortTerm: {
        days: 7,
        predictedCases: 1500,
        confidence: 0.85
      },
      longTerm: {
        months: 3,
        predictedCases: 3200,
        confidence: 0.72
      }
    },
    alertLevel: 'high',
    verified: true,
    timestamp: new Date()
  },
  {
    region: 'East Africa',
    country: 'Kenya',
    coordinates: { latitude: -0.0236, longitude: 37.9062 },
    diseaseType: 'vector-borne',
    casesReported: 523,
    populationAtRisk: 54000000,
    weatherConditions: {
      temperature: 28,
      humidity: 72,
      precipitation: 80,
      airQuality: 95
    },
    predictions: {
      shortTerm: {
        days: 7,
        predictedCases: 650,
        confidence: 0.88
      },
      longTerm: {
        months: 3,
        predictedCases: 1200,
        confidence: 0.75
      }
    },
    alertLevel: 'high',
    verified: true,
    timestamp: new Date()
  },
  {
    region: 'Southeast Asia',
    country: 'Vietnam',
    coordinates: { latitude: 14.0583, longitude: 108.2772 },
    diseaseType: 'water-borne',
    casesReported: 324,
    populationAtRisk: 97000000,
    weatherConditions: {
      temperature: 30,
      humidity: 78,
      precipitation: 200,
      airQuality: 120
    },
    predictions: {
      shortTerm: {
        days: 7,
        predictedCases: 400,
        confidence: 0.82
      },
      longTerm: {
        months: 3,
        predictedCases: 800,
        confidence: 0.68
      }
    },
    alertLevel: 'medium',
    verified: true,
    timestamp: new Date()
  },
  {
    region: 'Pacific Islands',
    country: 'Fiji',
    coordinates: { latitude: -17.7134, longitude: 178.0650 },
    diseaseType: 'heat-related',
    casesReported: 156,
    populationAtRisk: 896000,
    weatherConditions: {
      temperature: 35,
      humidity: 85,
      precipitation: 250,
      airQuality: 140
    },
    predictions: {
      shortTerm: {
        days: 7,
        predictedCases: 200,
        confidence: 0.80
      },
      longTerm: {
        months: 3,
        predictedCases: 500,
        confidence: 0.70
      }
    },
    alertLevel: 'critical',
    verified: true,
    timestamp: new Date()
  }
];

// Sample Marine Data
const marineDataSamples = [
  {
    location: {
      name: 'Great Barrier Reef',
      oceanZone: 'reef',
      coordinates: {
        latitude: -18.2871,
        longitude: 147.6992
      }
    },
    ecosystemMetrics: {
      biodiversityIndex: 85,
      waterQuality: {
        temperature: 26.5,
        pH: 8.2,
        salinity: 35.1,
        dissolvedOxygen: 7.8,
        turbidity: 2
      },
      speciesCount: 1500,
      endangeredSpecies: ['sea-turtle', 'coral-species-x', 'giant-clam'],
      coralHealth: 65
    },
    threats: {
      overfishing: 'moderate',
      pollution: {
        plasticDensity: 0.25,
        chemicalContaminants: ['mercury', 'nitrates'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 0.7,
        acidification: 0.6,
        temperatureChange: 1.5
      }
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Reef Recovery Initiative 2025',
      interventions: ['coral-restoration', 'fishing-limits', 'pollution-control'],
      successMetrics: { recoveryRate: '2.5%' }
    },
    dataSource: 'satellite',
    timestamp: new Date()
  },
  {
    location: {
      name: 'Mediterranean Sea',
      oceanZone: 'coastal',
      coordinates: {
        latitude: 35.5,
        longitude: 18.0
      }
    },
    ecosystemMetrics: {
      biodiversityIndex: 72,
      waterQuality: {
        temperature: 18.5,
        pH: 8.1,
        salinity: 38.5,
        dissolvedOxygen: 6.5,
        turbidity: 3
      },
      speciesCount: 850,
      endangeredSpecies: ['Mediterranean-monk-seal', 'dusky-grouper'],
      coralHealth: 45
    },
    threats: {
      overfishing: 'severe',
      pollution: {
        plasticDensity: 0.45,
        chemicalContaminants: ['lead', 'cadmium', 'zinc'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 0.5,
        acidification: 0.4,
        temperatureChange: 1.2
      }
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Mediterranean Marine Protection 2025',
      interventions: ['marine-reserves', 'sustainable-fishing', 'waste-management'],
      successMetrics: { recoveryRate: '1.8%' }
    },
    dataSource: 'underwater-drone',
    timestamp: new Date()
  },
  {
    location: {
      name: 'Indian Ocean',
      oceanZone: 'pelagic',
      coordinates: {
        latitude: -8.0,
        longitude: 70.0
      }
    },
    ecosystemMetrics: {
      biodiversityIndex: 78,
      waterQuality: {
        temperature: 24.0,
        pH: 8.15,
        salinity: 34.8,
        dissolvedOxygen: 7.2,
        turbidity: 1.5
      },
      speciesCount: 1200,
      endangeredSpecies: ['whale-shark', 'sea-cucumber'],
      coralHealth: 55
    },
    threats: {
      overfishing: 'severe',
      pollution: {
        plasticDensity: 0.35,
        chemicalContaminants: ['microplastics', 'pesticides'],
        oilSpills: true
      },
      climateImpact: {
        bleachingRisk: 0.8,
        acidification: 0.7,
        temperatureChange: 1.8
      }
    },
    conservationStatus: {
      protectedArea: false,
      managementPlan: 'Indian Ocean Sustainable Development',
      interventions: ['pollution-reduction', 'species-protection'],
      successMetrics: { recoveryRate: '1.2%' }
    },
    dataSource: 'sensor-array',
    timestamp: new Date()
  },
  {
    location: {
      name: 'Arctic Ocean',
      oceanZone: 'polar',
      coordinates: {
        latitude: 75.0,
        longitude: 0.0
      }
    },
    ecosystemMetrics: {
      biodiversityIndex: 65,
      waterQuality: {
        temperature: -1.5,
        pH: 8.05,
        salinity: 34.5,
        dissolvedOxygen: 8.5,
        turbidity: 0.5
      },
      speciesCount: 450,
      endangeredSpecies: ['polar-bear', 'narwhal', 'beluga-whale'],
      coralHealth: 0
    },
    threats: {
      overfishing: 'moderate',
      pollution: {
        plasticDensity: 0.15,
        chemicalContaminants: ['persistent-organic-pollutants'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 0.2,
        acidification: 0.3,
        temperatureChange: 2.5
      }
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Arctic Protection Agreement',
      interventions: ['ice-monitoring', 'species-tracking', 'pollution-prevention'],
      successMetrics: { recoveryRate: '0.5%' }
    },
    dataSource: 'research-vessel',
    timestamp: new Date()
  }
];

// Sample Circular Economy Data
const circularEconomySamples = [
  {
    facility: {
      name: 'Green Cycles Recycling Hub',
      type: 'recycling-center',
      location: {
        city: 'New York',
        country: 'USA',
        coordinates: { latitude: 40.7128, longitude: -74.0060 }
      }
    },
    wasteStreams: [
      {
        materialType: 'plastic',
        quantity: { value: 120, unit: 'tons' },
        source: 'Commercial waste stream',
        recyclabilityScore: 85,
        contaminationLevel: 'low'
      },
      {
        materialType: 'metal',
        quantity: { value: 85, unit: 'tons' },
        source: 'Industrial scraps',
        recyclabilityScore: 95,
        contaminationLevel: 'clean'
      },
      {
        materialType: 'paper',
        quantity: { value: 200, unit: 'tons' },
        source: 'Municipal waste',
        recyclabilityScore: 90,
        contaminationLevel: 'moderate'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 82,
      resourceRecovery: {
        currentRate: 78,
        optimizedRate: 88,
        improvementPotential: 10
      },
      carbonFootprint: {
        current: 450,
        projected: 280,
        reduction: 170
      },
      economicValue: {
        currentValue: 125000,
        potentialValue: 180000,
        currency: 'USD'
      }
    },
    circularMetrics: {
      materialCircularity: 82,
      wasteToResource: 78,
      landfillDiversionRate: 85,
      energyRecovery: 45,
      waterRecycled: 1200
    },
    recommendations: [
      {
        category: 'sorting',
        description: 'Increase metal sorting efficiency',
        priority: 'high',
        estimatedImpact: { efficiency: '5%' },
        implementationCost: 50000
      },
      {
        category: 'technology',
        description: 'Implement AI-based waste sorting',
        priority: 'critical',
        estimatedImpact: { efficiency: '12%' },
        implementationCost: 200000
      }
    ],
    verified: true,
    timestamp: new Date()
  },
  {
    facility: {
      name: 'Urban Composting Station',
      type: 'waste-processing',
      location: {
        city: 'London',
        country: 'UK',
        coordinates: { latitude: 51.5074, longitude: -0.1278 }
      }
    },
    wasteStreams: [
      {
        materialType: 'organic',
        quantity: { value: 180, unit: 'tons' },
        source: 'Kitchen and garden waste',
        recyclabilityScore: 98,
        contaminationLevel: 'low'
      },
      {
        materialType: 'paper',
        quantity: { value: 150, unit: 'tons' },
        source: 'Cardboard and paper waste',
        recyclabilityScore: 99,
        contaminationLevel: 'clean'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 95,
      resourceRecovery: {
        currentRate: 92,
        optimizedRate: 97,
        improvementPotential: 5
      },
      carbonFootprint: {
        current: 320,
        projected: 120,
        reduction: 200
      },
      economicValue: {
        currentValue: 85000,
        potentialValue: 150000,
        currency: 'GBP'
      }
    },
    circularMetrics: {
      materialCircularity: 95,
      wasteToResource: 92,
      landfillDiversionRate: 96,
      energyRecovery: 30,
      waterRecycled: 800
    },
    recommendations: [
      {
        category: 'expansion',
        description: 'Expand facility capacity',
        priority: 'high',
        estimatedImpact: { capacity: '40%' },
        implementationCost: 300000
      }
    ],
    verified: true,
    timestamp: new Date()
  },
  {
    facility: {
      name: 'Electronic Waste Recovery Center',
      type: 'recycling-center',
      location: {
        city: 'Tokyo',
        country: 'Japan',
        coordinates: { latitude: 35.6762, longitude: 139.6503 }
      }
    },
    wasteStreams: [
      {
        materialType: 'electronic',
        quantity: { value: 45, unit: 'tons' },
        source: 'Old electronics and appliances',
        recyclabilityScore: 75,
        contaminationLevel: 'moderate'
      },
      {
        materialType: 'metal',
        quantity: { value: 2, unit: 'tons' },
        source: 'Precious metals extraction',
        recyclabilityScore: 99,
        contaminationLevel: 'clean'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 72,
      resourceRecovery: {
        currentRate: 68,
        optimizedRate: 82,
        improvementPotential: 14
      },
      carbonFootprint: {
        current: 280,
        projected: 150,
        reduction: 130
      },
      economicValue: {
        currentValue: 250000,
        potentialValue: 450000,
        currency: 'JPY'
      }
    },
    circularMetrics: {
      materialCircularity: 72,
      wasteToResource: 68,
      landfillDiversionRate: 75,
      energyRecovery: 55,
      waterRecycled: 500
    },
    recommendations: [
      {
        category: 'technology',
        description: 'Improve rare earth element recovery',
        priority: 'critical',
        estimatedImpact: { recovery: '8%' },
        implementationCost: 500000
      }
    ],
    verified: true,
    timestamp: new Date()
  },
  {
    facility: {
      name: 'Sustainable Manufacturing Hub',
      type: 'manufacturing',
      location: {
        city: 'Sydney',
        country: 'Australia',
        coordinates: { latitude: -33.8688, longitude: 151.2093 }
      }
    },
    wasteStreams: [
      {
        materialType: 'textile',
        quantity: { value: 75, unit: 'tons' },
        source: 'Fashion waste and scraps',
        recyclabilityScore: 80,
        contaminationLevel: 'low'
      },
      {
        materialType: 'plastic',
        quantity: { value: 120, unit: 'tons' },
        source: 'Packaging materials',
        recyclabilityScore: 85,
        contaminationLevel: 'moderate'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 80,
      resourceRecovery: {
        currentRate: 75,
        optimizedRate: 85,
        improvementPotential: 10
      },
      carbonFootprint: {
        current: 410,
        projected: 230,
        reduction: 180
      },
      economicValue: {
        currentValue: 165000,
        potentialValue: 240000,
        currency: 'AUD'
      }
    },
    circularMetrics: {
      materialCircularity: 80,
      wasteToResource: 75,
      landfillDiversionRate: 83,
      energyRecovery: 40,
      waterRecycled: 2000
    },
    recommendations: [
      {
        category: 'waste_reduction',
        description: 'Implement waste reduction strategies',
        priority: 'high',
        estimatedImpact: { wasteReduction: '20%' },
        implementationCost: 100000
      }
    ],
    verified: true,
    timestamp: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Drop all indexes for MarineData to reset
    try {
      await MarineData.collection.dropIndexes();
    } catch (e) {
      console.warn('Could not drop indexes:', e.message);
    }

    // Clear existing data
    await HealthData.deleteMany({});
    await MarineData.deleteMany({});
    await CircularEconomy.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const healthInserted = await HealthData.insertMany(healthDataSamples);
    console.log(`✅ Inserted ${healthInserted.length} health records`);

    const marineInserted = await MarineData.insertMany(marineDataSamples);
    console.log(`✅ Inserted ${marineInserted.length} marine records`);

    const circularInserted = await CircularEconomy.insertMany(circularEconomySamples);
    console.log(`✅ Inserted ${circularInserted.length} circular economy records`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`📊 Total records: ${healthInserted.length + marineInserted.length + circularInserted.length}`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
