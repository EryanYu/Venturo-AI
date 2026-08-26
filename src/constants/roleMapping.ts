export const ROLE_MAPPING = {

  "创业者": "founder",

  "投资人": "investor",

  "专家/顾问": "expert",

  "企业/产业合作方": "enterprise",

} as const;


export type SystemRole =
typeof ROLE_MAPPING[keyof typeof ROLE_MAPPING];