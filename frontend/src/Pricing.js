import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const theme = createTheme({
  typography: {
    fontFamily: ['"Segoe UI Light"']
  },
  palette: {
    primary: {
      main: '#ff5200',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Azure Cost Calculator
            </Typography>
            <nav>
              <Link
                variant="button"
                color="secondary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                  <Typography>
                    Support
                  </Typography>
              </Link>
            </nav>
            <Button href="#" variant="outlined" color="secondary" sx={{ my: 1, mx: 1.5 }}>
              <Typography>
                Login
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container disableGutters maxWidth="md" sx={{ pt: 4, pb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                <Select
                  label="App Size"
                  variant="outlined"
                  >
                  <MenuItem value='Small'>Small</MenuItem>
                  <MenuItem value='Medium'>Medium</MenuItem>
                  <MenuItem value='Large'>Large</MenuItem>
                  <MenuItem value='X-Large'>X-Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Number of Servers</InputLabel>
                <Select
                  label="Number of Servers"
                  variant="outlined"
                  >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tier</InputLabel>
                <Select
                  label="Tier"
                  variant="outlined"
                  >
                  <MenuItem value='Web'>Web</MenuItem>
                  <MenuItem value='API'>API</MenuItem>
                  <MenuItem value='DB'>DB</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="xl" component="main">
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="IAAS"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                  }}
                  />
                <CardContent>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>VM</TableCell>
                          <TableCell>CPU</TableCell>
                          <TableCell>RAM</TableCell>
                          <TableCell>Storage</TableCell>
                          <TableCell>Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>i7-7700K</TableCell>
                          <TableCell>8GB</TableCell>
                          <TableCell>256 GB</TableCell>
                          <TableCell>$97.34</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>17</TableCell>
                          <TableCell>i9-9900K</TableCell>
                          <TableCell>16GB</TableCell>
                          <TableCell>512 GB</TableCell>
                          <TableCell>$111.34</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Button
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title='PAAS'
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                  }}
                  />
                <CardContent>
                <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>VM</TableCell>
                          <TableCell>CPU</TableCell>
                          <TableCell>RAM</TableCell>
                          <TableCell>Storage</TableCell>
                          <TableCell>Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>i7-7700K</TableCell>
                          <TableCell>8GB</TableCell>
                          <TableCell>256 GB</TableCell>
                          <TableCell>$97.34</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>17</TableCell>
                          <TableCell>i9-9900K</TableCell>
                          <TableCell>16GB</TableCell>
                          <TableCell>512 GB</TableCell>
                          <TableCell>$111.34</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">
                    Button
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}