import { Constants } from '../constants';

interface EssayResult {
	category: number;
	score: number;
	values: {};
}

// the function submits the written essay to the server for marking
// and returns a response back which is then viewed on the result page
export async function submitEssay(essay: string): Promise<EssayResult> | null {
	try {
		const resp = await fetch(Constants.api.MARK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ essay })
		});
		const data = await resp.json();
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}
