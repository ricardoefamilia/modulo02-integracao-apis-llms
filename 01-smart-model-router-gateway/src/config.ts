console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY is not set in env variables'
);

export type ModelConfig = {
    apiKey: string;
    httpReferer: string;
    xTitle: string;
    port: number;
    models: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;

    provider: {
        sort: {
            by: string,
            partition: string,
        }
    }
}

export const config = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    httpReferer: 'http://pos-ia.com',
    xTitle: 'SmartModelRouterGateway',
    port: 3000,
    models: [
        'google/gemma-4-31b-it:free',
        'openrouter/auto-beta',
        'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    ],
    temperature: 0.2,
    maxTokens: 200,
    systemPrompt: 'You are a helpful assistant.',
    provider: {
        sort: {
            by: 'throughput',
            // by: 'latency',
            // by: 'price',
            partition: 'none'
        }
    }
};