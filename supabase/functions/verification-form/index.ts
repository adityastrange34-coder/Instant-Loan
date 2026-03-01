import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VerificationData {
  name: string;
  phone: string;
  email: string;
  loanAmount: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: VerificationData = await req.json();

    const emailBody = `
Loan Verification Request

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Loan Amount: ₹${data.loanAmount}

This is an automated verification request. Please review the applicant's details and proceed accordingly.

Timestamp: ${new Date().toISOString()}
    `.trim();

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "noreply@yourdomain.com",
        to: "adityavantharam999@gmail.com",
        subject: `Loan Verification Request - ${data.name}`,
        html: `
          <h2>Loan Verification Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Loan Amount:</strong> ₹${data.loanAmount}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const sendUserConfirmation = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        },
        body: JSON.stringify({
          from: "noreply@yourdomain.com",
          to: data.email,
          subject: "Loan Application Received",
          html: `
            <h2>Application Received</h2>
            <p>Hi ${data.name},</p>
            <p>Your loan verification request has been received. We will contact you shortly at ${data.phone}.</p>
            <p>Loan Amount Requested: ₹${data.loanAmount}</p>
            <p>Best regards,<br>Lending Team</p>
          `,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification form submitted successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to submit verification form",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
