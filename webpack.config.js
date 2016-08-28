var webpack = require('webpack');

module.exports = {//다른코드에서 불러와서 사용하겠다
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'//output으로 내놓는 파일
    },

    devServer: {
        hot: true,//파일을 수정할때마다
        inline: true,//번들에 같이 넣어주는 것
        host: '0.0.0.0',
        port: 4000,//개발서버 포트
        contentBase: __dirname + '/public/',//index파일의 위치
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({

                	    cacheDirectory: true,
                	    presets: ['es2015', 'react']//일반 자바스크립트 형식으로 변환해줌.

                })],
                exclude: /node_modules/,

            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()//자동 리로딩
    ]
}