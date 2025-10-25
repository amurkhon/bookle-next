import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { userVar } from "../../apollo/store";
import { Button, Divider, Link, Stack } from "@mui/material";
import withLayoutFull from "../../libs/components/layout/LayoutFull";

import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, List } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import { useEffect, useRef, useState,ChangeEvent, MouseEvent, } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { GET_NOTIFICATION, GET_NOTIFICATIONS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Messages, NEXT_PUBLIC_REACT_APP_API_URL } from "../../libs/config";
import { Notification } from "../../libs/types/notification/notification";
import Moment from "react-moment";
import { NotificationsInquiry } from "../../libs/types/notification/notification.input";
import { NotificationGroup, NotificationStatus } from "../../libs/enums/notification.enum";
import { sweetErrorHandling } from "../../libs/sweetAlert";
import { UPDATE_NOTIFICATIONS_AS_READ } from "../../apollo/user/mutation";
import { getJwtToken, updateUserInfo } from "../../libs/auth";



const NotificationPage: NextPage = ({ initialInput, ...props }: any) => {
    const device = useDeviceDetect();
    const [isHydrated, setIsHydrated] = useState(false);
	const user = useReactiveVar(userVar);
	const router = useRouter();
    const scrollToRef = useRef();
    const [searchFilter, setSearchFilter] = useState<NotificationsInquiry>(
        router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
    );

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [ notificationVar, setNotificationVar ] = useState<Notification>();
    const [ notId, setNotId ] = useState<string>('');

    const image = `${NEXT_PUBLIC_REACT_APP_API_URL}/${notificationVar?.memberData?.memberImage}` ?
        `${NEXT_PUBLIC_REACT_APP_API_URL}/${notificationVar?.memberData?.memberImage}` : 
        '/img/profile/defaultUser.svg';


    /* APOLLO REQUESTS*/

    const [updateNotificationsAsRead] = useMutation(UPDATE_NOTIFICATIONS_AS_READ);
    
    const {
        loading: getNotificationsLoading,
        data: getNotificationsData,
        error: getNotificationsError,
        refetch: getNotificationsRefetch,
    } = useQuery(
        GET_NOTIFICATIONS,
        {
            fetchPolicy: "network-only",
            variables: {input: searchFilter},
            notifyOnNetworkStatusChange: true,
            onCompleted: (data: T) => {
                setNotifications(data?.getNotifications?.list);
                setTotal(data?.getNotifications?.metaCounter[0]?.total);
            }
        }
    );

    const {
        loading: getNotificationLoading,
        data: getNotificationData,
        error: getNotificationError,
        refetch: getNotificationRefetch,
    } = useQuery(
        GET_NOTIFICATION,
        {
            fetchPolicy: "network-only",
            variables: {input: notId},
            notifyOnNetworkStatusChange: true,
            onCompleted: (data: T) => {
                setNotificationVar(data?.getNotification);
            }
        }
    );

    /** LIFECYCLES **/
    
    useEffect(() => {
        // Run once: attempt to rehydrate from token
        const token = getJwtToken();
        if (token) {
            updateUserInfo(token); // fills userVar if valid
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        // Run redirect only after hydration attempt is complete
        if (isHydrated && !user?._id) {
            router.push('/').then();
        }
    }, [isHydrated, user]);


    useEffect(() => {
        if (router.query.input) {
            const inputObj = JSON.parse(router?.query?.input as string);
            setSearchFilter(inputObj);
        }
    }, [router]);

    useEffect(() => {getNotificationsRefetch({input: searchFilter})}, [searchFilter]);

    useEffect(() => {
        getNotificationRefetch({ input: notId });
    }, [notId]);

    /* Haandlers */

    const markHandler = async () => {
        try {
            if(!user._id) throw new Error(Messages.error2);
            const result = confirm('Do you want to mark all as read?');
    
            if(result) {
                await updateNotificationsAsRead({
                    variables: {
                        input: {
                            status: NotificationStatus.WAIT,
                        },
                    },
                });
                await getNotificationsRefetch({input: { status: NotificationStatus.READ }});
            } else {
                return false;
            }
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

    const pushMemberHandler = async (memberId: string | undefined) => {
      await router.push({pathname: '/member', query: {memberId: memberId}});
    };

    const pushTargetHandler = async (e: React.MouseEvent<HTMLElement>) => {
        if (notificationVar?.propertyId) {
            await router.push({pathname: '/books/detail', query: {id: e.currentTarget.id}});
        } 
        if (notificationVar?.articleId) {
            await router.push({pathname: '/community/detail', query: {articleCategory: notificationVar?.articleData?.articleCategory, id: e.currentTarget.id}});
        }
    };

    const unreadNotificationsHandler = async () => {
        searchFilter.status = NotificationStatus.WAIT;
        setSearchFilter({ ...searchFilter });
        await router.push(
			`/mypage/notifications?input=${JSON.stringify(searchFilter)}`,
			`/mypage/notifications?input=${JSON.stringify(searchFilter)}`,
			{
				scroll: false,
			},
		);
        console.log("searchFilter unread button: ", searchFilter);
    }

    const allNotificationsHandler = async () => {
        setSearchFilter({});
        await router.push(
			`/mypage/notifications`,
			`/mypage/notifications`,
			{
				scroll: false,
			},
		);
        console.log("searchFilter: ", searchFilter);
    }

    const getNotificationHandler = (e: React.MouseEvent<HTMLElement>) => {
        setNotId(e.currentTarget.id);
        console.log("notId: ", notId);
    };

    if(device === 'mobile') {
        return <div>Notifications</div>
    } else {
        return (
            <div className="notification-page" style={{marginTop: '150px', marginBottom: '50px'}}>
                <div className="container">
                    <Stack className={'notification-list'}>
                        <Box sx={{ width: "100%" }}>
                            <CssVarsProvider>
                            <RadioGroup
                                aria-labelledby="storage-label"
                                value={ router?.query?.input ? 'Unread' : 'All'}
                                size="lg"
                                sx={{ gap: 1.5 }}
                                className={'controller'}
                            >
                            <Sheet className={'con-button'} onClick={allNotificationsHandler} key={'All'} sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm' }}>
                                <Radio
                                className={'item'}
                                label={`All`}
                                overlay
                                disableIcon
                                value={'All'}
                                slotProps={{
                                    label: ({ checked }:any) => ({
                                    sx: {
                                        fontWeight: 'lg',
                                        fontSize: 'md',
                                        color: checked ? 'text.primary' : 'text.secondary',
                                    },
                                    }),
                                    action: ({ checked }:any) => ({
                                    sx: (theme: any) => ({
                                        ...(checked && {
                                        '--variant-borderWidth': '2px',
                                        '&&': {
                                            // && to increase the specificity to win the base :hover styles
                                            borderColor: theme.vars.palette.primary[500],
                                        },
                                        }),
                                    }),
                                    }),
                                }}
                                />
                            </Sheet>
                            <Sheet className={'con-button'} onClick={unreadNotificationsHandler} key={'unread'} sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm' }}>
                                <Radio
                                className={'item'}
                                label={`Unread`}
                                overlay
                                disableIcon
                                value={'Unread'}
                                sx={{height: '20px'}}
                                slotProps={{
                                    label: ({ checked }: any) => ({
                                    sx: {
                                        height:'20px',
                                        fontWeight: 'lg',
                                        fontSize: 'md',
                                        color: checked ? 'text.secondary' : 'text.primary',
                                    },
                                    }),
                                    action: ({ checked }: any) => ({
                                    sx: (theme: any) => ({
                                        ...(checked && {
                                        '--variant-borderWidth': '2px',
                                        '&&': {
                                            // && to increase the specificity to win the base :hover styles
                                            borderColor: theme.vars.palette.primary[400],
                                        },
                                        }),
                                    }),
                                    }),
                                }}
                                />
                            </Sheet>
                            </RadioGroup>
                            </CssVarsProvider>
                        </Box>
                        <Link href='#' underline="none" onClick={markHandler}>
                            Mark all read
                        </Link>
                        <Divider sx={{width: '100%', height: '1px', color: 'black', marginTop: '20px', marginBottom: '20px'}} />
                        <CssVarsProvider>
                            <List className={'list'}>
                                {notifications.map((notification: Notification) => {
                                    const imagePath = `${NEXT_PUBLIC_REACT_APP_API_URL}/${notification?.memberData?.memberImage}` ?
                                        `${NEXT_PUBLIC_REACT_APP_API_URL}/${notification?.memberData?.memberImage}` : 
                                        '/img/profile/defaultUser.svg';
                                    return (
                                        <Stack className={'list-item'} id={notification?._id} onClick={getNotificationHandler}>
                                            <Box className={'profile-img'} onClick={() => pushMemberHandler(notification?.memberData?._id)}>
                                                <img
                                                    src={imagePath}
                                                />
                                            </Box>
                                            <Box className={'inform'}>
                                                <Typography className={'title'}>
                                                    {notification?.notificationTitle}
                                                </Typography>
                                                <span style={{position: 'absolute', right: '0px', top:'0px'}}>
                                                    <Moment fromNow>{notification?.createdAt}</Moment>
                                                </span>
                                                <Typography>
                                                    {notification?.notificationDesc}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    );
                                })}
                            </List>
                        </CssVarsProvider>
                    </Stack>
                    {notificationVar ? (
                        <Stack className={'notification-detail'}>
                            <Stack className={'header'}>
                                <Stack className={'notification-info'}>
                                    <img src={image} alt="" />
                                    <Box>
                                        <Typography>{notificationVar?.notificationTitle}</Typography>
                                        <span>
                                            <Moment format={'HH:mm, DD.MM.YYYY'}>
                                                {notificationVar?.createdAt}
                                            </Moment>
                                        </span>
                                    </Box>
                                </Stack>
                                <CloseIcon variant={'lg'} />
                            </Stack>
                            <Box className={'main-body'}>
                                {notificationVar?.notificationDesc}
                            </Box>
                            {
                                notificationVar?.propertyId && notificationVar?.articleId ? '' : (
                                    <Box className={'link'} onClick={pushTargetHandler} id={notificationVar?.propertyId ? notificationVar?.propertyId : notificationVar?.articleId}>
                                        Click here to see {notificationVar?.notificationGroup === NotificationGroup.PROPERTY ? 'Property' : 'Article'}
                                    </Box>
                                )
                            }
                        </Stack>
                    ) : (
                        <Stack className={'notification-detail-info'}>
                                <span
                                    style={{
                                        fontFamily: 'Robot',
                                        fontSize: '24px',
                                        fontWeight: '400'
                                    }}
                                >
                                    Select One of the Notifications
                                </span>
                        </Stack>
                    )}
                </div>
            </div>
        )
    }
}

NotificationPage.defaultProps = {
    initialInput: {

	},
};

export default withLayoutFull(NotificationPage);