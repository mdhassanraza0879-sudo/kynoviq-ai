import { prisma } from '@/lib/prisma';
import { SITE_CONFIG } from '@/config/site';

export interface SystemConfigData {
  id: string;
  siteName: string;
  tagline: string;
  founderName: string;
  founderRole: string;
  founderEmail: string;
  founderPhone: string;
  showFounderPublicContact: boolean;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  defaultFreeCredits: number;
  creditRateVideo: number;
  creditRateImage: number;
  creditRateVoice: number;
  creditRateScript: number;
  creditRateDubbing: number;
  creditRateCaptions: number;
  creditRateAgent: number;
}

export async function getSystemConfig(): Promise<SystemConfigData> {
  try {
    let config = await prisma.systemConfig.findUnique({
      where: { id: 'SYSTEM_DEFAULT' },
    });

    if (!config) {
      config = await prisma.systemConfig.create({
        data: {
          id: 'SYSTEM_DEFAULT',
          siteName: SITE_CONFIG.name,
          tagline: SITE_CONFIG.tagline,
          founderName: SITE_CONFIG.founder.name,
          founderRole: SITE_CONFIG.founder.role,
          founderEmail: SITE_CONFIG.founder.email,
          founderPhone: SITE_CONFIG.founder.phone,
          showFounderPublicContact: true,
          maintenanceMode: false,
          allowRegistration: true,
          defaultFreeCredits: 50,
        },
      });
    }

    return config as SystemConfigData;
  } catch (error) {
    return {
      id: 'SYSTEM_DEFAULT',
      siteName: SITE_CONFIG.name,
      tagline: SITE_CONFIG.tagline,
      founderName: SITE_CONFIG.founder.name,
      founderRole: SITE_CONFIG.founder.role,
      founderEmail: SITE_CONFIG.founder.email,
      founderPhone: SITE_CONFIG.founder.phone,
      showFounderPublicContact: true,
      maintenanceMode: false,
      allowRegistration: true,
      defaultFreeCredits: 50,
      creditRateVideo: 15,
      creditRateImage: 2,
      creditRateVoice: 3,
      creditRateScript: 1,
      creditRateDubbing: 10,
      creditRateCaptions: 2,
      creditRateAgent: 25,
    };
  }
}

export async function updateSystemConfig(data: Partial<SystemConfigData>) {
  try {
    return await prisma.systemConfig.upsert({
      where: { id: 'SYSTEM_DEFAULT' },
      update: data,
      create: {
        id: 'SYSTEM_DEFAULT',
        siteName: data.siteName || SITE_CONFIG.name,
        tagline: data.tagline || SITE_CONFIG.tagline,
        founderName: data.founderName || SITE_CONFIG.founder.name,
        founderRole: data.founderRole || SITE_CONFIG.founder.role,
        founderEmail: data.founderEmail || SITE_CONFIG.founder.email,
        founderPhone: data.founderPhone || SITE_CONFIG.founder.phone,
        showFounderPublicContact: data.showFounderPublicContact ?? true,
        ...data,
      },
    });
  } catch (e: any) {
    console.error('Failed to update system config:', e);
    throw e;
  }
}
