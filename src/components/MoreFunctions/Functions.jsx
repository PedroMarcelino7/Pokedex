import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export default function Functions({ changeTheme, theme, changeShiny, changeRotate }) {
    const [themeIcon, setThemeIcon] = React.useState(<DarkModeIcon />)

    const formatedThemeName = () => {
        return theme.palette.mode.charAt(0).toUpperCase() + theme.palette.mode.slice(1).toLowerCase() + ' Mode'
    }

    const actions = [
        { icon: themeIcon, name: formatedThemeName() },
        { icon: <AutoAwesomeIcon />, name: 'Shiny' },
        { icon: <ThreeSixtyIcon />, name: 'Rotate' },
    ];

    const handleAction = (name) => {
        if (name === 'Dark Mode' || name === 'Light Mode') {
            changeTheme()

            { theme.palette.mode === 'light' ? setThemeIcon(<DarkModeIcon />) : setThemeIcon(<LightModeIcon />) }
        }

        else if (name === 'Shiny') {
            changeShiny()
        }

        else if (name === 'Rotate') {
            changeRotate()
        }
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: '0', right: '0' }}>
            <SpeedDial
                ariaLabel="Functions"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => { handleAction(action.name) }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
