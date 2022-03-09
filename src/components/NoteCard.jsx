import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyle(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const useStyle = makeStyles({
  avatar: {
    background: (note) => {
      if (note.category == "work") {
        return yellow[700];
      }
      if (note.category == "money") {
        return green[500];
      }
      if (note.category == "todos") {
        return pink[700];
      }
      return blue[500];
    },
  },
});
