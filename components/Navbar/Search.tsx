import { Autocomplete, createStyles } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
const useStyles = createStyles((theme) => ({
  search: {
    width: 450,

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },

    // [theme.fn.smallerThan("xs")]: {
    //   width: 50,
    // },
    // [theme.fn.smallerThan("xs")]: {
    //   width: 50,
    // },
  },
}));
function Search() {
  const { classes } = useStyles();

  return (
    <Autocomplete
      className={classes.search}
      placeholder="Search files"
      icon={<IconSearch size={16} />}
      data={["React", "Angular", "Svelte", "Vue"]}
    />
  );
}

export default Search;
