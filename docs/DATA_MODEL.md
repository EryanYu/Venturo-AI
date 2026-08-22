# Venturo AI Data Model

Version:

V0.1 Prototype


Date:

2026-08



# Overview


Venturo AI data system is designed around four ecosystem roles:


1. Founder
2. Investor
3. Expert / Advisor
4. Enterprise / Industry Partner



Future expansion:

- AI Agent
- Digital Avatar
- Web3 Data Asset
- Token System



# User Model


File:

src/models/user.ts



Current User Structure:


User

{

 id

 name

 role

 points

 aiLevel

}



Role:


Founder

Investor

Expert

Enterprise



# Founder Data Model


Purpose:

Entrepreneur operating system



Future fields:


Project

- projectName
- industry
- stage
- fundingNeed
- AIScore


Founder Profile

- experience
- skills
- achievements
- startupHistory


Funding

- fundraisingStage
- targetAmount
- investorMatch



# Investor Data Model


Purpose:

Investment decision system



Future fields:


Investor Profile


- investmentFocus
- preferredStage
- ticketSize
- portfolio



Investment Pipeline


- interestedProjects
- dueDiligence
- negotiation
- invested



# Expert Data Model


Purpose:

Knowledge and service ecosystem



Future fields:


Expert Profile


- expertise
- industry
- experience
- certificates


Service Record


- consulting
- technicalReview
- projectSupport



# Enterprise Data Model


Purpose:

Industry collaboration system



Future fields:


Enterprise Profile


- companyName
- industry
- innovationDirection


Business Needs


- technologyRequirement
- investmentNeed
- cooperationOpportunity



# Data Relationship


Founder

        |

        | Project

        |

Investor


Founder

        |

        | Consultation

        |

Expert


Enterprise

        |

        | Requirement

        |

Founder / Expert



# Future AI Data Layer


User Data

↓

Behavior Data

↓

AI Model Training

↓

Personal Digital Avatar

↓

Data Asset



# Future Web3 Layer


Data Ownership

↓

Data Permission

↓

Data Trading

↓

Token Incentive