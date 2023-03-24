module.exports = {
	presets: [
		[
			'@babel/env',
			{
				loose: true,
				modules: 'auto',
				useBuiltIns: 'usage',
				targets: {
					// node: '12.20',
					browsers: [
						'> 1%',
						'last 2 versions',
						'not ie < 12',
						'not ie_mob < 12',
						'not op_mini all'
					]
				},
				corejs: 3
			}
		],
		'@babel/typescript'
	],
	env: {
		es5: {
			presets: [
				[
					'@babel/env',
					{
						loose: true,
						modules: 'auto',
						useBuiltIns: 'usage',
						targets: {
							browsers: [
								'> 1%',
								'last 2 versions',
								'not ie < 11',
								'not ie_mob < 11',
								'not op_mini all'
							]
						},
						corejs: 3
					}
				],
				'@babel/typescript'
			]
		}
	}
}
