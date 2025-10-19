import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { userVar } from "../../apollo/store";
import { Button, Divider, Stack } from "@mui/material";
import withLayoutFull from "../../libs/components/layout/LayoutFull";

import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, List } from "@mui/joy";

import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';



const Notification: NextPage = () => {
    const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

    if(device === 'mobile') {
        return <div>Notifications</div>
    } else {
        return (
            <div className="notification-page" style={{marginTop: '150px', marginBottom: '50px'}}>
                <div className="container">
                    <Stack className={'notification-list'}>
                        <CssVarsProvider>
                            <Box sx={{ width: 300 }}>
                                <RadioGroup
                                    className={'controller'}
                                    aria-labelledby="storage-label"
                                    defaultValue=""
                                    size="sm"
                                    sx={{ gap: 1.5 }}
                                >
                                    <Sheet key={'all'} sx={{ width: "80px", height: "40px", p: 1, borderRadius: 'md', boxShadow: 'sm' }}>
                                        <Radio
                                            label={`All`}
                                            overlay
                                            disableIcon
                                            value={''}
                                            slotProps={{
                                                label: ({checked}: any) => ({
                                                sx: {
                                                    fontWeight: 'lg',
                                                    fontSize: 'md',
                                                    color: checked ? 'text.primary' : 'text.secondary',
                                                },
                                                }),
                                                action: ({checked}: any) => ({
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
                                    <Sheet key={'raed'} sx={{width: "80px", height: "40px", p: 1, borderRadius: 'md', boxShadow: 'sm' }}>
                                        <Radio
                                            label={`Unread`}
                                            overlay
                                            disableIcon
                                            value={'WAIT'}
                                            slotProps={{
                                                label: ({checked}: any) => ({
                                                sx: {
                                                    fontWeight: 'lg',
                                                    fontSize: 'md',
                                                    color: checked ? 'text.primary' : 'text.secondary',
                                                },
                                                }),
                                                action: ({checked}: any) => ({
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
                            </Box>
                        </CssVarsProvider>
                        <Divider sx={{width: '100%', height: '1px', color: 'black', marginTop: '20px', marginBottom: '20px'}} />
                        <CssVarsProvider>
                            <List>
                                {[1,2,3,4,5,6,7].map((ele) => {
                                    return (
                                        <Card
                                            variant="outlined"
                                            orientation="horizontal"
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: 70,
                                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                            }}
                                            >
                                            <AspectRatio ratio="1" sx={{ width: 40, height: "100%", borderRadius: '100%' }}>
                                                <img
                                                src='/img/profile/girl.svg'
                                                loading="lazy"
                                                alt=""
                                                style={{height: 40, borderRadius: '100%'}}
                                                />
                                            </AspectRatio>
                                            <CardContent>
                                                <Typography level="title-lg" id="card-description">
                                                Yosemite Park
                                                </Typography>
                                                <Typography
                                                level="body-sm"
                                                aria-describedby="card-description"
                                                sx={{ mb: 1 }}
                                                >
                                                    <Link
                                                        overlay
                                                        underline="none"
                                                        href="#interactive-card"
                                                        sx={{ color: 'text.tertiary' }}
                                                    >
                                                        California, USA
                                                    </Link>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </List>
                        </CssVarsProvider>
                    </Stack>
                    <Stack className={'notification-detail'}>
                        Detail
                    </Stack>
                </div>
            </div>
        )
    }
}

export default withLayoutFull(Notification);