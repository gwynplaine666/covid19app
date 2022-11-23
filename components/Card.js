import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardInfo({ title, text, icon: Icon = () => <></> }) {
return <Card sx={{ maxWidth: 345, background: '#add8e6' }}>
        <CardActionArea sx={{ padding: '15px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Icon />
        </CardActionArea>
        <CardContent>

            <Typography variant="body2" color="text.secondary">
                {text}
            </Typography>
        </CardContent>
    </Card >
}