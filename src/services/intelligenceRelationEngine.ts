import { IntelligenceItem } from "@/models/intelligence";
import { UserProfile } from "@/models/profile";

import { allProfilesMock } from "@/data/allProfilesMockData";


export interface IntelligenceRelations {

  projects: string[];

  investors: UserProfile[];

  experts: UserProfile[];

  companies: UserProfile[];

}


export function resolveIntelligenceRelations(
  item: IntelligenceItem
): IntelligenceRelations {

  const investors =
    allProfilesMock.filter(
      profile =>
        item.relatedInvestors?.includes(profile.id)
    );


  const experts =
    allProfilesMock.filter(
      profile =>
        item.relatedExperts?.includes(profile.id)
    );


  const companies =
    allProfilesMock.filter(
      profile =>
        item.relatedCompanies?.includes(profile.id)
    );


  return {

    projects:
      item.relatedProjects ?? [],

    investors,

    experts,

    companies,

  };

}