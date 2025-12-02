

export interface OpenAIMessage {
    role: string;
    content: string;
    refusal?: string | null;
    annotations?: string[] | null; 
}