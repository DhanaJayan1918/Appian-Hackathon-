export interface PolicyCitation {
    id: string;
    source: string;
    page: number;
    paragraph: string;
    content: string;
    fullContent?: string;
}

export interface KnowledgeArticle {
    id: string;
    title: string;
    category: "Regulation" | "Policy" | "SOP" | "Knowledge Base";
    summary: string;
    citations: PolicyCitation[];
    relevanceTrigger: string[]; // Keywords that trigger this article
}

export interface CaseData {
    id: string;
    agent: string;
    status: string;
    type: string;
    details: {
        claimType: string;
        location: string;
        amount: string;
        description: string;
    };
}

export const mockCases: CaseData[] = [
    {
        id: "CLM-9901-X",
        agent: "Sarah Jenkins",
        status: "In Review",
        type: "Insurance Claim",
        details: {
            claimType: "Flood",
            location: "Miami, Florida",
            amount: "$125,000",
            description: "Residential basement flooding following Hurricane Helena. Interior damage to walls and electrical systems reported."
        }
    },
    {
        id: "REG-5520-C",
        agent: "Daniel Miller",
        status: "Pending Approval",
        type: "Regulatory Compliance",
        details: {
            claimType: "HIPAA Review",
            location: "San Jose, California",
            amount: "N/A",
            description: "Routine audit of patient data handling procedures for Telehealth platform."
        }
    }
];

export const knowledgeBase: KnowledgeArticle[] = [
    {
        id: "POL-FL-2024",
        title: "Florida Residential Flood Insurance Policy (Update 2024)",
        category: "Policy",
        summary: "Standardized guidelines for residential flooding claims in high-risk coastal zones of Florida.",
        relevanceTrigger: ["Flood", "Florida", "Miami"],
        citations: [
            {
                id: "CIT-001",
                source: "FL-Flood-Regulation-2024.pdf",
                page: 14,
                paragraph: "Para 4.2",
                content: "Under Section 4.2, all residential claims involving primary living spaces below base flood elevation (BFE) require a specialized adjustor's report if the damage exceeds $50,000."
            },
            {
                id: "CIT-002",
                source: "FL-Flood-Regulation-2024.pdf",
                page: 22,
                paragraph: "Section 8 - Electrical Systems",
                content: "Provisions for electrical system replacement are limited to certified remediation if saltwater intrusion is detected in the main panel."
            }
        ]
    },
    {
        id: "SOP-CLAIM-01",
        title: "SOP: High-Value Claim Escalation Process",
        category: "SOP",
        summary: "Internal procedure for handling claims with a valuation exceeding $100,000.",
        relevanceTrigger: ["$100,000", "$125,000", "High-Value"],
        citations: [
            {
                id: "CIT-101",
                source: "Internal-SOP-Manual.pdf",
                page: 5,
                paragraph: "Note C",
                content: "Claims exceeding $100k require a secondary compliance check by the Senior Claims Officer before initial offer generation."
            }
        ]
    },
    {
        id: "KB-HIPAA-2023",
        title: "Telehealth Privacy Stardards - HIPAA Compliance 2023",
        category: "Regulation",
        summary: "Federal regulations regarding data encryption and patient consent in virtual healthcare environments.",
        relevanceTrigger: ["HIPAA", "Telehealth", "Patient Data"],
        citations: [
            {
                id: "CIT-501",
                source: "Federal-Regulation-Title-45.pdf",
                page: 302,
                paragraph: "Subpart E",
                content: "Encryption protocols for data-at-rest must follow AES-256 standards for all cloud-hosted patient identifiers."
            }
        ]
    }
];
