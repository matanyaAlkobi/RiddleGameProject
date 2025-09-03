import { supabase } from "../lib/supabase.js";

export async function handleUserRegistration(user) {
  try {
    const { data: existingData, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("name", user.name.toLowerCase());

    if (selectError) throw selectError;
    if (existingData.length > 0) {
      return { status: "exists", player: existingData[0] };
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          name: user.name.toLowerCase(),
          password: user.password,
        },
      ])
      .select()
      .maybeSingle();
    if (insertError) throw insertError;

    return { status: "created", player: newUser };
  } catch (err) {
    console.error("Supabase error:", err.message);
    throw err;
  }
}
