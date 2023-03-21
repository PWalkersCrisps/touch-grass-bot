require('dotenv').config();

module.exports = {
	'apps': [
		{
			'name': 'pwc-porn-bot',
			'script': 'npm',
            'args': 'clean-build-start-unix',

			'watch': true,
			'env_production': {
				'NODE_ENV': 'production',

				'BOT_TOKEN': process.env.BOT_TOKEN,
                'MONGODB_URI': process.env.MONGODB_URI
			},
            'env_development': {
                'NODE_ENV': 'development',

                'BOT_TOKEN': process.env.BOT_TOKEN,
                'MONGODB_URI': process.env.MONGODB_URI
            }
		},
	],
};

