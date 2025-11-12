const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const HealthData = require('./models/HealthData.model');
const MarineData = require('./models/MarineData.model');
const CircularEconomy = require('./models/CircularEconomy.model');
const PolicySimulation = require('./models/PolicySimulation.model');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Health Data - Real-world scenarios
const healthData = [
  {
    region: 'Southeast Asia',
    country: 'India',
    coordinates: { latitude: 28.6139, longitude: 77.2090 },
    diseaseType: 'vector-borne',
    casesReported: 15420,
    populationAtRisk: 2500000,
    weatherConditions: {
      temperature: 32.5,
      humidity: 78,
      precipitation: 145.2,
      airQuality: 168
    },
    predictions: {
      shortTerm: { days: 7, predictedCases: 18500, confidence: 87.3 },
      longTerm: { months: 3, predictedCases: 45000, confidence: 72.1 }
    },
    alertLevel: 'high',
    mitigationStrategies: ['Vector control programs', 'Public awareness campaigns', 'Enhanced surveillance'],
    dataSource: 'iot',
    verified: true
  },
  {
    region: 'Sub-Saharan Africa',
    country: 'Kenya',
    coordinates: { latitude: -1.2921, longitude: 36.8219 },
    diseaseType: 'water-borne',
    casesReported: 8934,
    populationAtRisk: 1200000,
    weatherConditions: {
      temperature: 28.3,
      humidity: 65,
      precipitation: 89.5,
      airQuality: 92
    },
    predictions: {
      shortTerm: { days: 7, predictedCases: 9800, confidence: 91.2 },
      longTerm: { months: 3, predictedCases: 28000, confidence: 78.5 }
    },
    alertLevel: 'high',
    mitigationStrategies: ['Water sanitation', 'Health education', 'Medical supply distribution'],
    dataSource: 'hospital',
    verified: true
  },
  {
    region: 'South America',
    country: 'Brazil',
    coordinates: { latitude: -23.5505, longitude: -46.6333 },
    diseaseType: 'respiratory',
    casesReported: 12650,
    populationAtRisk: 3400000,
    weatherConditions: {
      temperature: 26.8,
      humidity: 72,
      precipitation: 112.3,
      airQuality: 145
    },
    predictions: {
      shortTerm: { days: 7, predictedCases: 13900, confidence: 84.6 },
      longTerm: { months: 3, predictedCases: 38000, confidence: 69.8 }
    },
    alertLevel: 'medium',
    mitigationStrategies: ['Air quality monitoring', 'Respiratory care units', 'Pollution reduction'],
    dataSource: 'satellite',
    verified: true
  },
  {
    region: 'East Asia',
    country: 'Philippines',
    coordinates: { latitude: 14.5995, longitude: 120.9842 },
    diseaseType: 'heat-related',
    casesReported: 5670,
    populationAtRisk: 890000,
    weatherConditions: {
      temperature: 35.2,
      humidity: 82,
      precipitation: 45.8,
      airQuality: 108
    },
    predictions: {
      shortTerm: { days: 7, predictedCases: 7200, confidence: 89.1 },
      longTerm: { months: 3, predictedCases: 19000, confidence: 75.3 }
    },
    alertLevel: 'critical',
    mitigationStrategies: ['Cooling centers', 'Heatwave warnings', 'Vulnerable population support'],
    dataSource: 'government',
    verified: true
  },
  {
    region: 'Middle East',
    country: 'Egypt',
    coordinates: { latitude: 30.0444, longitude: 31.2357 },
    diseaseType: 'water-borne',
    casesReported: 4230,
    populationAtRisk: 750000,
    weatherConditions: {
      temperature: 31.5,
      humidity: 42,
      precipitation: 12.3,
      airQuality: 132
    },
    predictions: {
      shortTerm: { days: 7, predictedCases: 4800, confidence: 86.7 },
      longTerm: { months: 3, predictedCases: 13500, confidence: 71.2 }
    },
    alertLevel: 'medium',
    mitigationStrategies: ['Water treatment', 'Hygiene education', 'Medical supplies'],
    dataSource: 'iot',
    verified: true
  }
];

