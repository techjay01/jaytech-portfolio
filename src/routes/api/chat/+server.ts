import { json } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';

export async function POST({ request }) {
    const { messages, system } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            max_tokens: 300,
            messages: [
                { role: 'system', content: system },
                ...messages
            ]
        })
    });

    const data = await response.json();
    return json(data);
}