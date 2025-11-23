import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box,Typography, Drawer } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout, WidthFull } from '@mui/icons-material';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../config';
import { Notification } from '../types/notification/notification';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { T } from '../types/common';
import { NotificationStatus } from '../enums/notification.enum';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { NotificationMenu } from './common/NotificationMenu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 0,
    padding: '0 4px',
  },
}));


const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [color, setColor] = useState<string>('');
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const [hidden, setHidden] = useState(false);
	const logoutOpen = Boolean(logoutAnchor);
	const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
	const openNot = Boolean(anchorEl3);

	/*For Mobile Version */
	const [openMenu, setOpenMenu] = React.useState(false);
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		notifications.length == 0 ? router.push({pathname: '/mypage/notifications'}) : setAnchorEl3(event.currentTarget);
	};
	const handleCloseNot = () => {
		setAnchorEl3(null);
	};


	/* APOLLO REQUESTS*/

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(
		GET_NOTIFICATIONS,
		{
			fetchPolicy: "network-only",
			variables: {input: { status: NotificationStatus.WAIT }},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setNotifications(data?.getNotifications?.list.filter((ele: Notification) => { return ele.authorId !== user?._id;}));
				setTotal(data?.getNotifications?.list.filter((ele: Notification) => { return ele.authorId !== user?._id;}).length);
			}
		}
	);

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/books/detail':
				setBgColor(true);
				break;
			case '/mypage/notifications':
				setColor('#f0e4e4ff');
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpenMenu(newOpen);
	};

	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};
	
	const changeNavbarSize = () => {
		if (window.scrollY >= 50) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
		window.addEventListener('scroll', changeNavbarSize);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
					<AppBar position="static"
						sx={{
							backgroundColor: 'rgba(255, 255, 255, 0.6)',  // semi-transparent white
							backdropFilter: 'blur(10px)',                  // blur effect
							boxShadow: 'none',                             // optional: remove shadow
						}}
					>
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
							>
								<MenuIcon sx={{color: 'black'}} onClick={toggleDrawer(true)} />
							</IconButton>
							<Box className={'logo-box'}>
								<img src="/img/logo/black-logo.svg" alt="" />
							</Box>
							{ !user?._id ? (
								<Link href={'/account/join'}>
									<Button color="inherit">
										{t('Login')}
									</Button>
								</Link>
							) : (
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt="Remy Sharp" src={user?.memberImage ? `${NEXT_PUBLIC_REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'} />
									</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: '45px' }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem key={'logout'} onClick={() => { logOut(); handleCloseUserMenu(); }}>
											<Typography sx={{ textAlign: 'center' }}>Logout</Typography>
										</MenuItem>
									</Menu>
								</Box>
							)}
						</Toolbar>
					</AppBar>
					<Drawer 
						className={'drawer'} 
						open={openMenu} 
						onClose={toggleDrawer(false)}
						sx={{
							padding: '15px'
						}}
					>
						<Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
							<Box component={'div'} className={'logo-box'} sx={{padding:'10px'}}>
								<Link href={'/'}>
									<img src="/img/logo/black-logo.svg" alt="" />
								</Link>
							</Box>
							<List>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon sx={{justifyContent: 'center'}}>
											<HomeIcon />
										</ListItemIcon>
										<ListItemText>
											<Link href={'/'}>
												<div>{t('Home')}</div>
											</Link>
										</ListItemText>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon sx={{justifyContent: 'center'}}>
											<BookIcon />
										</ListItemIcon>
										<ListItemText>
											<Link href={'/books'}>
												<div>{t('Books')}</div>
											</Link>
										</ListItemText>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon sx={{justifyContent: 'center'}}>
											<PeopleIcon />
										</ListItemIcon>
										<ListItemText>
											<Link href={'/author'}>
												<div> {t('Authors')} </div>
											</Link>
										</ListItemText>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon sx={{justifyContent: 'center'}}>
											<ArticleIcon />
										</ListItemIcon>
										<ListItemText>
											<Link href={'/community?articleCategory=FREE'}>
												<div> {t('Community')} </div>
											</Link>
										</ListItemText>
									</ListItemButton>
								</ListItem>
								{user?._id && (
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon sx={{justifyContent: 'center'}}>
												<PersonIcon />
											</ListItemIcon>
											<ListItemText>
												<Link href={'/mypage'}>
													<div> {t('My Page')} </div>
												</Link>
											</ListItemText>
										</ListItemButton>
									</ListItem>
								)}
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon sx={{justifyContent: 'center'}}>
											<SupportAgentIcon />
										</ListItemIcon>
										<ListItemText>
											<Link href={'/cs'}>
												<div> {t('CS')} </div>
											</Link>
										</ListItemText>
									</ListItemButton>
								</ListItem>
							</List>
							<Divider />
						</Box>
					</Drawer>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack sx={{backgroundColor: color}} className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Stack className={`main-info ${hidden ? 'hider-function' : ''} `}>
							<Box className={'info-box'}>
								<CallIcon />
								+8265097071
							</Box>
							<Divider className={'info-box'} orientation="vertical" variant="middle" flexItem backgroundColor="#012e4a" />
							<Box className={'info-box'}>
								<MailOutlineIcon />
								info@example.com
							</Box>
							<Stack></Stack>
						</Stack>
						<Stack className={'routing-box'}>
							<Box component={'div'} className={'logo-box'}>
								<Link href={'/'}>
									<img src="/img/logo/black-logo.svg" alt="" />
								</Link>
							</Box>
							<Box component={'div'} className={'router-box'}>
								<Link href={'/'}>
									<div>{t('Home')}</div>
								</Link>
								<Link href={'/books'}>
									<div>{t('Books')}</div>
								</Link>
								<Link href={'/author'}>
									<div> {t('Authors')} </div>
								</Link>
								<Link href={'/community?articleCategory=FREE'}>
									<div> {t('Community')} </div>
								</Link>
								{user?._id && (
									<Link href={'/mypage'}>
										<div> {t('My Page')} </div>
									</Link>
								)}
								<Link href={'/cs'}>
									<div> {t('CS')} </div>
								</Link>
							</Box>
							<Box component={'div'} className={'user-box'}>
								{user?._id ? (
									<>
										<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
											<img
												src={
													user?.memberImage ? `${NEXT_PUBLIC_REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
												}
												alt=""
											/>
										</div>

										<Menu
											id="basic-menu"
											anchorEl={logoutAnchor}
											open={logoutOpen}
											onClose={() => {
												setLogoutAnchor(null);
											}}
											sx={{ mt: '5px' }}
										>
											<MenuItem onClick={() => logOut()}>
												<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
												Logout
											</MenuItem>
										</Menu>
									</>
								) : (
									<Link href={'/account/join'}>
										<div className={'join-box'}>
											<AccountCircleOutlinedIcon />
											<span>
												{t('Login')} / {t('Register')}
											</span>
										</div>
									</Link>
								)}
							</Box>
							<LightModeIcon />
							<div className={'lan-box'}>
								{user?._id && 
									<NotificationMenu notifications={notifications} total={total} refetch={getNotificationsRefetch}/>
								}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute', zIndex:'100' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="uz"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
