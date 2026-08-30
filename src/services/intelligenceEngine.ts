import {
  IntelligenceItem
} from "@/models/intelligence";

import {
  intelligenceCenterMockData
} from "@/data/intelligenceCenterMockData";


export function getIntelligenceFeed(
  role:string
):IntelligenceItem[] {

  return intelligenceCenterMockData
    .filter(
      item =>
        item.targetRoles.includes(role)
        || item.targetRoles.length === 0
    );
}


export function getFounderOpportunities(
  role:string
):IntelligenceItem[] {

  return getIntelligenceFeed(role)
    .filter(
      item =>
        item.type === "founder_opportunity"
    );
}


export function getInvestorOpportunities(
  role:string
):IntelligenceItem[] {

  return getIntelligenceFeed(role)
    .filter(
      item =>
        item.type === "investor_opportunity"
    );
}


export function getDailyInsights(
  role:string
):IntelligenceItem[] {

  return getIntelligenceFeed(role)
    .filter(
      item =>
        item.type === "insight"
    );
}