import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { createServer } from '../src/server.ts';
import { config } from '../src/config.ts';
import { type LLMResponse, OpenRouterService } from '../src/openrouterService.ts';

console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY is not set in env variables'
);

test('routes to cheapest model by default', async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price',
            },
        },
    }
    const routerService = new OpenRouterService(customConfig);
    const app = createServer(routerService);
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'Qual a capital do Chile?' },
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    console.log(body);
    assert.equal(body.model, 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free');
});

test('routes to highest throughput model by default', async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput',
            },
        },
    }
    const routerService = new OpenRouterService(customConfig);
    const app = createServer(routerService);
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'Qual a capital da Argentina?' },
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    console.log(body);
    assert.equal(body.model, 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free');
});
test.todo('routes to cheapest model by default');