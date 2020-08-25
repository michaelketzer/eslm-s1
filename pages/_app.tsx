import App, { AppInitialProps } from 'next/app';
import 'antd/dist/antd.min.css';

class MyApp extends App<AppInitialProps> {
	render() {
		const { Component, pageProps } = this.props;
		return <div className={'pageFrame'}>
			<Component {...pageProps} />

			<style jsx>{`
				.pageFrame {
					padding: 20px 40px;
				}	


				@media only screen and (max-width: 600px) {
					.pageFrame {
						padding: 5px 10px;
					}	
				}
			`}</style>
		</div>;
	}
}

export default MyApp;
