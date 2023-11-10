import supabase from "./supabase";

export async function getSettingsApi() {
  const { data: settings, error } = await supabase.from("Settings").select("*");

  console.log("Settings:::", settings);

  if (error) throw new Error("Settings could not be loaded");

  return settings[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSettingApi(newSetting) {
  console.log("newSetting:::", newSetting);
  const { data, error } = await supabase
    .from("Settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
