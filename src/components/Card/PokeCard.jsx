import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ExpandMoreDescription = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const favorites = []

export default function PokeCard({ name, number, image, type1, type2, stats, moves }) {
    const [expanded, setExpanded] = React.useState(false);
    const [expandedMoves, setExpandedMoves] = React.useState(false)
    const [expandedStats, setExpandedStats] = React.useState(false)
    const [favorite, setFavorite] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandStats = () => {
        setExpandedStats(!expandedStats);
    };

    const handleExpandMoves = () => {
        setExpandedMoves(!expandedMoves);
    };

    const handleFavorite = () => {
        setFavorite(!favorite)

        const index = favorites.indexOf(name)

        favorites.includes(name) ?
            favorites.splice(index, 1)
            :
            favorites.push(name)
    }

    const backgroundChange = (type) => {
        switch (type) {
            case 'grass':
                return '#3FA12A'
            case 'fire':
                return '#E62828'
            case 'water':
                return '#2981EF'
            case 'electric':
                return '#FABF00'
            case 'flying':
                return '#81B8EE'
            case 'normal':
                return '#9FA19E'
            case 'ground':
                return '#915121'
            case 'rock':
                return '#AEA981'
            case 'psychic':
                return '#EE4179'
            case 'bug':
                return '#91A11A'
            case 'poison':
                return '#9241CC'
            case 'fighting':
                return '#FF7F00'
            case 'ice':
                return '#3FD9FF'
            case 'ghost':
                return '#704070'
            case 'dark':
                return '#50413E'
            case 'steel':
                return '#60A1B7'
            case 'dragon':
                return '#5160E1'
            case 'fairy':
                return '#EE70EE'
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton onClick={handleFavorite}>
                        {favorites.includes(name) ?
                            <FavoriteIcon />
                            :
                            <FavoriteBorderOutlinedIcon />
                        }
                    </IconButton>
                }
                title={name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                subheader={`#${number.toString().padStart(4, '0')}`}
            />
            <CardMedia
                component="img"
                width="100%"
                image={image}
                alt={name}
            />
            <CardActions disableSpacing>
                <Stack spacing={1} direction="row">
                    <Button variant="contained" sx={{ backgroundColor: backgroundChange(type1) }}>{type1}</Button>
                    {type2 && <Button variant="contained" sx={{ backgroundColor: backgroundChange(type2) }}>{type2}</Button>}
                </Stack>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Divider textAlign="center">
                        <ExpandMoreDescription
                            expand={expandedStats}
                            onClick={handleExpandStats}
                            aria-expanded={expandedStats}
                            aria-label="show stats"
                        >
                            <Chip label="BASE STATS" />
                        </ExpandMoreDescription>
                    </Divider>
                    <Collapse in={expandedStats}>
                        <Typography heading variant='h6' marginTop='0.5rem' marginBottom='1.5rem'>
                            {stats[0].base_stat} | {stats[0].stat.name} <br />
                            {stats[1].base_stat} | {stats[1].stat.name} <br />
                            {stats[2].base_stat} | {stats[2].stat.name} <br />
                            {stats[3].base_stat} | {stats[3].stat.name} <br />
                            {stats[4].base_stat} | {stats[4].stat.name} <br />
                            {stats[5].base_stat} | {stats[5].stat.name}
                        </Typography>
                    </Collapse>

                    <Divider textAlign="center">
                        <ExpandMoreDescription
                            expand={expandedMoves}
                            onClick={handleExpandMoves}
                            aria-expanded={expandedMoves}
                            aria-label="show moves"
                        >
                            <Chip label="MOVES" />
                        </ExpandMoreDescription>
                    </Divider>
                    <Collapse in={expandedMoves}>
                        <Typography heading variant='h6' marginTop='0.5rem' marginBottom='1.5rem'>
                            <Stack
                                spacing={1}
                                direction="row"
                                useFlexGap
                                flexWrap="wrap"
                            >
                                {moves.map((move, index) => (
                                    <Item key={index}>{move.move.name}</Item>
                                ))}
                            </Stack>
                        </Typography>
                    </Collapse>
                </CardContent>
            </Collapse>
        </Card>
    );
}
