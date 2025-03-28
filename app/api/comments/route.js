import { supabase } from "@/app/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json(); // Ambil data dari request
    const { name, comment } = body;

    if (!name || !comment) {
      return Response.json({ error: "Nama dan komentar wajib diisi!" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ name, comment }])
      .select();

    if (error) {
      console.error("Error inserting comment:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
