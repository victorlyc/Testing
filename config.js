exports.DB_URL = 'mongodb://admin:123@ds019668.mlab.com:19668/mongo_test';
exports.DB_OPTIONS = {
	server: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	}
};
exports.APP_PORT = process.env.PORT || 8080;