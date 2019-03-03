import { observer, useObservable } from 'mobx-react-lite';
import { inject } from 'mobx-react'
import { toJS } from 'mobx'
import React, { useEffect, useState } from 'react';
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
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import OpPost from '../ui/OpPost';
import CircularProgress from '@material-ui/core/CircularProgress';
import RegularPost from '../ui/RegularPost';

const ThreadPage = props => {
  console.log(`Props.match`, props.match)
  const [thread, setThread] = useState(toJS(props.app.allThreads).find(t => String(t.thread_id) === props.match.params.id))
  const getThreadsAndSetCurrent = async () => {
    await props.app.getThreads()
    setThread(toJS(props.app.allThreads).find(t => String(t.thread_id) === props.match.params.id))
  }
  useEffect(() => {
    getThreadsAndSetCurrent()
  }, [])
  console.log(`Props.app.current thread`, toJS(props.app.allThreads))
  console.log(`Thread`, thread)
  return (
    <div style={{ overflowY: 'auto' }}>
      <Button component={Link} to={'/'} color={'secondary'} variant={'contained'}>Назад</Button>
      <div style={{ justifyContent: 'center', display: 'flex' }}>{ !thread ? <CircularProgress/> : null }</div>
      <div
        style={{
          overflowY: 'auto',
          height: '90vh',
          marginBottom: 10
        }}
      >
        {
          thread ?
            <OpPost subject={thread.subject || 'Нет темы'} comment={thread.comment || 'Нет сообщения'} /> :
            null
        }
        {
          thread && thread.posts && thread.posts.slice(1).map(p =>
            <RegularPost
              comment={p.comment || 'Нет сообщения'}
              deleted={p.deleted}
              op={p.op_post}
              post_date_pretty={p.post_date_pretty}
            />)
        }
      </div>
    </div>
  )
}

export default inject('app')(observer(withRouter(ThreadPage)))
