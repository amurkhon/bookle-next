

export interface OpenAIMessage {
    role: string;
    content: string;
    refusal?: string | null;
    annotations?: string[] | null; 
}

export interface InquiryHistoryDto {
    memberId: string;
    question: string;
    answer: string;
    createdAt: string;
}