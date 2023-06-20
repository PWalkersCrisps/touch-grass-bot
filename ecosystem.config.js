require('dotenv').config();

module.exports = {
	'apps': [
		{
			'name': 'touch-grass-bot',
			'script': 'npm',
            'args': 'run clean-build-start-unix',

			'watch': true,
			'env_production': {
				'NODE_ENV': 'production',

				'DISCORD_BOT_TOKEN': process.env.DISCORD_BOT_TOKEN,
                'MONGODB_URI': process.env.MONGODB_URI
			},
            'env_development': {
                'NODE_ENV': 'development',

                'DISCORD_BOT_TOKEN': process.env.DISCORD_BOT_TOKEN,
                'MONGODB_URI': process.env.MONGODB_URI
            }
		},
	],
};

