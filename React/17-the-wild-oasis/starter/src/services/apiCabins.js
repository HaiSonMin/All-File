import supabase, { supabaseUrl } from "./supabase";

export async function createCabinApi(dataNewCabin, id) {
  console.log("id:::", id);
  console.log("dataNewCabin:::", dataNewCabin);
  const hasImagePath = dataNewCabin?.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${dataNewCabin.image?.name}`.replace(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? dataNewCabin.image
    : `${supabaseUrl}/storage/v1/object/public/images-cabin/${imageName}`;

  let cabinSupabase = supabase.from("Cabins");

  // A. Create cabin
  if (!id)
    cabinSupabase = cabinSupabase.insert([
      { ...dataNewCabin, image: imagePath },
    ]);

  // B. Update cabin
  if (id)
    cabinSupabase = cabinSupabase
      .update([{ ...dataNewCabin, image: imagePath }])
      .eq("id", id);

  const { data, error } = await cabinSupabase.select().single();
  if (error) throw new Error("Cabin could not be created");

  if (hasImagePath) return data;

  // 2. Upload image cabin
  // https://qhijbhjfbqanzkhpvtkv.supabase.co/storage/v1/object/public/images-cabin/cabin-001.jpg
  const { error: errorUploadImage } = await supabase.storage
    .from("images-cabin")
    .upload(imageName, dataNewCabin.image);

  // 3. Delete cabin if upload image failed
  if (errorUploadImage) {
    console.error("Upload image error");
    await supabase.from("Cabins").delete().eq("id", data[0].id);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}

export async function getCabinsApi() {
  const { data: cabins, error } = await supabase.from("Cabins").select("*");

  if (error) throw new Error("Cabins not found");

  return cabins;
}

export async function updateCabinApi(id, dataUpdated) {
  const { data: cabinUpdated, error } = await supabase
    .from("Cabins")
    .update(dataUpdated)
    .eq("id", id)
    .select();

  if (error) throw new Error("Cabins not found for updated");

  return cabinUpdated;
}

export async function deleteCabinApi(id) {
  const { data: cabinDeleted, error } = await supabase
    .from("Cabins")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Cabins not found for deleted");

  return cabinDeleted;
}
