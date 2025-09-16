import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DiscountIcon from '@mui/icons-material/Discount';


const Information = () => {
    const device = useDeviceDetect();
    const router = useRouter();

    /** HANDLERS **/

    if (device === 'mobile') {
        return (
            <Stack className="top-agent-card">
            </Stack>
        );
    } else {
        return (
            <Container className={'maininfo-box'}>
                <Stack className={'info-item'}>
                    <Box className={'icon-box'}>
                        <SecurityIcon className={'icon'} sx={{ fontSize: 40, color: 'white'}}  />
                    </Box>
                    <Stack>
                        <Typography sx={{fontSize: '25px', fontWeight: '600'}}>
                            Secure Payment
                        </Typography>
                        <span>30% off by subscribing</span>
                    </Stack>
                </Stack>
                <Stack className={'info-item'}>
                    <Box className={'icon-box'}>
                        <SupportAgentIcon className={'icon'} sx={{ fontSize: 40, color: 'white'}}  />
                    </Box>
                    <Stack>
                        <Typography sx={{fontSize: '25px', fontWeight: '600'}}>
                            Quality support
                        </Typography>
                        <span>Always online 24/7</span>
                    </Stack>
                </Stack>
                <Stack className={'info-item'}>
                    <Box className={'icon-box'}>
                        <DiscountIcon className={'icon'} sx={{ fontSize: 40, color: 'white'}}  />
                    </Box>
                    <Stack>
                        <Typography sx={{fontSize: '25px', fontWeight: '600'}}>
                            Daily Offers
                        </Typography>
                        <span>20% off by subscribing</span>
                    </Stack>
                </Stack>
            </Container>
        );
    }
};

export default Information;