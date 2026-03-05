import Header from "../components/layout/Header";

function Profile() {
  const headers = {
    heading: "Profile",
    caption: "View and manage your profile",
  };
  return <Header heading={headers.heading} caption={headers.caption} />;
}

export default Profile;
