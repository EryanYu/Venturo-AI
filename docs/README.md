# Venturo AI Documentation

> Venturo AI documentation index.
>
> This directory contains product architecture, AI/intelligence design,
> engineering guidance, architecture audit records, project history,
> and historical reference materials.

---

## 1. Product Domain

Core business-domain documentation.

- [DATA_MODEL.md](./DATA_MODEL.md)
  - User, Founder, Investor, Expert, Enterprise data models
  - Data relationships
  - Future AI Data Layer
  - Future Web3 Layer

- [PROFILE_SYSTEM.md](./PROFILE_SYSTEM.md)
  - User Profile
  - Founder Profile
  - Investor Profile
  - Expert Profile
  - Enterprise Profile

- [ROLE_SYSTEM.md](./ROLE_SYSTEM.md)
  - Role architecture
  - Four core ecosystem roles
  - Permission concept
  - Current implementation
  - Future role evolution

- [PROJECT_SYSTEM.md](./PROJECT_SYSTEM.md)
  - Project-domain documentation
  - Currently reserved for future project-system documentation

- [MATCHING_ENGINE.md](./MATCHING_ENGINE.md)
  - Matching architecture
  - Matching objects
  - Matching data structure
  - Matching score model
  - Future matching upgrades

---

## 2. AI & Intelligence

AI architecture, intelligence flow, and ecosystem connection design.

- [AI_ARCHITECTURE.md](./AI_ARCHITECTURE.md)
  - Overall AI architecture
  - Intelligence Center
  - AI Assistant
  - Recommendation Engine
  - Future AI Agent System

- [AI_DATA_FLOW.md](./AI_DATA_FLOW.md)
  - AI data flow
  - Current AI architecture
  - Future AI modules

- [INTELLIGENCE_CONNECTION_ARCHITECTURE.md](./INTELLIGENCE_CONNECTION_ARCHITECTURE.md)
  - Intelligence and ecosystem connection architecture
  - Current capabilities
  - AI Agent direction
  - Future integration architecture

---

## 3. Engineering

Engineering and development guidance.

- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
  - Development principles
  - Folder structure
  - Naming rules
  - TypeScript rules

---

## 4. Architecture Audit

Documents created or maintained during architecture and runtime audits.

> These documents describe the current audit findings and should be
> distinguished from historical architecture documents.

- [Canonical Runtime Map.md](./Canonical%20Runtime%20Map.md)
  - Current Canonical Runtime
  - Runtime entry points
  - Canonical identity layers
  - Current architectural decisions

- [CodeMap Findings Classification.md](./CodeMap%20Findings%20Classification.md)
  - Code audit findings
  - Matching / Recommendation engine analysis
  - Runtime-entry analysis
  - Legacy and unused candidates

- [CodeMapNew.md](./CodeMapNew.md)
  - Extended code and architecture mapping
  - Models
  - Roles
  - Recommendations
  - Data relationships

---

## 5. Project History

Historical project and version information.

- [VERSION_HISTORY.md](./VERSION_HISTORY.md)
  - Alpha versions
  - Architecture evolution
  - Documentation evolution
  - Technical stack
  - Future roadmap

---

## 6. Legacy / Historical Reference

Historical architecture and code-map documents.

> These documents are retained for reference.
> They should not be treated as the current Canonical Runtime or
> current implementation map.

- [ARCHITECTURE_MAP.md](./ARCHITECTURE_MAP.md)
  - Earlier system architecture map

- [CODE_MAP.md](./CODE_MAP.md)
  - Earlier code map
  - Historical application structure
  - Historical core-file mapping

---

## Documentation Principles

### Current Runtime

When determining the current implementation, prefer:

1. Current source code
2. `Canonical Runtime Map.md`
3. `CodeMap Findings Classification.md`

### Historical Architecture

`ARCHITECTURE_MAP.md` and `CODE_MAP.md` are retained as historical
reference materials and may describe earlier architecture or files
that are no longer part of the current Runtime.

### Empty / Reserved Documents

Some documents may currently exist as placeholders for future
documentation. Their presence does not imply that the corresponding
system is currently implemented.

---

## Current Product Direction

The current product direction is organized around four major areas:

1. **AI Intelligence**
2. **Project-centric Matching**
3. **AI Agent**
   - GEO
   - Digital Avatars
   - Agent capabilities
4. **CTO-oriented Data Module**

The documentation will evolve alongside the implementation. Existing
documents should be updated or superseded deliberately rather than
silently treated as current architecture.