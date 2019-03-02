import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WarningIcon from '@material-ui/icons/Warning';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Icon from '@material-ui/core/Icon';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


@inject('app')
@observer
export default class MainPage extends React.Component {

  state = {
    expanded: false,
  }

  async componentDidMount() {
    await this.props.app.getThreads()
  }

  render() {
    return <div>
      <GridList
        cols={1}
        cellHeight={400}
        spacing={2}
        style={{
          overflowY: 'auto',
          height: '90vh',
          marginBottom: 10
        }}
      >
        {
          this.props.app.threads.map((t, i) => <GridTile
            key={i}
            subtitle={<span>от <b>Анонима</b></span>}
            actionIcon={<IconButton><ShareIcon color="white" /></IconButton>}
          >
            <Paper className={'thread'} style={{height: 300, overflowY: 'auto'}}>
              <Grid container wrap={'nowrap'} direction={'column'}>
                <Grid item xs={12} style={{ padding: 24 }}>
                  <Typography variant={'title'} dangerouslySetInnerHTML={{ __html: t.subject }} />
                </Grid>
                <Grid item xs={12} style={{ padding: 24 }}>
                  <Typography style={{ maxHeight: 200 }} dangerouslySetInnerHTML={{ __html: t.comment }} />
                </Grid>
              </Grid>
            </Paper>
            <Paper>
              <Grid item xs={12}>
                <IconButton aria-label="Save">
                  <SaveIcon disabled />
                </IconButton>
                {
                  t.touched_by_mod ? <Button variant={'flat'} color={'secondary'}>Удаленные посты</Button> : null
                }
              </Grid>
            </Paper>
          </GridTile>)
        }
      </GridList>
      <BottomNavigation value={'all'} onChange={e => console.log(`Change`, e)} style={{ width: '100%' }}>
        <BottomNavigationAction label="Все треды" value="all" icon={<SaveIcon />} />
        <BottomNavigationAction label="Избранное" value="favorites" disabled icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Удаленные" value="deleted" disabled icon={<ShareIcon />} />
      </BottomNavigation>
    </div>
  }
}
