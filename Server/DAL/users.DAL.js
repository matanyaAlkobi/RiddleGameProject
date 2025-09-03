import { supabase } from "../lib/supabase.js";

export async function handleUserRegistration(user) {
  try {
    const { data: existingData, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("username", user.username.toLowerCase());

    if (selectError) throw selectError;

    if (existingData.length > 0) {
      return { status: "exists", user: existingData[0] };
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          username: user.username.trim().toLowerCase(),
          password: user.hashedPassword,
          email: user.email.trim().toLowerCase(),
          role:"user"
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    return { status: "created", user: newUser };
  } catch (err) {
    console.error("Supabase error:", err.message);
    throw err;
  }
}
