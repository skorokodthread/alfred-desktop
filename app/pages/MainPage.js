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
import RemoveIcon from '@material-ui/icons/Delete';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThreadItem from '../ui/ThreadItem';


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
        cellHeight={300}
        spacing={2}
        style={{
          overflowY: 'auto',
          height: '90vh',
          marginBottom: 10
        }}
      >
        {
          this.props.app.currentThreads.length ?
            this.props.app.currentThreads.map((t, i) => <ThreadItem thread={t} key={i} />)
            : <Paper style={{ height: 120, padding: 24 }}><Typography variant={'title'} align={'center'}>Нет тредов</Typography></Paper>
        }
      </GridList>
      <BottomNavigation value={this.props.app.tab} style={{ width: '100%' }}>
        <BottomNavigationAction label="Все треды" value="all" onClick={() => this.props.app.tab = 'all'} icon={<SaveIcon />} />
        <BottomNavigationAction label="Избранное" value="favorites" onClick={() => this.props.app.tab = 'favorites'} disabled icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Удаленные" value="deleted" onClick={() => this.props.app.tab = 'deleted'} icon={<RemoveIcon />} />
      </BottomNavigation>
    </div>
  }
}
