import { Row } from "../components";
import Heading from "../components/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
  // return <Heading as="h1">Update hotel settings</Heading>;
}

export default Settings;
