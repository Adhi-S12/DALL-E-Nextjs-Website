import connectDB from '@/mongodb/connect.js';
import { v2 as cloudinary } from 'cloudinary';
import { Configuration, OpenAIApi } from 'openai';

const startServer = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);
	} catch (e) {
		console.log('Something went wrong');
	}
};

const generateImage = async (prompt) => {
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const result = await openai.createImage({
		prompt: prompt,
		n: 1,
		size: '1024x1024',
		response_format: 'b64_json',
	});

	let imageurl = await result.data.data[0].b64_json;
	return imageurl;
};

export default async function handler(req, res) {
	startServer();

	if (req.method === 'POST') {
		const { prompt } = req.body;

		try {
			const image = await generateImage(prompt);
			if (image) {
				res.status(200).json({ photo: image });
			}
		} catch (error) {
			res.status(500).json({ error: error });
		}
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '8mb',
		},
	},
};