// Marine Data - Real ocean monitoring
const marineData = [
  {
    location: {
      name: 'Great Barrier Reef',
      coordinates: { latitude: -18.2871, longitude: 147.6992 },
      oceanZone: 'reef'
    },
    ecosystemMetrics: {
      biodiversityIndex: 68.5,
      speciesCount: 1625,
      endangeredSpecies: ['Green Sea Turtle', 'Dugong', 'Humphead Wrasse'],
      coralHealth: 62.3,
      waterQuality: {
        temperature: 27.8,
        pH: 8.05,
        salinity: 35.2,
        dissolvedOxygen: 6.8,
        turbidity: 2.3
      }
    },
    threats: {
      overfishing: 'moderate',
      pollution: {
        plasticDensity: 45.2,
        chemicalContaminants: ['Pesticides', 'Fertilizers'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 72.5,
        acidification: 8.2,
        temperatureChange: 1.8
      }
    },
    digitalTwin: {
      simulationId: 'GBR-2024-001',
      lastUpdated: new Date(),
      scenarios: [
        {
          scenarioName: 'Reduced Pollution 40%',
          parameters: { pollutionReduction: 40, timeframe: '5 years' },
          projectedOutcome: {
            biodiversityChange: 15.3,
            ecosystemResilience: 78.2,
            timeframe: '5 years'
          },
          confidence: 83.5
        }
      ]
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Great Barrier Reef Marine Park Authority',
      interventions: ['Coral restoration', 'Water quality improvement', 'Fishing restrictions'],
      successMetrics: { coralCoverage: 22.3, speciesDiversity: 68.5 }
    },
    dataSource: 'sensor-array'
  },
  {
    location: {
      name: 'Coral Triangle',
      coordinates: { latitude: -5.7893, longitude: 125.3456 },
      oceanZone: 'coastal'
    },
    ecosystemMetrics: {
      biodiversityIndex: 82.7,
      speciesCount: 2847,
      endangeredSpecies: ['Whale Shark', 'Manta Ray', 'Napoleon Wrasse'],
      coralHealth: 71.8,
      waterQuality: {
        temperature: 28.5,
        pH: 8.12,
        salinity: 34.8,
        dissolvedOxygen: 7.2,
        turbidity: 1.8
      }
    },
    threats: {
      overfishing: 'severe',
      pollution: {
        plasticDensity: 67.8,
        chemicalContaminants: ['Industrial waste', 'Agricultural runoff'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 58.3,
        acidification: 6.7,
        temperatureChange: 1.5
      }
    },
    digitalTwin: {
      simulationId: 'CT-2024-002',
      lastUpdated: new Date(),
      scenarios: [
        {
          scenarioName: 'Marine Protected Area Expansion',
          parameters: { protectedAreaIncrease: 30, enforcementLevel: 'high' },
          projectedOutcome: {
            biodiversityChange: 22.5,
            ecosystemResilience: 85.4,
            timeframe: '7 years'
          },
          confidence: 79.2
        }
      ]
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Coral Triangle Initiative',
      interventions: ['Sustainable fishing', 'Reef monitoring', 'Community engagement'],
      successMetrics: { coralCoverage: 34.7, speciesDiversity: 82.7 }
    },
    dataSource: 'research-vessel'
  },
  {
    location: {
      name: 'Caribbean Sea',
      coordinates: { latitude: 18.2208, longitude: -66.5901 },
      oceanZone: 'coastal'
    },
    ecosystemMetrics: {
      biodiversityIndex: 64.3,
      speciesCount: 1234,
      endangeredSpecies: ['Hawksbill Turtle', 'Elkhorn Coral', 'Nassau Grouper'],
      coralHealth: 48.6,
      waterQuality: {
        temperature: 28.2,
        pH: 8.08,
        salinity: 36.1,
        dissolvedOxygen: 6.5,
        turbidity: 3.1
      }
    },
    threats: {
      overfishing: 'moderate',
      pollution: {
        plasticDensity: 52.3,
        chemicalContaminants: ['Sunscreen chemicals', 'Sewage'],
        oilSpills: false
      },
      climateImpact: {
        bleachingRisk: 81.2,
        acidification: 9.4,
        temperatureChange: 2.1
      }
    },
    digitalTwin: {
      simulationId: 'CAR-2024-003',
      lastUpdated: new Date(),
      scenarios: [
        {
          scenarioName: 'Tourism Impact Reduction',
          parameters: { visitorReduction: 25, sustainablePractices: 'high' },
          projectedOutcome: {
            biodiversityChange: 12.8,
            ecosystemResilience: 71.5,
            timeframe: '4 years'
          },
          confidence: 76.8
        }
      ]
    },
    conservationStatus: {
      protectedArea: true,
      managementPlan: 'Caribbean Marine Protected Areas',
      interventions: ['Coral nurseries', 'Sustainable tourism', 'Pollution control'],
      successMetrics: { coralCoverage: 18.9, speciesDiversity: 64.3 }
    },
    dataSource: 'underwater-drone'
  }
];

// Circular Economy Data - Real waste management
const circularData = [
  {
    facility: {
      name: 'Mumbai Waste Processing Center',
      type: 'recycling-center',
      location: {
        city: 'Mumbai',
        country: 'India',
        coordinates: { latitude: 19.0760, longitude: 72.8777 }
      }
    },
    wasteStreams: [
      {
        materialType: 'plastic',
        quantity: { value: 8450, unit: 'tons' },
        source: 'Municipal collection',
        recyclabilityScore: 72,
        contaminationLevel: 'moderate'
      },
      {
        materialType: 'metal',
        quantity: { value: 3200, unit: 'tons' },
        source: 'Industrial',
        recyclabilityScore: 89,
        contaminationLevel: 'low'
      },
      {
        materialType: 'organic',
        quantity: { value: 12000, unit: 'tons' },
        source: 'Food waste',
        recyclabilityScore: 95,
        contaminationLevel: 'clean'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 78.5,
      resourceRecovery: {
        currentRate: 68.3,
        optimizedRate: 86.7,
        improvementPotential: 27.0
      },
      carbonFootprint: {
        current: 15400,
        projected: 9200,
        reduction: 40.3
      },
      economicValue: {
        currentValue: 2340000,
        potentialValue: 3890000,
        currency: 'USD'
      }
    },
    circularMetrics: {
      materialCircularity: 76.8,
      wasteToResource: 73.2,
      landfillDiversionRate: 81.5,
      energyRecovery: 1250,
      waterRecycled: 890
    },
    recommendations: [
      {
        category: 'Process Optimization',
        description: 'Implement automated sorting system to increase plastic recovery by 18%',
        priority: 'high',
        estimatedImpact: { recoveryIncrease: 18, costSavings: 340000 },
        implementationCost: 850000,
        roi: 2.8
      },
      {
        category: 'Material Recovery',
        description: 'Expand organic composting capacity by 40%',
        priority: 'medium',
        estimatedImpact: { recoveryIncrease: 25, environmentalBenefit: 'high' },
        implementationCost: 420000,
        roi: 3.2
      }
    ],
    sustainability: {
      sdgAlignment: [
        { sdgNumber: 12, impactScore: 87 },
        { sdgNumber: 13, impactScore: 72 }
      ],
      environmentalBenefit: 'Reduces 6,200 tons CO2 annually',
      socialImpact: 'Creates 340 direct jobs'
    },
    verified: true
  },
  {
    facility: {
      name: 'Singapore Eco-Hub',
      type: 'waste-processing',
      location: {
        city: 'Singapore',
        country: 'Singapore',
        coordinates: { latitude: 1.3521, longitude: 103.8198 }
      }
    },
    wasteStreams: [
      {
        materialType: 'electronic',
        quantity: { value: 4560, unit: 'tons' },
        source: 'E-waste collection',
        recyclabilityScore: 82,
        contaminationLevel: 'low'
      },
      {
        materialType: 'plastic',
        quantity: { value: 6800, unit: 'tons' },
        source: 'Municipal',
        recyclabilityScore: 78,
        contaminationLevel: 'low'
      },
      {
        materialType: 'textile',
        quantity: { value: 2100, unit: 'tons' },
        source: 'Textile industry',
        recyclabilityScore: 68,
        contaminationLevel: 'moderate'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 91.2,
      resourceRecovery: {
        currentRate: 84.5,
        optimizedRate: 93.8,
        improvementPotential: 11.0
      },
      carbonFootprint: {
        current: 8200,
        projected: 4900,
        reduction: 40.2
      },
      economicValue: {
        currentValue: 4560000,
        potentialValue: 6120000,
        currency: 'USD'
      }
    },
    circularMetrics: {
      materialCircularity: 89.3,
      wasteToResource: 87.6,
      landfillDiversionRate: 94.2,
      energyRecovery: 2340,
      waterRecycled: 1560
    },
    recommendations: [
      {
        category: 'Technology Upgrade',
        description: 'AI-powered sorting for e-waste precious metal recovery',
        priority: 'high',
        estimatedImpact: { recoveryIncrease: 32, valueIncrease: 890000 },
        implementationCost: 1200000,
        roi: 4.1
      }
    ],
    sustainability: {
      sdgAlignment: [
        { sdgNumber: 12, impactScore: 94 },
        { sdgNumber: 13, impactScore: 86 }
      ],
      environmentalBenefit: 'Recovers 95% of valuable materials',
      socialImpact: 'Advanced recycling training programs'
    },
    verified: true
  },
  {
    facility: {
      name: 'Amsterdam Circular Factory',
      type: 'manufacturing',
      location: {
        city: 'Amsterdam',
        country: 'Netherlands',
        coordinates: { latitude: 52.3676, longitude: 4.9041 }
      }
    },
    wasteStreams: [
      {
        materialType: 'plastic',
        quantity: { value: 5200, unit: 'tons' },
        source: 'Post-consumer',
        recyclabilityScore: 85,
        contaminationLevel: 'clean'
      },
      {
        materialType: 'glass',
        quantity: { value: 3400, unit: 'tons' },
        source: 'Municipal',
        recyclabilityScore: 98,
        contaminationLevel: 'clean'
      },
      {
        materialType: 'paper',
        quantity: { value: 7600, unit: 'tons' },
        source: 'Commercial',
        recyclabilityScore: 92,
        contaminationLevel: 'low'
      }
    ],
    optimization: {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: 88.7,
      resourceRecovery: {
        currentRate: 82.1,
        optimizedRate: 91.5,
        improvementPotential: 11.5
      },
      carbonFootprint: {
        current: 6800,
        projected: 3900,
        reduction: 42.6
      },
      economicValue: {
        currentValue: 3890000,
        potentialValue: 5340000,
        currency: 'EUR'
      }
    },
    circularMetrics: {
      materialCircularity: 86.4,
      wasteToResource: 84.3,
      landfillDiversionRate: 92.7,
      energyRecovery: 1890,
      waterRecycled: 1340
    },
    recommendations: [
      {
        category: 'Circular Design',
        description: 'Design-for-disassembly partnership with manufacturers',
        priority: 'high',
        estimatedImpact: { recoveryIncrease: 28, designImprovement: 'significant' },
        implementationCost: 560000,
        roi: 3.8
      }
    ],
    sustainability: {
      sdgAlignment: [
        { sdgNumber: 12, impactScore: 91 },
        { sdgNumber: 13, impactScore: 83 }
      ],
      environmentalBenefit: 'Zero-waste manufacturing model',
      socialImpact: 'Circular economy education hub'
    },
    verified: true
  }
];

// Policy Simulations - Real scenarios
const policyData = [
  {
    policyName: 'Urban Heat Island Mitigation Strategy',
    domain: 'health',
    description: 'Increase urban green spaces by 30% to reduce heat-related illnesses',
    targetRegion: 'Delhi, India',
    parameters: {
      greenSpaceIncrease: 30,
      implementationPeriod: '5 years',
      budgetAllocation: 15000000
    },
    simulationResults: {
      scenario: 'Urban Greening Impact Assessment',
      projectedOutcomes: [
        {
          metric: 'Heat-related illness reduction',
          baseline: 5600,
          projected: 3200,
          changePercentage: -42.9,
          timeframe: '5 years'
        },
        {
          metric: 'Air quality improvement',
          baseline: 168,
          projected: 112,
          changePercentage: -33.3,
          timeframe: '5 years'
        },
        {
          metric: 'Carbon sequestration',
          baseline: 0,
          projected: 8400,
          changePercentage: 100,
          timeframe: '5 years'
        }
      ],
      confidence: 82.5,
      assumptions: ['Consistent maintenance', 'Community participation', 'Climate stability'],
      limitations: ['Long-term funding uncertainty', 'Land availability']
    },
    impact: {
      environmental: { co2Reduction: 8400, temperatureReduction: 2.3 },
      economic: { healthcareSavings: 4200000, jobCreation: 560 },
      social: { qualityOfLifeImprovement: 38, communityEngagement: 'high' },
      healthOutcomes: { casesAvoided: 2400, hospitalVisitsReduced: 3800 }
    },
    stakeholders: [
      { name: 'Municipal Government', type: 'government', expectedImpact: 'Policy leadership' },
      { name: 'Local Communities', type: 'community', expectedImpact: 'Direct health benefits' },
      { name: 'Healthcare Providers', type: 'healthcare', expectedImpact: 'Reduced patient load' }
    ],
    implementation: {
      feasibility: 'high',
      estimatedCost: 15000000,
      timeToImplement: '5 years',
      requiredResources: ['Land', 'Plants', 'Maintenance staff', 'Water infrastructure']
    },
    biasAudit: {
      fairnessScore: 88.3,
      detectedBiases: ['Geographic distribution bias'],
      mitigationActions: ['Prioritize underserved neighborhoods', 'Equitable resource allocation'],
      lastAudited: new Date()
    },
    status: 'completed',
    createdBy: 'system-admin'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data and drop old indexes
    await Promise.all([
      HealthData.deleteMany({}),
      MarineData.deleteMany({}),
      CircularEconomy.deleteMany({}),
      PolicySimulation.deleteMany({})
    ]);
    
    // Drop all indexes to remove old geospatial index
    await MarineData.collection.dropIndexes();
    console.log('🗑️  Cleared existing data and indexes\n');

    // Insert new data
    const [health, marine, circular] = await Promise.all([
      HealthData.insertMany(healthData),
      MarineData.insertMany(marineData),
      CircularEconomy.insertMany(circularData)
    ]);

    console.log('✅ Database seeded successfully!\n');
    console.log(`📊 Health Data: ${health.length} records`);
    console.log(`🌊 Marine Data: ${marine.length} records`);
    console.log(`♻️  Circular Economy Data: ${circular.length} records`);
    console.log('\n🎉 Your dashboard will now show real data!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(seedDatabase);
