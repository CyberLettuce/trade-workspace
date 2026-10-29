# Competitor comparison and implementation

Reviewed 29 October 2026. Evidence comes from official public product documentation. These are documented capabilities, not hands-on tests of licensed competitor products. Benefits and design choices below are our interpretation.

| Product | Documented pattern | Trade Workspace response |
| --- | --- | --- |
| [Descartes EU Customs](https://www.descartes.com/resources/knowledge-center/descartes-eu-customs) | Customisable declaration overview, information validation, master data, templates and declaration history. | A priority workbench, field-specific sample checks, reusable parties/goods templates and a record checklist. Existing history and reference data remain. |
| [CargoWise Customs](https://www.cargowise.com/solutions/cargowise-customs/) | Exception workflows, validation, audit history and documents connected to shipments, declarations and operational milestones. | A next-action preview links directly to the relevant record section, with ownership and document readiness alongside the response and internal workflow. |
| [ASM Sequoia productivity](https://www.asm.org.uk/en/our-software/productivity/) | Search, sort, previews, filtering and personalised exception views. | Active work, My work, Missing data, Follow up and Unassigned views; search and record preview without leaving the workbench. Existing saved list views and CSV export remain. |
| [ASM declaration templates](https://www.asm.org.uk/en/our-software/features/declaration-templates/) | Reusable declarations or parts of declarations, including customer-specific templates. | Save a record's reusable parties, countries, currency and goods as a named template; create a separate draft with a unique reference. Responses, documents, transport and history are not inherited. |

## Changes included

- More operational visual hierarchy: restrained orange, an open summary strip, queue on the left and actionable record preview on the right. Existing top navigation and services remain familiar.
- Missing-data work is ranked ahead of follow-ups. Completeness is derived from the record, so clearing an attention flag cannot hide an unresolved field error.
- Bulk completeness checks inspect selected workbench results and link to corrections. No bulk submission is performed.
- Assign records to fictional workspace members and record assignment history. This is local sample assignment, not a notification to another person.
- Review checklist updates from parties, goods, transport and documents. A passed sample check is explicitly not customs approval.
- Field-level validation identifies specific commodity code, description, origin, quantity or value gaps and opens the affected goods item for correction.
- Saving edits now adds an event to record history.

## Retained core

Trade Workspace identity, orange actions, shipments, CDS imports and exports, ICS2 ENS, GMR, safety and security, EMCS, stored data, reports, search, saved views, CSV tools, documents, record editing and submission simulation. Inventory remains excluded. Existing Trade Documents is untouched.

## Beyond this preview

Competitor capabilities involving authority connections, maintained tariff rules, genuine customs validation, legal archiving, live service health, shared assignments, durable storage and integrations need separate backend work. The current public site remains a fictional, session-only interactive preview. Dates, responses and ownership are sample data. No live compliance or clearance claim is made.
