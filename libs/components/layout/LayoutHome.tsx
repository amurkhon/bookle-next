import React, { useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Button, Slide, Stack, useScrollTrigger } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import AiChatWidget from '../AiChatWidget';

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);
		const router = useRouter();

		interface Props {
			/**
			 * Injected by the documentation to work in an iframe.
			 * You won't need it on your project.
			 */
			window?: () => Window;
			children?: React.ReactElement<unknown>;
		}

		function HideOnScroll(props: Props) {
			const { children, window } = props;
			// Note that you normally won't need to set the window ref as useScrollTrigger
			// will default to window.
			// This is only being set here because the demo is in an iframe.
			const trigger = useScrollTrigger({
				target: window ? window() : undefined,
			});

			return (
				<Slide appear={false} direction="down" in={!trigger}>
					{children ?? <div />}
				</Slide>
			);
		}

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		const pushHandler = async () => {
        await router.push({pathname: '/books'});
    };

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Bookle</title>
						<meta name={'title'} content={`Bookle`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Bookle</title>
						<meta name={'title'} content={`Bookle`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>
						<Stack className={'header-main'}>
							<span className='shape1' style={{position: "absolute",zIndex:"2", top: "100px", right: "25px"}}><img src='/img/shapes/hero-shape2.svg'/></span>
						<span className='shape2' style={{position: "absolute",zIndex:"2", bottom: "0px", left: "10px"}}><img src='/img/shapes/hero-shape3.svg'/></span>
							<Stack className={"container"}>
								<Stack className={"header-left"}>
									<Typography className={'unique'} variant={'h2'}>Up To 30% Off</Typography>
									<Typography className={'left-letter'} variant={'h1'}>Get Your New Book</Typography>
									<Typography className={'left-letter'} variant={'h1'}>With The Best Price</Typography>
									<Button className={'header-button'} onClick={pushHandler} variant={'outlined'} endIcon={<ArrowForwardIcon />}> Shop Now </Button>
								</Stack>
								<Stack className={"header-right"}>
									<img src="/img/hero/hero-img-1-1.png" alt="" />
								</Stack>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<AiChatWidget />

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutMain;
