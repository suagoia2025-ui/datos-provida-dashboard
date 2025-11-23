import { PrismaClient, RegionType, Category } from '@prisma/client';
import { logger } from '../src/utils/logger';

const prisma = new PrismaClient();

/**
 * Seed function to populate database with initial data
 * Includes: regions, data sources, indicators, and sample data points
 */
async function main() {
  logger.info('🌱 Starting database seed...');

  try {
    // ==========================================
    // 1. SEED REGIONS
    // ==========================================
    logger.info('📍 Seeding regions...');

    // Global region
    let global = await prisma.region.findFirst({
      where: { code: 'GLOBAL' },
    });
    if (!global) {
      global = await prisma.region.create({
        data: {
          name: 'Global',
          code: 'GLOBAL',
          type: RegionType.global,
          parentId: null,
        },
      });
    }

    // Continents
    const continents = [
      { name: 'África', code: 'AF', type: RegionType.continent },
      { name: 'América', code: 'AM', type: RegionType.continent },
      { name: 'Asia', code: 'AS', type: RegionType.continent },
      { name: 'Europa', code: 'EU', type: RegionType.continent },
      { name: 'Oceanía', code: 'OC', type: RegionType.continent },
    ];

    const createdContinents = [];
    for (const continent of continents) {
      let created = await prisma.region.findFirst({
        where: { code: continent.code },
      });
      if (!created) {
        created = await prisma.region.create({
          data: {
            ...continent,
            parentId: global.id,
          },
        });
      }
      createdContinents.push(created);
    }

    // 50 principales países con códigos ISO
    const countries = [
      { name: 'Estados Unidos', code: 'US', continentCode: 'AM' },
      { name: 'México', code: 'MX', continentCode: 'AM' },
      { name: 'Brasil', code: 'BR', continentCode: 'AM' },
      { name: 'Argentina', code: 'AR', continentCode: 'AM' },
      { name: 'Colombia', code: 'CO', continentCode: 'AM' },
      { name: 'Chile', code: 'CL', continentCode: 'AM' },
      { name: 'Perú', code: 'PE', continentCode: 'AM' },
      { name: 'Venezuela', code: 'VE', continentCode: 'AM' },
      { name: 'Ecuador', code: 'EC', continentCode: 'AM' },
      { name: 'Guatemala', code: 'GT', continentCode: 'AM' },
      { name: 'España', code: 'ES', continentCode: 'EU' },
      { name: 'Francia', code: 'FR', continentCode: 'EU' },
      { name: 'Alemania', code: 'DE', continentCode: 'EU' },
      { name: 'Italia', code: 'IT', continentCode: 'EU' },
      { name: 'Reino Unido', code: 'GB', continentCode: 'EU' },
      { name: 'Polonia', code: 'PL', continentCode: 'EU' },
      { name: 'Portugal', code: 'PT', continentCode: 'EU' },
      { name: 'Países Bajos', code: 'NL', continentCode: 'EU' },
      { name: 'Bélgica', code: 'BE', continentCode: 'EU' },
      { name: 'Grecia', code: 'GR', continentCode: 'EU' },
      { name: 'China', code: 'CN', continentCode: 'AS' },
      { name: 'India', code: 'IN', continentCode: 'AS' },
      { name: 'Japón', code: 'JP', continentCode: 'AS' },
      { name: 'Corea del Sur', code: 'KR', continentCode: 'AS' },
      { name: 'Indonesia', code: 'ID', continentCode: 'AS' },
      { name: 'Filipinas', code: 'PH', continentCode: 'AS' },
      { name: 'Tailandia', code: 'TH', continentCode: 'AS' },
      { name: 'Vietnam', code: 'VN', continentCode: 'AS' },
      { name: 'Malasia', code: 'MY', continentCode: 'AS' },
      { name: 'Singapur', code: 'SG', continentCode: 'AS' },
      { name: 'Nigeria', code: 'NG', continentCode: 'AF' },
      { name: 'Egipto', code: 'EG', continentCode: 'AF' },
      { name: 'Sudáfrica', code: 'ZA', continentCode: 'AF' },
      { name: 'Kenia', code: 'KE', continentCode: 'AF' },
      { name: 'Etiopía', code: 'ET', continentCode: 'AF' },
      { name: 'Ghana', code: 'GH', continentCode: 'AF' },
      { name: 'Tanzania', code: 'TZ', continentCode: 'AF' },
      { name: 'Uganda', code: 'UG', continentCode: 'AF' },
      { name: 'Marruecos', code: 'MA', continentCode: 'AF' },
      { name: 'Argelia', code: 'DZ', continentCode: 'AF' },
      { name: 'Australia', code: 'AU', continentCode: 'OC' },
      { name: 'Nueva Zelanda', code: 'NZ', continentCode: 'OC' },
      { name: 'Papúa Nueva Guinea', code: 'PG', continentCode: 'OC' },
      { name: 'Fiyi', code: 'FJ', continentCode: 'OC' },
      { name: 'Rusia', code: 'RU', continentCode: 'AS' },
      { name: 'Turquía', code: 'TR', continentCode: 'AS' },
      { name: 'Irán', code: 'IR', continentCode: 'AS' },
      { name: 'Arabia Saudí', code: 'SA', continentCode: 'AS' },
      { name: 'Pakistán', code: 'PK', continentCode: 'AS' },
      { name: 'Bangladesh', code: 'BD', continentCode: 'AS' },
    ];

    const createdCountries = [];
    for (const country of countries) {
      const parentContinent = createdContinents.find(
        (c) => c.code === country.continentCode,
      );
      if (parentContinent) {
        let created = await prisma.region.findFirst({
          where: { code: country.code },
        });
        if (!created) {
          created = await prisma.region.create({
            data: {
              name: country.name,
              code: country.code,
              type: RegionType.country,
              parentId: parentContinent.id,
            },
          });
        }
        createdCountries.push(created);
      }
    }

    logger.info(
      `✅ Created ${1 + continents.length + createdCountries.length} regions`,
    );

    // ==========================================
    // 2. SEED DATA SOURCES
    // ==========================================
    logger.info('📚 Seeding data sources...');

    const dataSources = [
      {
        name: 'WHO',
        organization: 'World Health Organization',
        url: 'https://www.who.int',
        apiEndpoint: 'https://ghoapi.azureedge.net/api',
        reliability: 10,
      },
      {
        name: 'World Bank',
        organization: 'World Bank Group',
        url: 'https://www.worldbank.org',
        apiEndpoint: 'https://api.worldbank.org/v2',
        reliability: 10,
      },
      {
        name: 'UN Data',
        organization: 'United Nations Statistics Division',
        url: 'https://unstats.un.org',
        apiEndpoint: 'https://unstats.un.org/unsd/datacom/api',
        reliability: 9,
      },
      {
        name: 'PubMed',
        organization: 'National Library of Medicine',
        url: 'https://pubmed.ncbi.nlm.nih.gov',
        apiEndpoint: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
        reliability: 9,
      },
      {
        name: 'Data.gov',
        organization: 'U.S. Government Open Data',
        url: 'https://www.data.gov',
        apiEndpoint: 'https://api.data.gov',
        reliability: 8,
      },
    ];

    const createdSources = [];
    for (const source of dataSources) {
      const created = await prisma.dataSource.upsert({
        where: { name: source.name },
        update: {},
        create: source,
      });
      createdSources.push(created);
    }

    logger.info(`✅ Created ${createdSources.length} data sources`);

    // ==========================================
    // 3. SEED INDICATORS
    // ==========================================
    logger.info('📊 Seeding indicators...');

    const indicators = [
      // Abortion category
      {
        category: Category.abortion,
        name: 'Tasa de aborto por 1000 mujeres',
        description:
          'Número de abortos por cada 1000 mujeres en edad reproductiva (15-49 años)',
        unit: 'por 1000',
      },
      {
        category: Category.abortion,
        name: 'Abortos legales anuales',
        description: 'Número total de abortos legales realizados anualmente',
        unit: 'cantidad',
      },
      {
        category: Category.abortion,
        name: 'Tasa de aborto en adolescentes',
        description:
          'Porcentaje de abortos realizados en mujeres menores de 20 años',
        unit: 'porcentaje',
      },
      {
        category: Category.abortion,
        name: 'Razón de aborto (por 100 nacimientos)',
        description:
          'Número de abortos por cada 100 nacimientos vivos en un año',
        unit: 'por 100',
      },
      // Euthanasia category
      {
        category: Category.euthanasia,
        name: 'Casos de eutanasia legal',
        description:
          'Número de casos de eutanasia legalmente realizados anualmente',
        unit: 'cantidad',
      },
      {
        category: Category.euthanasia,
        name: 'Tasa de solicitudes de eutanasia',
        description:
          'Número de solicitudes de eutanasia por cada 100,000 habitantes',
        unit: 'por 100,000',
      },
      {
        category: Category.euthanasia,
        name: 'Aprobación pública de eutanasia',
        description: 'Porcentaje de población que aprueba la eutanasia legal',
        unit: 'porcentaje',
      },
      // Gender ideology category
      {
        category: Category.gender_ideology,
        name: 'Casos de reasignación de género',
        description:
          'Número de procedimientos de reasignación de género realizados',
        unit: 'cantidad',
      },
      {
        category: Category.gender_ideology,
        name: 'Políticas de identidad de género',
        description:
          'Número de países con políticas que permiten cambio de género legal',
        unit: 'cantidad',
      },
      {
        category: Category.gender_ideology,
        name: 'Educación en ideología de género',
        description:
          'Porcentaje de escuelas que incluyen ideología de género en currículo',
        unit: 'porcentaje',
      },
      // Drugs category
      {
        category: Category.drugs,
        name: 'Tasa de consumo de drogas ilícitas',
        description:
          'Porcentaje de población que consume drogas ilícitas anualmente',
        unit: 'porcentaje',
      },
      {
        category: Category.drugs,
        name: 'Muertes por sobredosis',
        description: 'Número de muertes anuales por sobredosis de drogas',
        unit: 'cantidad',
      },
      {
        category: Category.drugs,
        name: 'Tasa de legalización de drogas',
        description: 'Número de países con políticas de legalización de drogas',
        unit: 'cantidad',
      },
      {
        category: Category.drugs,
        name: 'Consumo de marihuana en adolescentes',
        description:
          'Porcentaje de adolescentes que consumen marihuana regularmente',
        unit: 'porcentaje',
      },
      // Stem cells category
      {
        category: Category.stem_cells,
        name: 'Investigación con células embrionarias',
        description:
          'Número de proyectos de investigación que usan células madre embrionarias',
        unit: 'cantidad',
      },
      {
        category: Category.stem_cells,
        name: 'Financiamiento para investigación embrionaria',
        description:
          'Monto total en dólares destinado a investigación con células embrionarias',
        unit: 'dólares',
      },
      {
        category: Category.stem_cells,
        name: 'Países que permiten investigación embrionaria',
        description:
          'Número de países con leyes que permiten investigación con embriones',
        unit: 'cantidad',
      },
      // Human trafficking category
      {
        category: Category.human_trafficking,
        name: 'Víctimas de trata identificadas',
        description:
          'Número de víctimas de trata de personas identificadas anualmente',
        unit: 'cantidad',
      },
      {
        category: Category.human_trafficking,
        name: 'Tasa de trata por 100,000 habitantes',
        description:
          'Número de casos de trata reportados por cada 100,000 habitantes',
        unit: 'por 100,000',
      },
      {
        category: Category.human_trafficking,
        name: 'Víctimas menores de edad',
        description:
          'Porcentaje de víctimas de trata que son menores de 18 años',
        unit: 'porcentaje',
      },
      {
        category: Category.human_trafficking,
        name: 'Trata con fines de explotación sexual',
        description:
          'Número de casos de trata identificados con fines de explotación sexual',
        unit: 'cantidad',
      },
    ];

    const createdIndicators = [];
    for (const indicator of indicators) {
      // Check if indicator exists first
      const existing = await prisma.indicator.findFirst({
        where: {
          category: indicator.category,
          name: indicator.name,
        },
      });

      let created;
      if (existing) {
        created = existing;
      } else {
        created = await prisma.indicator.create({
          data: indicator,
        });
      }
      createdIndicators.push(created);
    }

    logger.info(`✅ Created ${createdIndicators.length} indicators`);

    // ==========================================
    // 4. SEED DATA POINTS (100 registros de ejemplo)
    // ==========================================
    logger.info('📈 Seeding data points...');

    const sampleDataPoints = [];
    const years = [2020, 2021, 2022, 2023];
    const months = [1, 6, 12]; // Enero, Junio, Diciembre

    // Generar 100 data points distribuidos
    for (let i = 0; i < 100; i++) {
      const indicator =
        createdIndicators[Math.floor(Math.random() * createdIndicators.length)];
      const region =
        createdCountries[Math.floor(Math.random() * createdCountries.length)];
      const source =
        createdSources[Math.floor(Math.random() * createdSources.length)];
      const year = years[Math.floor(Math.random() * years.length)];
      const month = months[Math.floor(Math.random() * months.length)];

      // Generar valores realistas según la categoría
      let value: number;
      switch (indicator.category) {
        case Category.abortion:
          value = Math.random() * 50 + 10; // 10-60 por 1000
          break;
        case Category.euthanasia:
          value = Math.random() * 500 + 50; // 50-550 casos
          break;
        case Category.gender_ideology:
          value = Math.random() * 1000 + 100; // 100-1100 casos
          break;
        case Category.drugs:
          value = Math.random() * 15 + 2; // 2-17%
          break;
        case Category.stem_cells:
          value = Math.random() * 50000000 + 1000000; // 1M-51M dólares
          break;
        case Category.human_trafficking:
          value = Math.random() * 10000 + 100; // 100-10100 casos
          break;
        default:
          value = Math.random() * 100;
      }

      const date = new Date(year, month - 1, 15); // Día 15 del mes

      sampleDataPoints.push({
        indicatorId: indicator.id,
        regionId: region.id,
        date,
        value,
        sourceId: source.id,
        metadata: {
          confidence_level: ['high', 'medium', 'low'][
            Math.floor(Math.random() * 3)
          ],
          estimation_method: ['survey', 'official', 'estimated'][
            Math.floor(Math.random() * 3)
          ],
          notes: i % 10 === 0 ? 'Datos preliminares' : undefined,
        },
      });
    }

    // Insertar data points en lotes
    const batchSize = 20;
    for (let i = 0; i < sampleDataPoints.length; i += batchSize) {
      const batch = sampleDataPoints.slice(i, i + batchSize);
      await prisma.dataPoint.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    logger.info(`✅ Created ${sampleDataPoints.length} data points`);

    logger.info('🎉 Database seed completed successfully!');
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    logger.error('Fatal error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
