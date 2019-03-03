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
import UpdateIcon from '@material-ui/icons/Update';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import ThreadItem from '../ui/ThreadItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

export default
@inject('app')
@observer
class MainPage extends React.Component {

  async componentDidMount() {
    await this.props.app.getThreads()
  }

  render() {
    const { tab, loading, currentThreads, showOnlyModDeleted, allThreads } = this.props.app
    return <div style={{ position: 'relative' }}>
      { loading ?
        <LinearProgress color="secondary" style={{ marginBottom: 10 }} /> :
        <IconButton onClick={this.props.app.getThreads}><UpdateIcon/></IconButton>
        }
      {
        tab === 'deleted' && <Button variant={'contained'} color={'secondary'} onClick={() => this.props.app.showOnlyModDeleted = !this.props.app.showOnlyModDeleted}>
          Показать {showOnlyModDeleted ? 'все удаленные' : 'только удаленные мочой'}
        </Button>
      }
      {
        allThreads.length ? <Button style={{ marginLeft: 10 }} variant={'contained'} color={'primary'} disabled>Поиск</Button> : null
      }
      <GridList
        cols={1}
        cellHeight={300}
        spacing={2}
        style={{
          overflowY: 'auto',
          height: '80vh',
          marginBottom: 10
        }}
      >
        {
          currentThreads.length ?
            currentThreads.map((t, i) => <ThreadItem showDeleted={tab === 'deleted'} showDeletedPostsButton={tab === 'all'} thread={t} key={i} />)
            : <Paper style={{ height: 120, padding: 24 }}><Typography variant={'title'} align={'center'}>Нет тредов</Typography></Paper>
        }
      </GridList>
      <div style={{ position: 'absolute', bottom: -80, left: 0, right: 0 }}>
        <BottomNavigation value={tab} style={{ width: '100%' }}>
          <BottomNavigationAction label="Все треды" value="all" onClick={() => this.props.app.tab = 'all'} icon={<SaveIcon />} />
          <BottomNavigationAction label="Избранное" value="favorites" onClick={() => this.props.app.tab = 'favorites'} disabled icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Удаленные" value="deleted" onClick={() => this.props.app.tab = 'deleted'} icon={<RemoveIcon />} />
        </BottomNavigation>
      </div>
    </div>
  }
}
