import React, { useEffect, useState } from 'react'
import { useObservable, observer } from 'mobx-react-lite';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import GridTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom'

const ThreadItem = props => {
  const t = props.thread
  const defaultExpanded = !(t.comment && t.comment.length > 150)
  const [expanded, setExpanded] = useState(defaultExpanded)
  let height = 200
  if (t.comment && t.comment.length > 150 && expanded) {
    height = 500
  }
  return (
    <GridTile
      style={{ width: '100%', marginTop: 30 }}
      actionIcon={<IconButton><ShareIcon color="white" /></IconButton>}
    >
      <ExpansionPanel
        defaultExpanded={defaultExpanded}
        expanded={!t.comment ? true : expanded}
        className="thread"
        style={{height, overflowY: 'auto', width: '100%', marginBottom: 0 }}
        onChange={() => setExpanded(!expanded)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="title" dangerouslySetInnerHTML={{ __html: t.subject || 'Без темы' }} />
        </ExpansionPanelSummary>
        <Grid container wrap="nowrap" direction="column">
          <Grid item xs={12} style={{ padding: 24 }}>
            <Typography dangerouslySetInnerHTML={{ __html: t.comment || 'Без сообщения' }} />
          </Grid>
        </Grid>
      </ExpansionPanel>
      <Paper>
        <Grid item xs={12}>
          <IconButton aria-label="Save">
            <FavoriteIcon disabled />
          </IconButton>
          {
            t.posts ? <IconButton disabled><Typography component="p">Постов: {t.posts.length}</Typography></IconButton> : null
          }
          {
            props.showDeletedPostsButton && t.touched_by_mod ? <Button variant="flat" color="secondary">Удаленные посты</Button> : null
          }
          {
            props.showDeleted && t.thread_deleted ? <Button variant="contained" disabled color="primary">Удалено мочой</Button> : null
          }
          {
            props.showDeleted && t.thread_ended ? <Button variant="contained" disabled color="primary">Смыт бамплимитом</Button> : null
          }
          {
            t.posts ? <Button variant="contained" component={Link} to={`/${t.thread_id}`} style={{ marginLeft: 10 }}>Перейти в тред</Button> : null
          }
        </Grid>
      </Paper>
    </GridTile>
  )
}

export default observer(ThreadItem)
