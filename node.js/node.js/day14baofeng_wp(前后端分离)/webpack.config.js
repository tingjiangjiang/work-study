const path = require('path');
// 配置打包html模板
const htmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
// css压缩
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 引入热更新插件
const webpack = require('webpack');

module.exports = {
	// 多入口
	entry: {
		discuss: './src/discuss.js',
		index: './src/index.js',
		login: './src/login.js',
		more: './src/more.js',
		register: './src/register.js',
	},
	output: {
		filename: './js/[name].js', //打包后的文件名称
		path: path.resolve('dist'), //打包后的路径（需要是绝对路径）
	}, //出口文件，打包完毕后，把打包的内容放到哪里，打包的文件叫什么
	module: {
		rules: [
			{
				test: /\.css$/,
				// 通过js内部嵌入css
				// use: ['style-loader', 'css-loader'], //模块的解析顺序是从右向左
				// 拆分css
				use: extractTextWebpackPlugin.extract({
					use: 'css-loader',
					publicPath: '../',
				}),
			},
			{
				test: /\.less$/,
				use: extractTextWebpackPlugin.extract({
					use: [{ loader: 'css-loader' }, { loader: 'less-loader' }],
					publicPath: '../',
				}),
			},
			{
				test: /\.(png|gif|jpe?g)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, //阈值，小于该值图片自动转换为data-url形式
							outputPath: 'images/', //图片的输出路径
						},
					},
				],
			},
			{
				test: /\.(htm|html)$/,
				use: 'html-withimg-loader',
			},
			// 字体图标
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
						},
					},
				],
			},
			// babel配置

			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		], //rules数组中配置的都是对象，每个对象都是一个模块的配置
	}, //这是模块（不同的模块拥有不同的功能，主要是针对非js文件的打包）
	plugins: [
		new htmlWebpackPlugin({
			template: './src/views/index.html',
			filename: 'index.html',
			chunks: ['index'],
		}),
		new htmlWebpackPlugin({
			template: './src/views/discuss.html',
			filename: 'discuss.html',
			chunks: ['discuss'],
		}),
		new htmlWebpackPlugin({
			template: './src/views/login.html',
			filename: 'login.html',
			chunks: ['login'],
		}),
		new htmlWebpackPlugin({
			template: './src/views/more.html',
			filename: 'more.html',
			chunks: ['more'],
		}),
		new htmlWebpackPlugin({
			template: './src/views/register.html',
			filename: 'register.html',
			chunks: ['register'],
		}),
		new extractTextWebpackPlugin('css/[name].css'),
		// 热更新
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	], //插件，插件的作用是帮助webpack在特定的时机插入相关的代码段
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'localhost',
		port: '8090',
		open: true,
		hot: true,
		proxy: {
			//配置跨域
			'/api': {
				target: 'http://localhost:3000/', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/api': '', //请求的时候使用这个api就可以
				},
			},
		},
		// 代理
	}, //里面常配置热更新和代理跨域
	mode: 'development', //不写默认为生成环境
};
