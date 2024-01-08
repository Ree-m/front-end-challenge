import { Divider, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 border-b border-zinc-200 flex gap-4">
      <Typography level="title-lg" sx={{color:'#7d8590'}}>FE Challenge</Typography>
      <Divider orientation="vertical" />
      <Link to="/" className="text-light-grey hover:text-blue">Home</Link>
      <Link to="/inventory" className="text-light-grey hover:text-blue">Inventory</Link>
    </nav>
  );
};

export default Navbar;
