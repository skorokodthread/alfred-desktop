import { observer, useObservable } from 'mobx-react-lite';
import { inject } from 'mobx-react'
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

const RegularPost = props => {
  return (
    <div style={{ marginTop: 20, width: '100%', minHeight: 100 }}>
      <Paper style={{ padding: 24 }}>
        <Typography
          variant={'subheading'}
          style={{ marginBottom: 10 }}
        >
          {props.op ? '#OP' : ''} {props.post_date_pretty} {props.deleted ? 'УДАЛЕН МОЧОЙ' : ''}
        </Typography>
        <Typography dangerouslySetInnerHTML={{ __html: props.comment }} />
      </Paper>
    </div>
  )
}

export default RegularPost
