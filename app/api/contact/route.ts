import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendEmail } from "@/hooks/send-email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Save to Firestore
    await addDoc(collection(db, "contacts"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    // Send email to user
    await sendEmail({
      to: data.email,
      subject: "Thank you for contacting StayEase!",
      html: `
        <h2>Thank you for reaching out, ${data.firstName}!</h2>
        <p>We have received your message and will get back to you soon.</p>
        <h3>Your Submitted Details:</h3>
        <ul>
          <li><b>Name:</b> ${data.firstName} ${data.lastName}</li>
          <li><b>Email:</b> ${data.email}</li>
          <li><b>Phone:</b> ${data.phone || "-"}</li>
          <li><b>Subject:</b> ${data.subject}</li>
          <li><b>Message:</b> ${data.message}</li>
        </ul>
        <br/><p>Best regards,<br/>StayEase Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
