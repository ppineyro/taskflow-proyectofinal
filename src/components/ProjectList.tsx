import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  error: string | null
  selectedProjectId?: number | null
  onSelectProject?: (id: number) => void
}

export function ProjectList({
  projects,
  loading,
  error,
  selectedProjectId,
  onSelectProject,
}: ProjectListProps) {
  if (loading) {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack alignItems="center" py={4}>
          <CircularProgress />
        </Stack>
      </Paper>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Proyectos ({projects.length})
      </Typography>

      {projects.length === 0 ? (
        <Typography color="text.secondary">No hay proyectos.</Typography>
      ) : (
        <Box sx={{ maxHeight: 280, overflowY: 'auto', pr: 1 }}>
          <List disablePadding>
            {projects.map((project) => {
              const isSelected = selectedProjectId === project.id

              return (
                <ListItem
                  key={project.id}
                  divider
                  sx={{ px: 1, py: 1 }}
                  secondaryAction={
                    onSelectProject && (
                      <Button
                        size="small"
                        variant={isSelected ? 'contained' : 'outlined'}
                        color={isSelected ? 'primary' : 'inherit'}
                        onClick={() => onSelectProject(project.id)}
                      >
                        {isSelected ? 'Ver todas' : 'Filtrar'}
                      </Button>
                    )
                  }
                >
                  <ListItemText
                    primary={project.name}
                    secondary={project.description || `ID: ${project.id}`}
                    sx={{ pr: 7 }}
                  />
                </ListItem>
              )
            })}
          </List>
        </Box>
      )}
    </Paper>
  )
}