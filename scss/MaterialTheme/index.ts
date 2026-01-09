import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';

// Theme colors
export const themeColors = {
	light: {
		background: '#ffffff',
		surface: '#f5f5f5',
		text: '#212121',
		textSecondary: '#616161',
		border: '#e0e0e0',
	},
	dark: {
		background: '#0a1929', // dark-blue
		surface: '#132f4c',
		text: '#ffffff',
		textSecondary: '#b0bec5',
		border: '#1e4976',
	},
};

/**
 * LIGHT THEME (DEFAULT) - White background
 */
export const light = {
	palette: {
		mode: 'light' as const,
		background: {
			default: '#ffffff',
			paper: '#ffffff',
		},
		primary: {
			contrastText: '#ffffff',
			main: '#E92C28',
		},
		secondary: {
			main: '#1646C1',
		},
		text: {
			primary: '#212121',
			secondary: '#616161',
			dark: common.black,
		},
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					letterSpacing: '0',
				},
			},
			defaultProps: {
				variantMapping: {
					h1: 'h1',
					h2: 'h2',
					h3: 'h3',
					h4: 'h4',
					h5: 'h5',
					h6: 'h6',
					subtitle1: 'p',
					subtitle2: 'p',
					subtitle3: 'p',
					body1: 'p',
					body2: 'p',
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: '#757575',
					textDecoration: 'none',
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: '#eee',
				},
			},
		},
		MuiBox: {
			styleOverrides: {
				root: {
					padding: '0',
				},
			},
			makeStyles: {
				root: {
					padding: 0,
				},
			},
			sx: {
				'&.MuiBox-root': {
					component: 'div',
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					maxWidth: 'inherit',
					padding: '0',
					'@media (min-width: 600px)': {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { 
					background: '#ffffff', 
					height: '100%', 
					minHeight: '100%',
					transition: 'background-color 0.3s ease',
				},
				p: {
					margin: '0',
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					marginLeft: '0',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: '#212121',
					minWidth: 'auto',
					lineHeight: '1.2',
					boxShadow: 'none',
					ButtonText: {
						color: '#212121',
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: '0',
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					padding: '0',
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					MuiSelect: {
						backgroundColor: '#fafafa',
					},
					padding: '0',
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					marginRight: '0',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {},
				select: {
					textAlign: 'left',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					input: {},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					height: '48px',
					width: '100%',
					backgroundColor: '#fff',
					input: {},
				},
				notchedOutline: {
					padding: '8px',
					top: '-9px',
					border: '1px solid #eee',
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					margin: '5px 0 0 2px',
					lineHeight: '1.2',
				},
			},
		},
		MuiStepper: {
			styleOverrides: {
				root: {
					alignItems: 'center',
				},
			},
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: '0',
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {},
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					color: '#fff',
					borderRadius: '50%',
					border: '1px solid #eee',
				},
				text: {
					fill: '#bdbdbd',
				},
			},
		},
		MuiStepConnector: {
			styleOverrides: {
				line: {
					borderColor: '#eee',
				},
			},
		},
		MuiStepLabel: {
			styleOverrides: {
				label: {
					fontSize: '14px',
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					'&.Mui-checked': {
						color: 'black',
					},
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					width: '40px',
					height: '40px',
					background: '#fff',
					color: '#212121',
				},
				hover: {
					background: '#fff',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					MuiMenu: {
						boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px',
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					padding: '6px 8px',
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					border: '1px solid #ddd',
					color: '#212121',
				},
			},
		},
	},
	shadow,
	typography,
};

/**
 * DARK THEME - Dark blue background
 */
export const dark = {
	palette: {
		mode: 'dark' as const,
		background: {
			default: '#0a1929', // dark-blue
			paper: '#132f4c',
		},
		primary: {
			contrastText: '#ffffff',
			main: '#E92C28',
		},
		secondary: {
			main: '#1646C1',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0bec5',
			dark: '#ffffff',
		},
	},
	components: {
		...light.components,
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { 
					background: '#0a1929',
					height: '100%', 
					minHeight: '100%',
					transition: 'background-color 0.3s ease',
				},
				p: {
					margin: '0',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					height: '48px',
					width: '100%',
					backgroundColor: '#132f4c',
					input: {},
				},
				notchedOutline: {
					padding: '8px',
					top: '-9px',
					border: '1px solid #1e4976',
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: '#1e4976',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#132f4c',
					MuiMenu: {
						boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px',
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					border: '1px solid #1e4976',
					color: '#ffffff',
				},
			},
		},
	},
	shadow,
	typography,
};
