
import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  IconButton, 
  Badge, 
  Typography, 
  Box, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Button 
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Moment from 'react-moment'; // For date formatting (install: npm install react-moment moment)
import { Messages, NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import { Notification, Notifications } from '../../types/notification/notification';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { UPDATE_NOTIFICATIONS_AS_READ } from '../../../apollo/user/mutation';
import { userVar } from '../../../apollo/store';
import { NotificationStatus } from '../../enums/notification.enum';
import { sweetErrorHandling } from '../../sweetAlert';

// Define the type for a single notification item
interface NotificationMenu {
  notifications: Notification[],
  total: number,
  refetch: any,
}


export function NotificationMenu(props: NotificationMenu) {
    const { notifications, total, refetch } = props;
    const user = userVar();
    const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /* APOLLO REQUEST */

  const [updateNotificationsAsRead] = useMutation(UPDATE_NOTIFICATIONS_AS_READ);

    const markHandler = async () => {
        try {
            if(!user._id) throw new Error(Messages.error2);
  
            await updateNotificationsAsRead({
                variables: {
                    input: {
                        status: NotificationStatus.WAIT,
                    },
                },
            });
            await refetch({ status: NotificationStatus.WAIT });
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    if(notifications.length !==0)
        setAnchorEl(event.currentTarget);
    else {
        router.push({pathname: '/mypage/notifications'});
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notificationId: string) => {
    await router.push({pathname: '/mypage/notifications', query: {notificationId: notificationId}});
  };

    const pushNotificationsPageHandler = async () => {
        await router.push({pathname: '/mypage/notifications'});
    };

    const pushMemberHandler = async (memberId: string | undefined) => {
      await router.push({pathname: '/member', query: {memberId: memberId}});
    };


  return (
    <Box>
      {/* 1. NOTIFICATION BELL BUTTON */}
      <IconButton
        size="large"
        aria-label={`show ${total} new notifications`}
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        onClick={handleOpenMenu}
        color="inherit"
        sx={{ mr: 2 }}
      >
        <Badge badgeContent={total} color="error" invisible={total !== 0 || 'undefined' ? false : true}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* 2. THE DROPDOWN MENU */}
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          sx: {
            width: '360px', // Fixed width for the menu dropdown
            maxHeight: '400px', // Limit the height before scrolling starts
            borderRadius: '8px',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" fontWeight="bold">
            Notifications
          </Typography>
          <Button size="small" onClick={markHandler}>Mark All Read</Button>
        </Box>
        <Divider />

        {/* 3. NOTIFICATIONS LIST */}
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'auto' }}>
          {notifications.map((notification: Notification) => {
            // Determine image path
            const imagePath = `${NEXT_PUBLIC_REACT_APP_API_URL}/${notification?.memberData?.memberImage}` ?
                `${NEXT_PUBLIC_REACT_APP_API_URL}/${notification?.memberData?.memberImage}` : 
                '/img/profile/defaultUser.svg';

            return (
              <ListItem 
                key={notification._id} 
                onClick={() => handleNotificationClick(notification?._id)} 
                disablePadding 
                sx={{ 
                  cursor: 'pointer', 
                  backgroundColor: 'action.hover', // Highlight unread
                  '&:hover': {
                    backgroundColor: '#d3c2b2ff',
                  },
                }}
              >
                <ListItemAvatar sx={{ minWidth: '50px' }}>
                  <Avatar 
                    alt={notification?.notificationTitle} 
                    src={imagePath} 
                    sx={{ width: 35, height: 35, ml: 1 }}
                    onClick={() => {pushMemberHandler(notification?.authorId)}}
                  />
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" >
                        {notification?.notificationTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                        <Moment fromNow>{notification.createdAt}</Moment>
                      </Typography>
                    </Box>
                  }
                  secondary={`${notification?.memberData?.memberNick} ${notification?.notificationDesc}`}
                  secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />

        {/* 4. SEE ALL BUTTON */}
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="text" 
            color="primary" 
            fullWidth 
            onClick={pushNotificationsPageHandler} 
            component="a"
          >
            See all notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}