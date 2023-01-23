/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		MONGODB_URL:
			'mongodb+srv://adhi:adhi@dalle-cluster.txkajhe.mongodb.net/?retryWrites=true&w=majority',
		OPENAI_API_KEY: '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',
		CLOUDINARY_CLOUD_NAME: 'djygcs49g',
		CLOUDINARY_API_KEY: '281685631861328',
		CLOUDINARY_API_SECRET: 'eu50pfgz3S5vjuTDXrQRTUZTAto',
	},
	images: {
		domains: [
			'https://oaidalleapiprodscus.blob.core.windows.net',
			'oaidalleapiprodscus.blob.core.windows.net',
		],
	},
};

module.exports = nextConfig;
