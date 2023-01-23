import connectDB from '@/mongodb/connect.js';
import { v2 as cloudinary } from 'cloudinary';
import Post from '@/mongodb/models/post';

const startServer = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);
	} catch (e) {
		console.log('Something went wrong');
	}
};

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await startServer();
		try {
			const { name, prompt, photo } = req.body;

			const photoUrl = await cloudinary.uploader.upload(photo);
			console.log('PHOTOURL', photoUrl.url);

			const newPost = await Post.create({
				name,
				prompt,
				photo: photoUrl.url,
			});

			res.status(201).json({ success: true, data: newPost });
		} catch (error) {
			res.status(500).json({ success: false, message: error });
		}
	} else if (req.method === 'GET') {
		console.log('Enters post');
		await startServer();
		try {
			const posts = await Post.find({});

			res.status(200).json({ success: true, data: posts });
		} catch (error) {
			res.status(500).json({ success: false, message: error });
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
